// 댓글 목록 조회
async function selectComment(connection, postIdx) {
    const selectCommentListQuery = `
        SELECT comment, userIdx, updatedAt, nickname
        FROM Comment
        WHERE postIdx = ? AND status = 'comment';`;
    const [commentRows] = await connection.query(selectCommentListQuery, postIdx);
    return commentRows;
}

// 특정 댓글 조회
async function selectOneComment(connection, postIdx, commentIdx) {
    const selectOneCommentQuery = `
        SELECT comment, userIdx, updatedAt, nickname
        FROM Comment
        WHERE postIdx = ? AND idx = ? AND status = 'comment';`;
    const commentRow = await connection.query(selectOneCommentQuery, [postIdx, commentIdx]);
    return commentRow[0];
}

// 댓글 등록
async function insertComment(connection, postIdx, commentContent, nickname, loggedInUserIdx) {
    //console.log(loggedInUserIdx)
    const insertCommentQuery = `
        INSERT INTO Comment(postIdx, comment, nickname, status, userIdx)
        VALUES (?,?,?,'comment',?);`;
    await connection.query(insertCommentQuery, [postIdx, commentContent, nickname,loggedInUserIdx]);
    return;
}

// 댓글 수정
async function updateComment(connection, commentContent, postIdx, commentIdx) {
    const updateCommentQuery = `
        UPDATE Comment
        SET comment = ?
        WHERE postIdx = ? AND idx = ?;`;
    await connection.query(updateCommentQuery, [commentContent, postIdx, commentIdx]);
    return;
}

// 댓글 삭제
async function deleteComment(connection, postIdx, commentIdx) {
    const deleteCommentQuery = `
        UPDATE Comment
        SET status = 'deleted'
        WHERE postIdx = ? AND idx = ?;`;
    await connection.query(deleteCommentQuery, [postIdx, commentIdx]);
    return;
}

// 답글 목록 조회
async function selectReply(connection, postIdx, parentIdx) {
    const selectReplyListQuery = `
        SELECT comment, userIdx, updatedAt, nickname
        FROM Comment
        WHERE postIdx = ? AND parentIdx = ? AND status = 'reply';`;
    const [replyRows] = await connection.query(selectReplyListQuery, [postIdx, parentIdx]);
    return replyRows;
}

// 특정 답글 조회
async function selectOneReply(connection, postIdx, parentIdx, replyIdx) {
    const selectOneReplyQuery = `
        SELECT comment, userIdx, updatedAt, nickname
        FROM Comment
        WHERE postIdx = ? AND parentIdx = ? AND idx = ? AND status = 'reply';`;
    const replyRow = await connection.query(selectOneReplyQuery, [postIdx, parentIdx, replyIdx]);
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
async function updateReply(connection, commentContent, postIdx, parentIdx, replyIdx) {
    const updateCommentQuery = `
        UPDATE Comment
        SET comment = ?
        WHERE postIdx = ? AND parentIdx = ? AND idx = ?;`;
    await connection.query(updateCommentQuery, [commentContent, postIdx, parentIdx, replyIdx]);
    return;
}

// 답글 삭제
async function deleteReply(connection, parentIdx, postIdx, replyIdx) {
    const deleteReplyQuery = `
        UPDATE Comment
        SET status = 'deleted'
        WHERE postIdx = ? AND parentIdx = ? AND idx = ?;`;
    await connection.query(deleteReplyQuery, [postIdx, parentIdx, replyIdx]);
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
}