module.exports = function (app) {
  const board = require("./boardController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 전체 노래 추천 게시글 조회 API
  app.get("/app/boards/recommendations", board.getRecommendations);

  // 추천 게시글 작성 API
  app.post(
    "/app/boards/:userIdx/recommendations/:recommendationIdx",
    jwtMiddleware,
    board.postRecommendation
  );

  // 추천 게시글 상세 조회 API
  app.get(
    "/app/boards/:userIdx/recommendatons/:recommendationIdx",
    jwtMiddleware,
    board.getRecommendation
  );

  // 추천 게시글 삭제 API
  app.delete(
    "/app/boards/:userIdx/recommendatons/:recommendationIdx",
    jwtMiddleware,
    board.deleteRecommendation
  );

  // 추천 게시글 수정 API
  app.patch(
    "/app/boards/:userIdx/recommendatons/:recommendationIdx",
    jwtMiddleware,
    board.patchRecommendation
  );

  // 게시판 조회 API
  app.get("/app/boards/questions", board.getQuestionPosts);
};
