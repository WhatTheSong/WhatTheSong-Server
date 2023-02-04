const { pool } = require("../../../config/database");
const commentDao = require('./commentDao');
const commentProvider = require("./CommentProvider");
const userProvider = require('../User/userProvider');
const { errResponse } = require("../../../config/response");
const { response } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

// 댓글 등록
exports.createComment = async function(postIdx, commentContent, nickname, loggedInUserIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        await commentDao.insertComment(connection, postIdx, commentContent, nickname, loggedInUserIdx);
        await connection.commit();
        return response(baseResponse.SUCCESS);
    } catch (err) {
        console.log(err)
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
}

// 댓글 수정
exports.updateComment = async function(postIdx, commentIdx, commentContent) {
    const connection = await pool.getConnection(async (conn) => conn);
    const commentRow = await commentProvider.getOneComment(postIdx, commentIdx)
    console.log(commentRow, "확인")
    if (!commentRow) {
        connection.release();
        return errResponse(baseResponse.COMMENT_COMMENTIDX_NOT_EXIST);
    } else {
        try {
            await connection.beginTransaction();
            await commentDao.updateComment(connection, commentContent, postIdx, commentIdx);
            await connection.commit();
            return response(baseResponse.SUCCESS);
        } catch (err) {
            console.log(err)
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
    
}

// 댓글 삭제
exports.deleteComment = async function(postIdx, commentIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const commentRow = await commentProvider.getOneComment(postIdx, commentIdx)
    console.log(commentRow, "확인")
    if (commentRow.length === 0) {
        connection.release();
        return errResponse(baseResponse.COMMENT_COMMENTIDX_NOT_EXIST);
    } else {
        try {
            await connection.beginTransaction();
            await commentDao.deleteComment(connection, postIdx, commentIdx);
            await connection.commit();
            return response(baseResponse.SUCCESS);
        } catch (err) {
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
}

// 답글 등록 
exports.createReply = async function(postIdx, parentIdx, replyContent, nickname, loggedInUserIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        await commentDao.insertReply(connection, postIdx, parentIdx, replyContent, nickname, loggedInUserIdx);
        await connection.commit();
        return response(baseResponse.SUCCESS);
    } catch (err) {
        console.log(err)
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
}

// 답글 수정
exports.updateReply = async function(postIdx, parentIdx, replyIdx, replyContent) {
    const connection = await pool.getConnection(async (conn) => conn);
    const replyRow = await commentProvider.getOneReply(postIdx, parentIdx, replyIdx)
    console.log(replyRow, "확인")
    if (!replyRow.length) {
        connection.release();
        return errResponse(baseResponse.COMMENT_REPLYIDX_NOT_EXIST);
    } else {
        try {
            await connection.beginTransaction();
            await commentDao.updateReply(connection, replyContent, postIdx, parentIdx, replyIdx);
            await connection.commit();
            return response(baseResponse.SUCCESS);
        } catch (err) {
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
    
}

// 답글 삭제
exports.deleteReply = async function(postIdx, parentIdx, replyIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const replyRow = await commentProvider.getOneReply(postIdx, parentIdx, replyIdx)
    console.log(replyRow, "확인")
    if (replyRow.length === 0) {
        connection.release();
        return errResponse(baseResponse.COMMENT_REPLYIDX_NOT_EXIST);
    } else {
        try {
            await connection.beginTransaction();
            await commentDao.deleteReply(connection, parentIdx, postIdx, replyIdx);
            await connection.commit();
            return response(baseResponse.SUCCESS);
        } catch (err) {
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
}