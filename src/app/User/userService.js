/* 공통 */
const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const token = require("../../../config/token");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = async function (
  refreshToken,
  profile,
  selectUserOauthIdParams
) {
  const { provider, id, email, displayName } = profile;
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const insertUserInfoParams = [
      provider,
      id,
      email,
      displayName,
      refreshToken,
    ];
    await userDao.insertUserInfo(connection, insertUserInfoParams);
    await connection.commit();
    userRow = await userProvider.oauthIdCheck(selectUserOauthIdParams);
    return userRow;
  } catch (err) {
    connection.rollback();
    logger.error(`App - createUser Service error\n: ${err.message}`);
    throw new Error(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

exports.updateUserRefreshToken_oauthId = async function (
  refreshToken,
  oauthId
) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();

    const updateUserRefreshTokenParams = [refreshToken, oauthId];

    await userDao.updateUserRefreshToken_oauthId(
      connection,
      updateUserRefreshTokenParams
    );
    await connection.commit();
    return;
  } catch (err) {
    connection.rollback();
    logger.error(
      `App - updateUserRefreshToken_oauthId Service error\n: ${err.message}`
    );
    throw new Error(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

const updateUserRefreshToken_userIdx = async function (userIdx, refreshToken) {
  const connection = await pool.getConnection(async (conn) => conn);
  const updateUserRefreshTokenParams = [refreshToken, userIdx];
  try {
    await connection.beginTransaction();
    const test = await userDao.updateUserRefreshToken_userIdx(
      connection,
      updateUserRefreshTokenParams
    );
    await connection.commit();
    return;
  } catch (err) {
    connection.rollback();
    logger.error(
      `App - updateUserRefreshToken_userIdx Service error\n: ${err.message}`
    );
    throw errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 토큰 재발급 서비스 로직
exports.reissuanceToken = async function (accessToken, refreshToken) {
  try {
    // 액세스 토큰 검증
    const checkAccessToken = token.verify(accessToken);

    // 액세스 토큰이 만료되었는지 확인
    if (checkAccessToken !== "jwt expired") {
      return errResponse(baseResponse.TOKEN_IS_NOT_EXPIRED);
    }
    // 액세스 토큰 만료 시, decode를 통해 payload 값 불러오기 가능
    const decodeAccessToken = jwt.decode(accessToken);

    // 리프레쉬 토큰 검증
    const checkRefreshToken = token.verify(refreshToken);
    // 리프레쉬 토큰이 만료되었는지 확인
    if (checkRefreshToken == "jwt expired") {
      return errResponse(baseResponse.TOKEN_REFRESH_EXPIRED);
    }
    // header로 들어온 리프레쉬 토큰이 유저가 제일 최근에 받은 리프레쉬 토큰과 동일한지 확인 (보안 강화)
    const { userIdx } = decodeAccessToken;
    const userRow = await userProvider.getUserRefreshToken(userIdx);

    if (refreshToken !== userRow.refreshToken) {
      return errResponse(baseResponse.TOKEN_REFRESH_NOT_MATCHED);
    }

    // 토큰 재발급
    const accessJwt = token.access({ userIdx });
    const refreshJwt = token.refresh();
    await updateUserRefreshToken_userIdx(userIdx, refreshJwt);

    return response(baseResponse.SUCCESS, {
      accessToken: accessJwt,
      refreshToken: refreshJwt,
    });
  } catch (err) {
    return err;
  }
};

// Access Token 재발급
exports.createAccessToken = async function (userIdx) {
  try {
    return token.access({ userIdx });
  } catch (err) {
    return null;
  }
};

// Refresh Token 재발급
exports.createRefreshToken = async function () {
  try {
    return token.refresh();
  } catch (err) {
    return null;
  }
};
