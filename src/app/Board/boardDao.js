// 쿼리문의 writerIdx == userIdx

// 전체 추천 게시글 조회
async function selectRecommendations(connection, boardType) {
  const selectRecommendationListQuery = `
        SELECT idx, fileUrl, category, title, content, nickname
        FROM Board
        WHERE status = "posted" and boardType = ?;
        `;
  const [recommendationListRow] = await connection.query(selectRecommendationListQuery, boardType);
  return recommendationListRow;
}
// 전체 질문 게시글 조회
async function selectQuestions(connection, boardType) {
  const selectQuestionListQuery = `
        SELECT idx, fileUrl, content, nickname
        FROM Board
        WHERE status = "posted" and boardType = ?;
        `;
  const [questionListRow] = await connection.query(selectQuestionListQuery, boardType);
  return questionListRow;
}

// 추천 게시글 상세 조회
async function selectRecommendation(connection, boardType, boardIdx) {
  console.log(boardType);
  const selectRecommendationQuery = `
        SELECT fileUrl, category, title, content, nickname
        FROM Board
        WHERE boardType = ? AND status = "posted" AND idx = ?;
        `;
  const [recommendationListRow] = await connection.query(selectRecommendationQuery, [boardType, boardIdx]);
  return recommendationListRow[0];
}

// 질문 게시글 상세 조회
async function selectQuestion(connection, boardType, boardIdx) {
  const selectQuestionQuery = `
        SELECT fileUrl, content, nickname
        FROM Board
        WHERE boardType = ? AND status = "posted" AND idx = ?;
        `;
  const [QuestionListRow] = await connection.query(selectQuestionQuery, [boardType, boardIdx]);

  return QuestionListRow[0];
}

// 추천 게시글 생성
async function insertRecommendation(connection, postRecommendationInfoParams) {
  const insertRecommendationQuery = `
        INSERT INTO Board (writerIdx, nickname, fileUrl, title, content, category, boardType, status)
        VALUE (?, ?, ?, ?, ?, ?, ?, "posted");
        `;
  const insertRecommendationRow = await connection.query(insertRecommendationQuery, postRecommendationInfoParams);

  return insertRecommendationRow[0];
}
// 질문 게시글 생성
async function insertQuestion(connection, postQuestionInfoParams) {
  const insertQuestionQuery = `
        INSERT INTO Board (writerIdx, nickname, fileUrl, content, boardType, status)
        VALUE (?, ?, ?, ?, ?, "posted");
        `;
  const insertQuestionRow = await connection.query(insertQuestionQuery, postQuestionInfoParams);

  return insertQuestionRow[0];
}

// 추천 게시글 삭제
async function deleteBoard(connection, boardIdx) {
  const deleteBoardQuery = `
        UPDATE Board
        SET status = "deleted"
        WHERE idx = ?;
        `;
  const deleteBoardRow = await connection.query(deleteBoardQuery, boardIdx);

  return deleteBoardRow[0];
}

// 게시글 존재 유무 확인
async function existBoard(connection, boardIdx) {
  const existBoardQuery = `
        SELECT writerIdx
        FROM Board
        WHERE status = "posted" and idx = ?;
        `;
  const boardRow = await connection.query(existBoardQuery, boardIdx);

  return boardRow[0];
}

// 추천 게시글 수정
async function updateRecommendation(connection, patchRecommendationInfoParams) {
  const updateRecommendationQuery = `
        UPDATE Board
        SET fileUrl = ?, title = ?, content = ?, category = ?
        WHERE idx = ?;
        `;
  const updateRecommendationRow = await connection.query(updateRecommendationQuery, patchRecommendationInfoParams);

  return updateRecommendationRow[0];
}

// 질문 게시글 수정
async function updateQuestion(connection, patchQuestionInfoParams) {
  const updateQuestionQuery = `
        UPDATE Board
        SET fileUrl = ?, content = ?
        WHERE idx = ?;
        `;
  const updateQuestionRow = await connection.query(updateQuestionQuery, patchQuestionInfoParams);

  return updateQuestionRow[0];
}

// 유저 조회
async function selectUserIdx(connection, userIdx) {
  const selectUserIdxQuery = `
        SELECT idx, status
        FROM User
        WHERE idx = ?;
    `;
  const [userRow] = await connection.query(selectUserIdxQuery, userIdx);
  return userRow[0];
}

module.exports = {
  selectRecommendations,
  selectQuestions,
  selectRecommendation,
  selectQuestion,
  insertRecommendation,
  insertQuestion,
  deleteBoard,
  existBoard,
  updateRecommendation,
  updateQuestion,
  selectUserIdx,
};
