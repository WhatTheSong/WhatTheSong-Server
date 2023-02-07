const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { response } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const likeProvider = require("./likeProvider");

exports.addLike = async function(postIdx, userIdx) {
    const connection =await pool.getConnection(async (conn) => conn);
    const like = await likeProvider.checkLike(postIdx, userIdx);
    if (!like) {
        try {
            await connection.beginTransaction();
            await likeDao.addLike(connection, postIdx, userIdx);
            await connection.commit();
            return response(baseResponse.SUCCESS, {});
        } catch (err) {
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    } else {
        try {
            await connection.beginTransaction();
            await likeDao.deleteLike(connection, postIdx, userIdx);
            await connection.commit();
            return response(baseResponse.SUCCESS, {});
        } catch (err) {
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
}