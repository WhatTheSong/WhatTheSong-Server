const { pool } = require("../../../config/database");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const likeDao = require('./likeDao');

// 특정 게시글의 좋아요 개수 반환
exports.countLikes = async function (postIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const likeListResult = await likeDao.selectLike(connection, postIdx);
    connection.release();
    return response(baseResponse.SUCCESS, {count: likeListResult.lenght})
}

exports.checkLike = async function (postIdx, userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const checkLikeResult = await likeDao.selectOneLike(connection, postIdx, userIdx);
    connection.release();
    return checkLikeResult;
}