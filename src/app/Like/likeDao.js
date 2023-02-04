async function selectLike(connection, postIdx) {
    const selectLikeListQuery = `
        SELECT userIdx
        FROM Like
        WHERE postIdx = ?;`;
    const [likeRows] = await connection.query(selectLikeListQuery, postIdx);
    return likeRows;
}

async function selectOneLike(connection, postIdx, userIdx) {
    const selectOneLikeQuery = `
        SELECT userIdx
        FROM Like
        WHERE postIdx = ? AND userIdx = ?;`;
    const [like] = await connection.query(selectOneLikeQuery, postIdx, userIdx);
    return like;
}

async function insertLike(connection, postIdx, userIdx) {
    const insertLikeQuery = `
        INSERT INTO Like(postIdx, userIdx)
        VALUES (?,?);`;
    await connection.query(insertLikeQuery, postIdx, userIdx);
    return;
}

async function deleteLike(connection, postIdx, userIdx) {
    const deleteLikeQuery = `
        DELETE FROM Like
        WHERE postIdx = ? AND userIdx = ?;`;
    await connection.query(deleteLikeQuery, postIdx, userIdx);
    return;
}

module.exports = {
    selectLike,
    selectOneLike,
    insertLike,
    deleteLike
}