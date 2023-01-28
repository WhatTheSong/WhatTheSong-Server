// oauthId로 유저 조회
async function selectUserOauthId(connection, selectUserOauthIdParams) {
  const selectOauthIdQuery = `
                 SELECT * 
                 FROM User
                 WHERE oauthProvider = ? AND oauthId = ?;
                 `;
  const [userRow] = await connection.query(
    selectOauthIdQuery,
    selectUserOauthIdParams
  );
  return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User(email, oauthProvider, oauthId, rememberMeToken)
        VALUES (?, ?, ?, ?);
    `;
  await connection.query(insertUserInfoQuery, insertUserInfoParams);

  return;
}

module.exports = {
  selectUserOauthId,
  insertUserInfo,
};
