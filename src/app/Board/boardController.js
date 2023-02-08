const jwtMiddleware = require("../../../config/jwtMiddleware");
const boardProvider = require("../../app/Board/boardProvider");
const boardService = require("../../app/Board/boardService");
const userProvider = require("../User/userProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API NAME : 전체 추천 게시글 조회 API
 * [GET] /app/boards/:boardType/contents
 */
exports.getRecommendations = async function(req, res){
    /**
     * Path Variable: boardType
     * Middleware: boardType, nickname
     */

    const loggedInUserIdx = req.verifiedToken.userIdx;
    const nickname = userProvider.getNickname(loggedInUserIdx);
    const boardType = req.params.boardType;

    const recommendationListResult = await boardProvider.retrieveRecommendationList(
        nickname,
        boardType
    );

    return res.send(recommendationListResult);
};

/**
 * API NAME: 추천 게시글 작성 API
 * [POST] /app/boards/:boardType/contents
 */
exports.postRecommendation = async function(req, res){
    /**
     * Body: fileUrl, content, category, title
     * jwt: userIdx
     * Middleware: userIdx, nickname
     */

    const {fileUrl, content, category, title} = req.body;
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const {boardType}= req.params
    const nickname = await userProvider.getNickname(loggedInUserIdx);
    //const userIdx = parseInt(req.params.userIdx);

    // 형식적 validation 처리
    if(!fileUrl){
        return res.send(errResponse(baseResponse.BOARD_FILEURL_EMPTY));
    } else if(!content){
        return res.send(errResponse(baseResponse.BOARD_CONTENT_EMPTY));
    } else if(!category){
        return res.send(errResponse(baseResponse.BOARD_CATEGORY_EMPTY));
    } else if(!title){
        return res.send(errResponse(baseResponse.BOARD_TITLE_EMPTY));
    } else if(!nickname){
        return res.send(errResponse(baseResponse.BOARD_NICKNAME_EMPTY));
    }

    const postRecommendationResponse = await boardService.postRecommendation(
        loggedInUserIdx,
        nickname,
        fileUrl,
        title,
        content,
        category,
        boardType,
    );

    return res.send(postRecommendationResponse);
};

/**
 * API NAME: 추천 게시글 상세 조회 API
 * [GET]: /app/boards/:boardType/contents/:boardIdx
 */
exports.getRecommendation = async function(req, res){
    /**
     * Path Variable: boardIdx
     */
    const {boardIdx} = req.params;
    
    if(!boardIdx)  
        return res.send(errResponse(baseResponse.BOARD_USERIDX_EMPTY));
    
    const recommendationResult = await boardProvider.retrieveRecommendation(boardIdx);

    return res.send(recommendationResult);
};

/**
 * API NAME: 게시글 삭제 API
 * [DELETE] /app/boards/:boardType/contents/:boardIdx
 */
exports.deleteRecommendation = async function(req, res){
    /**
     * Path Variable: userIdx, boardIdx
     */
    const {boardIdx} = req.params;
    const loggedInUserIdx = req.verifiedToken.userIdx;

    if(!boardIdx)
        return res.send(errResponse(baseResponse.BOARD_USERIDX_EMPTY));

    const deleteRecommendationResponse = await boardService.deleteRecommendation(
        parseInt(boardIdx),
        loggedInUserIdx
    );

    return res.send(deleteRecommendationResponse);
};

/**
 * API NAME: 게시글 수정 API
 * [PATCH] /app/boards/:boardType/contents/:boardIdx
 */
exports.patchRecommendation = async function(req, res){
    /**
     * Path Variable: userIdx, boardIdx
     */
    const {boardIdx} = req.params;
    const loggedInUserIdx = req.verifiedToken.userIdx;

    if(!boardIdx)
        return res.send(errResponse(baseResponse.BOARD_USERIDX_EMPTY));
    
    const patchRecommendationResponse = await boardService.patchRecommendation(
        parseInt(boardIdx),
        loggedInUserIdx
    );

    return res.send(patchRecommendationResponse);
};