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
    nickname,
    fileUrl,
    title,
    content,
    category,
    boardType
){
    // 게시글 생성자 status 검사
    const checkUserStatus = await boardProvider.userStatusCheck(userIdx);
    if (checkUserStatus) {
        return checkUserStatus;
    }

    const connection = await pool.getConnection(async (conn) => conn);
    
    const postRecommendationInfoParams = [
        userIdx,
        nickname,
        fileUrl,
        title,
        content,
        category,
        boardType,
    ];
    //console.log("유저아이디",postRecommendationInfoParams);
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
        //console.log(err);

        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
    
};

exports.deleteRecommendation = async function(boardIdx, userIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const isExistRecommendation = await boardProvider.recommendationCheck(boardIdx);
        //console.log(userIdx); // writerIdx
        //console.log(isExistRecommendation[0]);
        // 추천 게시글 존재 확인
        if(isExistRecommendation.length === 0){
            return errResponse(baseResponse.BOARD_NOT_EXIST);
        }
        // 해당 작성자가 쓴 게시글이 맞는지 검증
        if(userIdx !== isExistRecommendation[0].writerIdx){
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
        //console.log(err);
        return errResponse(baseResponse.DB_ERROR);
    } finally{
        connection.release();
    }
};

exports.patchRecommendation = async function(
    fileUrl,
    title,
    content,
    category,
    boardIdx,
    loggedInUserIdx
){
    const connection = await pool.getConnection(async (conn) => conn);
    const patchRecommendationInfoParams = [
        fileUrl,
        title,
        content,
        category,
        boardIdx,
        loggedInUserIdx
    ];
    try {
        const isExistRecommendation = await boardProvider.recommendationCheck(boardIdx);
        //console.log(loggedInUserIdx);
        //console.log(isExistRecommendation[0]);
        // 추천 게시글 존재 확인
        if(isExistRecommendation.length === 0){
            return errResponse(baseResponse.BOARD_NOT_EXIST);
        }
        // 작성자 검증
        if(loggedInUserIdx !== isExistRecommendation[0].writerIdx){
            return errResponse(baseResponse.BOARD_USERIDX_NOT_MATCH);
        }

        await connection.beginTransaction();
        const patchRecommendationResult = await boardDao.updateRecommendation(
            connection,
            patchRecommendationInfoParams
        );
        await connection.commit();
        return response(baseResponse.SUCCESS);
    } catch(err){
        await connection.rollback();
        logger.error(`Web - patchRecommendation Service error\n: ${err.content}`);
        //console.log(err);
        return errResponse(baseResponse.DB_ERROR);
    } finally{
        connection.release();
    }
};