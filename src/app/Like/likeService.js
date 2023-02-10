const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { response } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const likeProvider = require("./likeProvider");
const likeDao = require("./likeDao");

// 좋아요 추가
exports.addLike = async function(postIdx, userIdx) {
    const connection =await pool.getConnection(async (conn) => conn);
    const like = await likeProvider.checkLike(postIdx, userIdx);
    console.log(like)
    if (like.length === 0) { // 좋아요를 누른적 없을 경우
        try {
            await connection.beginTransaction();
            await likeDao.insertLike(connection, postIdx, userIdx);
            await connection.commit();
            return response(baseResponse.LIKE_SUCCESS);
        } catch (err) {
            console.log(err)
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    } else {  // 좋아요를 누른적 있을 경우 (다시 누르면 삭제)
        try {
            await connection.beginTransaction();
            await likeDao.deleteLike(connection, postIdx, userIdx);
            await connection.commit();
            return response(baseResponse.LIKE_DELETE);
        } catch (err) {
            return errResponse(baseResponse.DB_ERROR);
        } finally {
            connection.release();
        }
    }
}