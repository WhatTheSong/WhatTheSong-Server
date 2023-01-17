module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 애플 소셜 로그인 API
  app.post("/app/users/oauth/apple", user.oauthAppleLogin);

  // 자동 로그인 API
  app.get("/app/auto-login", jwtMiddleware, user.check);
};
