const jwtMiddleware = require("../../../config/jwtMiddleware");
const boardProvider = require("../../app/Board/boardProvider");
const boardService = require("../../app/Board/boardService");
const userProvider = require("../User/userProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API NAME : 전체 추천 게시글 조회 API
 * [GET] /app/boards/:userIdx/recommendations
 */
exports.getRecommendations = async function(req, res){
    /**
     * Path Variable: userIdx
     * Middleware: userIdx, writerIdx
     */
    const userIdx = req.userIdx; // boardService 에서 받아옴
    const writerIdx = req.writerIdx;

    const recommendationListResult = await boardProvider.retrieveRecommendationList(
        userIdx,
        writerIdx
    );

    return res.send(recommendationListResult);
};

/**
 * API NAME: 추천 게시글 작성 API
 * [POST] /app/boards/:userIdx/recommendations/:recommendationIdx
 */
exports.postRecommendation = async function(req, res){
    /**
     * Body: fileUrl, writerIdx, content, category
     * jwt: userIdx
     * Middleware: userIdx, writerIdx
     */

    const {fileUrl, writerIdx, content, category} = req.body;
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const userIdx = req.userIdx;

    // 게시글 작성 불가
    if(loggedInUserIdx == userIdx){
        return res.send(errResponse(baseResponse.BOARD_USERIDX_NOT_MATCH));
    }

    // 형식적 validation 처리
    if(!fileUrl){
        return res.send(errResponse(baseResponse.BOARD_FILEURL_EMPTY));
    } else if(!content){
        return res.send(errResponse(baseResponse.BOARD_CONTENT_EMPTY));
    } else if(!category){
        return res.send(errResponse(baseResponse.BOARD_CATEGORY_EMPTY));
    } else if(!writerIdx){
        return res.send(errResponse(baseResponse.BOARD_WRITERIDX_EMPTY));
    }

    const postRecommendationResponse = await boardService.postRecommendation(
        fileUrl,
        writerIdx,
        content,
        userIdx,
        loggedInUserIdx
    );
    
    return res.send(postRecommendationResponse);
};

/**
 * API NAME: 추천 게시글 상세 조회 API
 * [GET]: /app/boards/:userIdx/recommendatons/:recommendationIdx
 */
exports.getRecommendation = async function(req, res){
    /**
     * Path Variable: userIdx, recommendationIdx
     */
    const {recommendationIdx} = req.params;
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const userIdx = req.userIdx;

    if(!recommendationIdx)  
        return res.send(errResponse(baseResponse.BOARD_USERIDX_EMPTY));
    // 게시글 주인 검증
    if(loggedInUserIdx != userIdx){
        return res.send(errResponse(baseResponse.BOARD_USERIDX_NOT_MATCH));
    }

    const recommendationResult = await boardProvider.retrieveRecommendation(recommendationIdx);

    return res.send(recommendationResult);
};

/**
 * API NAME: 게시글 삭제 API
 * [DELETE] /app/boards/:userIdx/recommendations/:recommendationIdx
 */
exports.deleteRecommendation = async function(req, res){
    /**
     * Path Variable: userIdx, recommendationIdx
     */
    const {recommendationIdx} = req.params;
    const loggedInUserIdx = req.verifiedToken.userIdx;

    if(!recommendationIdx)
        return res.send(errResponse(baseResponse.BOARD_USERIDX_EMPTY));

    const deleteRecommendationResponse = await boardService.deleteRecommendation(
        parseInt(recommendationIdx),
        loggedInUserIdx
    );

    return res.send(deleteRecommendationResponse);
};

/**
 * API NAME: 게시글 수정 API
 * [PATCH] /app/boards/:userIdx/recommendations/:recommendationIdx
 */
exports.patchRecommendation = async function(req, res){
    /**
     * Path Variable: userIdx, recommendationIdx
     */
    const {recommendationIdx} = req.params;
    const loggedInUserIdx = req.verifiedToken.userIdx;
    const content = req.verifiedToken.userIdx;

    if(!recommendationIdx)
        return res.send(errResponse(baseResponse.BOARD_USERIDX_EMPTY));
    
    const patchRecommendationResponse = await boardService.patchRecommendation(
        parseInt(recommendationIdx),
        loggedInUserIdx,
        content
    );

    return res.send(patchRecommendationResponse);
};