const { pool } = require("../../../config/database");
const commentDao = require('./commentDao');
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

// 댓글 목록 조회
exports.getComments = async function (postIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const commentListResult = await commentDao.selectComment(connection, postIdx);
    console.log(commentListResult)
    connection.release();
    if (commentListResult.length === 0) {  // 조회할 댓글 목록이 비어 있을 경우
        return errResponse(baseResponse.COMMENT_EMPTY)
    } else {  // 댓글 목록이 존재하는 경우
        return response(baseResponse.SUCCESS,commentListResult);
    }
}

// 특정 댓글 조회
exports.getOneComment = async function (postIdx, commentIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const commentResult = await commentDao.selectOneComment(connection, postIdx, commentIdx);
    connection.release();
    return commentResult
}

// 답글 목록 조회
exports.getReplies = async function (postIdx, parentIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const replyListResult = await commentDao.selectReply(connection, postIdx, parentIdx);
    connection.release();
    if (replyListResult.length === 0) {  // 조회할 대댓글 목록이 비어 있을 경우
        return errResponse(baseResponse.REPLY_EMPTY)
    } else {  // 대댓글 목록이 존재하는 경우
        return response(baseResponse.SUCCESS, replyListResult);
    }
}

// 특정 답글 조회
exports.getOneReply = async function (postIdx, parentIdx, replyIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const replyResult = await commentDao.selectOneReply(connection, postIdx, parentIdx, replyIdx);
    connection.release();
    return replyResult
}