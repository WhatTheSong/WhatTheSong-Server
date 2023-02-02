const { pool } = require("../../../config/database");
const commentDao = require('./commentDao');
const commentProvider = require("./CommentProvider");
const userProvider = require('../User/userProvider');
const { errResponse } = require("../../../config/response");
const { response } = require("express");
const baseResponse = require("../../../config/baseResponseStatus");

exports.createComment = async function(postIdx, commentIdx, commentContent, nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        await commentDao.insertComment(connection, postIdx, commentIdx, commentContent, nickname);
        await connection.commit();
        return response(baseResponse.SUCCESS, {});
    } catch (err) {
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
}

exports.updateComment = async function(postIdx, commentIdx, commentContent) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        await commentDao.updateComment(connection, commentContent, postIdx, commentIdx);
        await connection.commit();
        return response(baseResponse.SUCCESS, {});
    } catch (err) {
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
}

exports.deleteComment = async function(postIdx, commentIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        await commentDao.updateComment(connection, postIdx, commentIdx);
        await connection.commit();
        return response(baseResponse.SUCCESS, {});
    } catch (err) {
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
}
