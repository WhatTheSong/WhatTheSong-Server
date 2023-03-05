async function selectLikes(connection, postIdx) {
    const selectLikeListQuery = `
        SELECT userIdx
        FROM ThumbsUp
        WHERE postIdx = ?;`;
    const [likeRows] = await connection.query(selectLikeListQuery, postIdx);
    console.log(likeRows)
    return likeRows;
}

async function selectOneLike(connection, postIdx, userIdx) {
    const selectOneLikeQuery = `
        SELECT userIdx
        FROM ThumbsUp
        WHERE postIdx = ? AND userIdx = ?;`;
    const [like] = await connection.query(selectOneLikeQuery, [postIdx, userIdx]);
    console.log(like)
    return like;
}

async function insertLike(connection, postIdx, userIdx) {
    const insertLikeQuery = `
        INSERT INTO ThumbsUp(postIdx, userIdx)
        VALUES (?,?);`;
    await connection.query(insertLikeQuery, [postIdx, userIdx]);
    return;
}

async function deleteLike(connection, postIdx, userIdx) {
    const deleteLikeQuery = `
        DELETE FROM ThumbsUp
        WHERE postIdx = ? AND userIdx = ?;`;
    await connection.query(deleteLikeQuery, [postIdx, userIdx]);
    return;
}

module.exports = {
    selectLikes,
    selectOneLike,
    insertLike,
    deleteLike
}