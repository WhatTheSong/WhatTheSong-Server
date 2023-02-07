const {pool} = require("../../../config/database");
const {logger} = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const {
    response,
    errResponse,
} = require("../../../config/response");

const boardDao = require("./boardDao");

// 전체 추천 게시글 조회
exports.retrieveRecommendationList = async function(userIdx, nickname){
    const connection = await pool.getConnection(async (conn) => conn);

    const recommendationList = await boardDao.selectRecommendations(connection,userIdx);
    connection.release();

    return response(
        baseResponse.SUCCESS,
        nickname,
        recommendationList
    );
};

// 추천 게시글 상세 조회
exports.retrieveRecommendation = async function(boardIdx){
    const connection = await pool.getConnection(async (conn) => conn);

    const recommendation = await boardDao.selectRecommendation(connection, boardIdx);

    connection.release();
    
    if(!recommendation){
        return errResponse(baseResponse.BOARD_NOT_EXIST);
    }

    return response(baseResponse.SUCCESS, recommendation);
};

// 추천 게시글 존재 유무 확인
exports.recommendationCheck = async function(boardIdx){
    const connection = await pool.getConnection(async (conn) => conn);

    const recommendationRow = await boardDao.existRecommendation(
        connection,
        boardIdx
    );

    connection.release();

    return recommendationRow;
};

// user status 값 조회
exports.userStatusCheck = async function(userIdx){
    const connection = await pool.getConnection(async (conn) => conn);

    const userRow = await boardDao.selectUserIdx(connection, userIdx);
    if(!userRow)    return errResponse(baseResponse.USER_ID_NOT_MATCH);

    connection.release();

    if(userRow.status == "BANNED"){
        return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    }
    if(userRow.status == "DELETED"){
        return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }
    return;
}