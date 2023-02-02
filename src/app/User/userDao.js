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

// 유저 id로 닉네임 조회
async function selectNickname(connection, userIdx) {
  const selectNicknameQuery = `
    SELECT name
    FROM User
    WHERE idx = ?;`;
  const [nickname] = await connection.query(selectNicknameQuery, userIdx);
  return nickname;
}

module.exports = {
  selectUserOauthId,
  insertUserInfo,
  selectNickname
};
