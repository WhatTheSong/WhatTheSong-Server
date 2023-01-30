const { pool } = require("../../../config/database");

const userDao = require("./userDao");

exports.oauthIdCheck = async function (selectUserOauthIdParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserOauthId(
    connection,
    selectUserOauthIdParams
  );
  connection.release();

  return userResult;
};

exports.getNickname = async function(userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const nicknameResult = await userDao.selectNickname(connection, userIdx);
  connection.release();
  return nicknameResult;
}
