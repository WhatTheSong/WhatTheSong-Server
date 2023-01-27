/* 공통 */
const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
require("dotenv").config();

/* 소셜 로그인 공통 */
const jwt = require("jsonwebtoken");
const { createJwt } = require("../../../config/token");

exports.createUser = async function (refreshToken, profile) {
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
};
