const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const boardProvider = require("./boardProvider");
const boardDao = require("./boardDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const res = require("express/lib/response");
const userProvider = require("../User/userProvider");

exports.postRecommendation = async function(
    userIdx,
    fileUrl,
    title,
    content,
    category
){
    const connection = await pool.getConnection(async (conn) => conn);
    
    const postRecommendationInfoParams = [
        userIdx,
        fileUrl,
        title,
        content,
        category
    ];
    console.log("유저아이디",postRecommendationInfoParams);
    try{
        
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
        console.log(err);

        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
    
};

exports.deleteRecommendation = async function(boardIdx, nickname){
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const isExistRecommendation = await boardProvider.recommendationCheck(boardIdx);
        // 추천 게시글 존재 확인
        if(!isExistRecommendation){
            return errResponse(baseResponse.BOARD_NOT_EXIST);
        }
        // 작성자 검증
        if(nickname !== isExistRecommendation.nickname){
            return errResponse(baseResponse.BOARD_USERIDX_NOT_MATCH);
        }

        await connection.beginTransaction();
        const deleteRecommendationResult = await boardDao.deleteRecommendation(
            connection,
            boardIdx
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

exports.patchRecommendation = async function(boardIdx, nickname){
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const isExistRecommendation = await boardProvider.recommendationCheck(boardIdx);
        // 추천 게시글 존재 확인
        if(!isExistRecommendation){
            return errResponse(baseResponse.BOARD_NOT_EXIST);
        }
        // 작성자 검증
        if(nickname !== isExistRecommendation.nickname){
            return errResponse(baseResponse.BOARD_USERIDX_NOT_MATCH);
        }

        await connection.beginTransaction();
        const patchRecommendationResult = await boardDao.updateRecommendation(
            connection,
            boardIdx
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