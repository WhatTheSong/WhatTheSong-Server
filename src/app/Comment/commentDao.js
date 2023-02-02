// 댓글 목록 조회
async function selectComment(connection, postIdx) {
    const selectCommentListQuery = `
        SELECT comment, userIdx, updatedAt, nickname
        FROM Comment
        WHERE postIdx = ? AND status = '1';`;
    const [commentRows] = await connection.query(selectCommentListQuery, postIdx);
    return commentRows;
}

// 유저 닉네임 조회
// async function selectNickname(connection, userIdx) {
//     const selectNicknameQuery = `
//         SELECT name
//         FROM User
//         WHERE idx = ?`;
//     const [nickname] = await connection.query(selectNicknameQuery, userIdx);
//     return nickname;
// }

// 댓글 등록
async function insertComment(connection, postIdx, commentIdx, commentContent, nickname) {
    const insertCommentQuery = `
        INSERT INTO Comment(postIdx, commentIdx, commentContent, nickname, status)
        VALUES (?,?,?,?,'1');`;
    await connection.query(insertCommentQuery, postIdx, commentIdx, commentContent, nickname);
    return;
}

async function updateComment(connection, commentContent, postIdx, commentIdx) {
    const updateCommentQuery = `
        UPDATE Comment
        SET content = ?
        WHERE postIdx = ? AND commentIdx = ?;`;
    await connection.query(updateCommentQuery, commentContent, postIdx, commentIdx);
    return;
}

async function deleteComment(connection, postIdx, commentIdx) {
    const deleteCommentQuery = `
        UPDATE Comment
        SET status = "0"
        WHERE postIdx = ? AND commentIdx = ?;`;
    await connection.query(deleteCommentQuery, postIdx, commentIdx);
    return;
}

module.exports = {
    selectComment,
    insertComment,
    updateComment,
    deleteComment,
}