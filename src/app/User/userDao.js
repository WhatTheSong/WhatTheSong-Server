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

// 유저 refreshToken 재발급 (oauthId)
async function updateUserRefreshToken_oauthId(
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

// 유저 refreshToken 재발급 (userIdx)
async function updateUserRefreshToken_userIdx(
  connection,
  updateUserRefreshTokenParams
) {
  const updateUserRefreshTokenQuery = `
        UPDATE User
        SET refreshToken = ?
        WHERE idx = ?
    `;
  await connection.query(
    updateUserRefreshTokenQuery,
    updateUserRefreshTokenParams
  );

  return;
}

// 유저 refreshToken 조회
async function selectUserRefreshToken(connection, userIdx) {
  const selectUserRefreshTokenQuery = `
                 SELECT refreshToken
                 FROM User
                 WHERE idx = ?;
                 `;
  const [userRow] = await connection.query(
    selectUserRefreshTokenQuery,
    userIdx
  );
  return userRow;
}

async function updateUserNickname(connection, updateUserInfoParams) {
  const updateUserNicknameQuery = `
                 UPDATE User
                 SET name = ?
                 WHERE idx = ?;
                 `;
  await connection.query(updateUserNicknameQuery, updateUserInfoParams);
  return;
}

async function updateUserNotification(connection, updateUserInfoParams) {
  const updateUserNotificationQuery = `
                 UPDATE User
                 SET notificationAllow = ?
                 WHERE idx = ?;
                 `;
  await connection.query(updateUserNotificationQuery, updateUserInfoParams);
  return;
}

module.exports = {
  selectUserOauthId,
  insertUserInfo,
  updateUserRefreshToken_oauthId,
  updateUserRefreshToken_userIdx,
  selectUserRefreshToken,
  updateUserNickname,
  updateUserNotification,
};
