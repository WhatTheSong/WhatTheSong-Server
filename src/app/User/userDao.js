// userIdx로 유저 조회
async function selectUserIdx(connection, selectUserIdxParams) {
  const selectUserIdxQuery = `
                 SELECT idx
                 FROM User
                 WHERE idx = ?;
                 `;
  const [userRow] = await connection.query(
    selectOauthIdQuery,
    selectUserOauthIdParams
  );
  return userRow;
}

// oauthId로 유저 조회
async function selectUserOauthId(connection, selectUserOauthIdParams) {
  const selectUserOauthIdQuery = `
                 SELECT * 
                 FROM User
                 WHERE oauthProvider = ? AND oauthId = ?;
                 `;
  const [userRow] = await connection.query(
    selectUserOauthIdQuery,
    selectUserOauthIdParams
  );
  return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User(oauthProvider, oauthId, email, name, refreshToken)
        VALUES (?, ?, ?, ?, ?);
    `;
  await connection.query(insertUserInfoQuery, insertUserInfoParams);

  return;
}

// 유저 refreshToken 재발급
async function updateUserRefreshToken(
  connection,
  updateUserRefreshTokenParams
) {
  const updateUserRefreshTokenQuery = `
        UPDATE User
        SET refreshToken = ?
        WHERE oauthId = ?
    `;
  await connection.query(
    updateUserRefreshTokenQuery,
    updateUserRefreshTokenParams
  );

  return;
}

module.exports = {
  selectUserIdx,
  selectUserOauthId,
  insertUserInfo,
  updateUserRefreshToken,
};
