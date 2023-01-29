/* 공통 */
const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
require("dotenv").config();

exports.createUser = async function (
  refreshToken,
  profile,
  selectUserOauthIdParams
) {
  const { provider, id, displayName } = profile;
  const email = profile._json?.kakao_account?.email;
  const insertUserInfoParams = [provider, id, email, displayName, refreshToken];

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    await userDao.insertUserInfo(connection, insertUserInfoParams);
    await connection.commit();
    userRow = await userProvider.oauthIdCheck(selectUserOauthIdParams);
    return userRow;
  } catch (err) {
    logger.error(`App - createUser Service error\n: ${err.message}`);
    throw new Error(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

exports.updateUserRefreshToken = async function (oauthId, refreshToken) {
  const connection = await pool.getConnection(async (conn) => conn);
  const updateUserRefreshTokenParams = [refreshToken, oauthId];
  try {
    await connection.beginTransaction();
    await userDao.updateUserRefreshToken(
      connection,
      updateUserRefreshTokenParams
    );
    await connection.commit();
    return;
  } catch (err) {
    logger.error(
      `App - updateUserRefreshToken Service error\n: ${err.message}`
    );
    throw new Error(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};
