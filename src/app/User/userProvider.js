const { pool } = require("../../../config/database");

const userDao = require("./userDao");

// userOauthId로 유저 조회
exports.oauthIdCheck = async function (selectUserOauthIdParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserOauthId(
    connection,
    selectUserOauthIdParams
  );
  connection.release();

  return userResult[0];
};

// 유저 refreshToken 조회
exports.getUserRefreshToken = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserRefreshToken(connection, userIdx);
  connection.release();

  return userResult[0];
};

exports.getNickname = async function(userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const nicknameResult = await userDao.selectNickname(connection, userIdx);
  connection.release();
  return nicknameResult;
}
