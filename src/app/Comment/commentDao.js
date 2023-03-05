// 댓글 목록 조회
async function selectComment(connection, postIdx) {
  const selectCommentListQuery = `
        SELECT idx, comment, userIdx, updatedAt, nickname
        FROM Comment
        WHERE postIdx = ? AND status = 'comment';`;
  const [commentRows] = await connection.query(selectCommentListQuery, postIdx);
  return commentRows;
}

// 특정 댓글 조회
async function selectOneComment(connection, commentIdx) {
  const selectOneCommentQuery = `
        SELECT comment, userIdx, updatedAt, nickname
        FROM Comment
        WHERE idx = ? AND status = 'comment';`;
  const commentRow = await connection.query(selectOneCommentQuery, commentIdx);
  return commentRow[0];
}

// 댓글 등록
async function insertComment(connection, postIdx, commentContent, nickname, loggedInUserIdx) {
  const insertCommentQuery = `
        INSERT INTO Comment(postIdx, comment, nickname, status, userIdx)
        VALUES (?,?,?,'comment',?);`;
  await connection.query(insertCommentQuery, [postIdx, commentContent, nickname, loggedInUserIdx]);
  return;
}

// 댓글 수정
async function updateComment(connection, commentContent, commentIdx) {
  const updateCommentQuery = `
        UPDATE Comment
        SET comment = ?
        WHERE idx = ?;`;
  await connection.query(updateCommentQuery, [commentContent, commentIdx]);
  return;
}

// 댓글 삭제
async function deleteComment(connection, commentIdx) {
  const deleteCommentQuery = `
        UPDATE Comment
        SET status = 'deleted'
        WHERE idx = ?;`;
  await connection.query(deleteCommentQuery, commentIdx);
  return;
}

// 답글 목록 조회
async function selectReply(connection, parentIdx) {
  const selectReplyListQuery = `
        SELECT idx, comment, userIdx, updatedAt, nickname
        FROM Comment
        WHERE parentIdx = ? AND status = 'reply';`;
  const [replyRows] = await connection.query(selectReplyListQuery, parentIdx);
  return replyRows;
}

// 특정 답글 조회
async function selectOneReply(connection, replyIdx) {
  const selectOneReplyQuery = `
        SELECT comment, userIdx, updatedAt, nickname
        FROM Comment
        WHERE idx = ? AND status = 'reply';`;
  const replyRow = await connection.query(selectOneReplyQuery, replyIdx);
  return replyRow[0];
}

// 답글 등록
async function insertReply(connection, postIdx, parentIdx, replyContent, nickname, loggedInUserIdx) {
  const insertReplyQuery = `
        INSERT INTO Comment(postIdx, parentIdx, comment, nickname, status, userIdx)
        VALUES (?,?,?,?,'reply',?);`;
  await connection.query(insertReplyQuery, [postIdx, parentIdx, replyContent, nickname, loggedInUserIdx]);
  return;
}

// 답글 수정
async function updateReply(connection, commentContent, replyIdx) {
  const updateCommentQuery = `
        UPDATE Comment
        SET comment = ?
        WHERE idx = ?;`;
  await connection.query(updateCommentQuery, [commentContent, replyIdx]);
  return;
}

// 답글 삭제
async function deleteReply(connection, replyIdx) {
  const deleteReplyQuery = `
        UPDATE Comment
        SET status = 'deleted'
        WHERE idx = ?;`;
  await connection.query(deleteReplyQuery, replyIdx);
  return;
}

// idx로 댓글(답글) 조회
async function selectCommentOrReply(connection, idx) {
  const selectCommentOrReplyQuery = `
    SELECT idx
    FROM Comment
    WHERE idx = ?
    AND (status = 'comment' OR status = 'reply');
    `;
  const [resultRow] = await connection.query(selectCommentOrReplyQuery, idx);
  return resultRow[0];
}

// 신고 누적 시 자동으로 댓글 삭제
async function automaticallyDelete(connection, idx) {
  const automaticallyDeleteQuery = `
        UPDATE Comment
        SET status = 'deleted'
        WHERE idx = ?;`;
  await connection.query(automaticallyDeleteQuery, idx);
  return;
}

module.exports = {
  selectComment,
  selectOneComment,
  insertComment,
  updateComment,
  deleteComment,
  selectReply,
  selectOneReply,
  insertReply,
  updateReply,
  deleteReply,
  selectCommentOrReply,
  automaticallyDelete,
};
