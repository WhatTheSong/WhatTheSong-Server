/* 공통 */
const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
require("dotenv").config();

/* 소셜 로그인 */
const jwt = require("jsonwebtoken");
const path = require("path");
const apple = require("apple-auth");
const { appleOauthConfig } = require("../../../config/appleOauth/config");
const authApple = new apple(
  appleOauthConfig,
  path.join(
    __dirname,
    `../../../config/appleOauth/${process.env.APPLE_PRIVATE_KEY_PATH}`
  )
);
const uuid = require("uuid-with-v6");
const { createJwt } = require("../../../config/token");
const axios = require("axios");
const qs = require("qs");

exports.oauthAppleLogin = async function (authorizationCode) {
  try {
    const accessToken = await authApple.accessToken(authorizationCode);
    const idToken = jwt.decode(accessToken.id_token);
    const { email, sub } = idToken;

    // oauthId로 유저 조회
    const selectUserOauthIdParams = [1, sub];
    let userRow = await userProvider.oauthIdCheck(selectUserOauthIdParams);

    // user가 조회되지 않으면, 계정 생성
    if (!userRow) {
      const rememberMeToken = uuid.v6(); // uuid-with-v6 사용해서 rememberMeToken 생성
      const insertUserInfoParams = [email, 1, sub, rememberMeToken];

      const connection = await pool.getConnection(async (conn) => conn);
      try {
        await connection.beginTransaction();
        await userDao.insertUserInfo(connection, insertUserInfoParams);
        await connection.commit();
      } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
      } finally {
        connection.release();
      }
    }

    userRow = await userProvider.oauthIdCheck(selectUserOauthIdParams); // 다시 user 조회 (bad smell)
    const userIdx = userRow.idx;
    // jwt 생성
    const token = createJwt({
      userIdx,
    });
    const { rememberMeToken } = userRow;

    return response(baseResponse.SUCCESS, {
      userIdx,
      jwt: token,
      rememberMeToken,
    });
  } catch (err) {
    logger.error(`App - oauthAppleLogin Service error\n: ${err.message}`);
    return errResponse(baseResponse.SOCIAL_LOGIN_SERVER_ERROR);
  }
};

exports.oauthKakaoLogin = async function (authorizationCode) {
  try {
    // authorizationCode -> token 변환
    const accessToken = (
      await axios({
        method: "POST",
        url: "https://kauth.kakao.com/oauth/token",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_RESTAPI_KEY,
          client_secret: process.env.KAKAO_SECRET_KEY,
          redirectUri: process.env.KAKAO_REDIRECT_URL,
          code: authorizationCode,
        }), //객체를 string 으로 변환
      })
    ).data.access_token;

    const user = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const sub = user.data.id;
    const email = user.data.kakao_account.email;

    // oauthId로 유저 조회
    const selectUserOauthIdParams = [2, sub];
    let userRow = await userProvider.oauthIdCheck(selectUserOauthIdParams);

    // user가 조회되지 않으면, 계정 생성
    if (!userRow) {
      const rememberMeToken = uuid.v6(); // uuid-with-v6 사용해서 rememberMeToken 생성
      const insertUserInfoParams = [email, 2, sub, rememberMeToken];

      const connection = await pool.getConnection(async (conn) => conn);
      try {
        await connection.beginTransaction();
        await userDao.insertUserInfo(connection, insertUserInfoParams);
        await connection.commit();
        userRow = await userProvider.oauthIdCheck(selectUserOauthIdParams); // 다시 user 조회
      } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
      } finally {
        connection.release();
      }
    }

    const userIdx = userRow.idx;
    // jwt 생성
    const token = createJwt({
      userIdx,
    });
    const { rememberMeToken } = userRow;

    return response(baseResponse.SUCCESS, {
      userIdx,
      jwt: token,
      rememberMeToken,
    });
  } catch (err) {
    logger.error(`App - oauthAppleLogin Service error\n: ${err.message}`);
    return errResponse(baseResponse.SOCIAL_LOGIN_SERVER_ERROR);
  }
};
