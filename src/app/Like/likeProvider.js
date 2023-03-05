const { pool } = require("../../../config/database");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const likeDao = require('./likeDao');

// 특정 게시글의 좋아요 개수 반환
exports.countLikes = async function (postIdx) {
    console.log(postIdx)
    const connection = await pool.getConnection(async (conn) => conn);
    const likeListResult = await likeDao.selectLikes(connection, postIdx);
    console.log(likeListResult);
    connection.release();
    if (likeListResult.length === 0) {
        return response(baseResponse.LIKE_EMPTY)
    } else {
        return response(baseResponse.SUCCESS, {count: likeListResult.length})
    }
}

// 특정 회원이 특정 게시판에 좋아요 눌렀는지 확인
exports.checkLike = async function (postIdx, userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const checkLikeResult = await likeDao.selectOneLike(connection, postIdx, userIdx);
    console.log(checkLikeResult)
    connection.release();
    return checkLikeResult;
}