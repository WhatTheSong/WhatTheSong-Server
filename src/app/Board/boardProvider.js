const {pool} = require("../../../config/database");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const boardDao = require("./boardDao");

// 전체 추천 게시글 조회 (boardType === 1)
exports.retrieveRecommendationList = async function(boardType){
    const connection = await pool.getConnection(async (conn) => conn);
    const recommendationList = await boardDao.selectRecommendations(connection, boardType);
    connection.release();
    return response(
        baseResponse.SUCCESS,
        recommendationList
    );
};

// 전체 질문 게시글 조회 (boardType === 0)
exports.retrieveQuestionList = async function(boardType){
    const connection = await pool.getConnection(async (conn) => conn);
    const questionList = await boardDao.selectQuestions(connection, boardType);
    connection.release();
    return response(
        baseResponse.SUCCESS,
        questionList
    );
};

// 추천 게시글 상세 조회
exports.retrieveRecommendation = async function(boardType, boardIdx){
    const connection = await pool.getConnection(async (conn) => conn);

    const recommendation = await boardDao.selectRecommendation(
        connection, 
        boardType,
        boardIdx
    );
    connection.release();
    
    if(!recommendation){
        return errResponse(baseResponse.BOARD_NOT_EXIST);
    }

    return response(baseResponse.SUCCESS, recommendation);
};

// 질문 게시글 상세 조회
exports.retrieveQuestion = async function(boardType, boardIdx){
    const connection = await pool.getConnection(async (conn) => conn);

    const question = await boardDao.selectQuestion(
        connection, 
        boardType, 
        boardIdx
    );
    connection.release();
    
    if(!question){
        return errResponse(baseResponse.BOARD_NOT_EXIST);
    }
    return response(baseResponse.SUCCESS, question);
};

// 게시글 존재 유무 확인
exports.boardCheck = async function(boardType, boardIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const boardRow = await boardDao.existBoard(
        connection,
        boardType,
        boardIdx
    );
    connection.release();
    return boardRow;
};

// 유저 status 값 조회
exports.userStatusCheck = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userRow = await boardDao.selectUserIdx(connection, userIdx);
    console.log(userRow.status)
    connection.release();
    if (userRow.status === "banned") { // 정지된 회원
        return errResponse(baseResponse.BOARD_USER_BANNED);
    } else if (userRow.status === "deleted") { // 탈퇴한 회원
        return errResponse(baseResponse.BOARD_USER_DELETED);
    } else if (userRow.status === "member") { // 일반 회원
        return response(baseResponse.SUCCESS);
    } else {
        return errResponse(baseResponse.USER_USERID_NOT_EXIST);
    }
};