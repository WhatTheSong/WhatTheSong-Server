const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const boardProvider = require("./boardProvider");
const boardDao = require("./boardDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const res = require("express/lib/response");

exports.postRecommendation = async function(
    userIdx,
    writerIdx,
    title,
    content
){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        const postRecommendationInfoParams = [
            userIdx,
            writerIdx,
            title,
            content,
        ];
        await connection.beginTransaction();
        const postRecommendationResult = await boardDao.insertRecommendation(
            connection,
            postRecommendationInfoParams
        );
        await connection.commit();
        return response(baseResponse.SUCCESS);
    }catch(err){
        await connection.rollback();
        logger.error(`Web - postRecommendation Service error\n: ${err.content}`);
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
};

exports.deleteRecommendation = async function(recommendationIdx, writerIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const isExistRecommendation = await boardProvider.recommendationCheck(recommendationIdx);
        // 추천 게시글 존재 확인
        if(!isExistRecommendation){
            return errResponse(baseResponse.BOARD_NOT_EXIST);
        }
        // 작성자 검증
        if(writerIdx !== isExistRecommendation.writerIdx){
            return errResponse(baseResponse.BOARD_USERIDX_NOT_MATCH);
        }

        await connection.beginTransaction();
        const deleteRecommendationResult = await boardDao.deleteRecommendation(
            connection,
            recommendationIdx
        );
        await connection.commit();
        return response(baseResponse.SUCCESS);
    } catch(err){
        await connection.rollback();
        logger.error(`Web - deleteRecommendation Service error\n: ${err.content}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally{
        connection.release();
    }
};

exports.patchRecommendation = async function(recommendationIdx, writerIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const isExistRecommendation = await boardProvider.recommendationCheck(recommendationIdx);
        // 추천 게시글 존재 확인
        if(!isExistRecommendation){
            return errResponse(baseResponse.BOARD_NOT_EXIST);
        }
        // 작성자 검증
        if(writerIdx !== isExistRecommendation.writerIdx){
            return errResponse(baseResponse.BOARD_USERIDX_NOT_MATCH);
        }

        await connection.beginTransaction();
        const patchRecommendationResult = await boardDao.updateRecommendation(
            connection,
            recommendationIdx
        );
        await connection.commit();
        return response(baseResponse.SUCCESS);
    } catch(err){
        await connection.rollback();
        logger.error(`Web - patchRecommendation Service error\n: ${err.content}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally{
        connection.release();
    }
};