const { pool } = require("../../../config/database");

const userDao = require("./userDao");

// userIdx로 유저 조회
exports.idxCheck = async function (selectUserIdxParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserIdx(
    connection,
    selectUserIdxParams
  );
  connection.release();

  return userResult[0];
};

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
