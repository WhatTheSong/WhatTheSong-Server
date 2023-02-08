module.exports = function(app){
    const board = require('./boardController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 전체 노래 추천 게시글 조회 API
    app.get("/app/boards/:boardType/contents", jwtMiddleware, board.getRecommendations);

    // 추천 게시글 작성 API
    app.post(
        "/app/boards/:boardType/contents",
        jwtMiddleware,
        board.postRecommendation
    );

    // 추천 게시글 상세 조회 API
    app.get(
        "/app/boards/:boardType/contents/:boardIdx",
        jwtMiddleware,
        board.getRecommendation
    );

    // 추천 게시글 삭제 API
    app.delete(
        "/app/boards/:boardType/contents/:boardIdx",
        jwtMiddleware,
        board.deleteRecommendation
    );

    // 추천 게시글 수정 API
    app.patch(
        "/app/boards/:boardType/contents/:boardIdx",
        jwtMiddleware,
        board.patchRecommendation
    );
};