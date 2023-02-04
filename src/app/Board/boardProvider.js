const {pool} = require("../../../config/database");
const {logger} = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const {
    response,
    errResponse,
} = require("../../../config/response");

const boardDao = require("./boardDao");

// 전체 추천 게시글 읽기
exports.retrieveRecommendationList = async function(userIdx, writerIdx){
    const connection = await pool.getConnection(async (conn) => conn);

    const recommendationList = await boardDao.selectRecommendations(connection,userIdx);
    connection.release();

    return response(
        baseResponse.SUCCESS,
        writerIdx,
        recommendationList
    );
};

// 추천 게시글 상세 조회
exports.retrieveRecommendation = async function(recommendationIdx){
    const connection = await pool.getConnection(async (conn) => conn);

    const recommendation = await boardDao.selectRecommendation(connection, recommendationIdx);

    connection.release();
    
    if(!recommendation){
        return errResponse(baseResponse.BOARD_NOT_EXIST);
    }

    return response(baseResponse.SUCCESS, recommendation);
};

// 추천 게시글 존재 유무 확인
exports.recommendationCheck = async function(recommendationIdx){
    const connection = await pool.getConnection(async (conn) => conn);

    const recommendationRow = await boardDao.existRecommendation(
        connection,
        recommendationIdx
    );

    connection.release();

    return recommendationRow;
};
