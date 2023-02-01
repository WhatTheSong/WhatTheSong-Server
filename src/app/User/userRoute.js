module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const passport = require("passport");
  // 애플 소셜 로그인 API (JWT 발급)
  app.post("/app/users/oauth/apple", user.oauthAppleLogin);

  // 카카오 소셜 로그인 API (JWT 발급)
  app.post("/app/users/oauth/kakao", user.oauthKakaoLogin);

  // get: 자동 로그인 API
  // post: accessToken 재발급
  app
    .route("/app/token")
    .get(jwtMiddleware, user.check)
    .post(user.reissuanceToken);
};
