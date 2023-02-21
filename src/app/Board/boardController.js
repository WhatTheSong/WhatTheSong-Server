const boardProvider = require("../../app/Board/boardProvider");
const boardService = require("../../app/Board/boardService");
const userProvider = require("../User/userProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {errResponse} = require("../../../config/response");

/**
 * API NAME : 전체 게시글 조회 API
 * [GET] /app/boards/:boardType/contents
 */
exports.getBoards = async function(req, res){
    /**
     * Path Variable: boardType
     */
    // boardType이 0일 때 질문 게시판, 1일 때 추천 게시판
    const boardType = parseInt(req.params.boardType);
    if (boardType === 0){ // 질문 게시판
        const questionListResult = await boardProvider.retrieveQuestionList(boardType)
        return res.send(questionListResult);
    } else if (boardType === 1) { // 추천 게시판
        const recommendationListResult = await boardProvider.retrieveRecommendationList(boardType);
        return res.send(recommendationListResult);
    } else { // 존재하지 않는 게시판 종류
        return res.send(errResponse(baseResponse.BOARDTYPE_NOT_EXIST))
    };
};

/**
 * API NAME: 게시글 상세 조회 API
 * [GET]: /app/boards/:boardType/contents/:boardIdx
 */
exports.getOneBoard = async function(req, res){
    /**
     * Path Variable: boardType, boardIdx
     */
    const {boardIdx} = req.params;
    const boardType = parseInt(req.params.boardType);
    
    if (boardType === 0) { // 질문 게시판
        const questionResult = await boardProvider.retrieveQuestion(boardType, boardIdx);
        return res.send(questionResult);
    } else if (boardType === 1) { // 추천 게시판
        const recommendationResult = await boardProvider.retrieveRecommendation(boardType, boardIdx);
        return res.send(recommendationResult);
    } else {
        return res.send(errResponse(baseResponse.BOARDTYPE_NOT_EXIST));
    }
};

/**
 * API NAME: 게시글 작성 API
 * [POST] /app/boards/:boardType/contents
 */
exports.postBoard = async function(req, res){
    /**
     * Path Variable: boardType
     * Body: content, category, title
     */

    const {content, category, title} = req.body;
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const boardType = parseInt(req.params.boardType);
    const nickname = await userProvider.getNickname(loggedInUserIdx);
    
    // boardType이 0일 때 질문 게시판, 1일 때 추천 게시판
    // 질문 게시판은 제목과 카테고리를 작성하지 않음
    if (boardType === 0) { // 질문 게시판
        const postQuestionResponse = await boardService.postQuestion(
            loggedInUserIdx,
            nickname,
            content,
            boardType,
        );
        return res.send(postQuestionResponse);
    } else if (boardType === 1) { // 추천 게시판
        const postRecommendationResponse = await boardService.postRecommendation(
            loggedInUserIdx,
            nickname,
            title,
            content,
            category,
            boardType,
        );
        return res.send(postRecommendationResponse);
    } else { // 존재하지 않는 게시판 종류
        return res.send(errResponse(baseResponse.BOARDTYPE_NOT_EXIST))
    }
};

/**
 * API NAME: 게시글 삭제 API
 * [DELETE] /app/boards/contents/:boardIdx
 */
exports.deleteBoard = async function(req, res){
    /**
     * Path Variable: boardIdx
     */
    const {boardIdx} = req.params;
    const loggedInUserIdx = req.verifiedToken.userIdx;
    if(!boardIdx)
        return res.send(errResponse(baseResponse.BOARD_USERIDX_EMPTY));
    const deleteBoardResponse = await boardService.deleteBoard(
        parseInt(boardIdx),
        loggedInUserIdx
    );

    return res.send(deleteBoardResponse);
};

/**
 * API NAME: 게시글 수정 API
 * [PATCH] /app/boards/:boardType/contents/:boardIdx
 */
exports.patchBoard = async function(req, res){
    /**
     * Path Variable: boardType, boardIdx
     * Body: content, category, title
     */
    const {boardIdx} = req.params;
    const {title, content, category} = req.body;
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const boardType = parseInt(req.params.boardType);

    if (boardType === 0){ // 질문 게시판
        const patchQuestionResponse = await boardService.patchQuestion(
            content,
            parseInt(boardIdx),
            loggedInUserIdx
        );
        return res.send(patchQuestionResponse);
    } else if (boardType === 1) { // 추천 게시판
        const patchRecommendationResponse = await boardService.patchRecommendation(
            title,
            content,
            category,
            parseInt(boardIdx),
            loggedInUserIdx
        );
        return res.send(patchRecommendationResponse);
    } else {
        return res.send(errResponse(baseResponse.BOARDTYPE_NOT_EXIST));
    }
};