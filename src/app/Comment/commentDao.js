// 댓글 목록 조회
async function selectComment(connection, postIdx) {
    const selectCommentListQuery = `
        SELECT comment, userIdx, updatedAt
        FROM Comment
        WHERE postIdx = ?;
        `;
    const [commentRows] = await connection.query(selectCommentListQuery, postIdx);
    return commentRows;
}

// 댓글 등록
// async function insertComment(connection) {
//     const insertCommentQuery = `
//         INSERT INTO Comment()`
// }

module.exports = {
    selectComment,
    //insertComment
}