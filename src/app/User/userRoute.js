const { USER_USERID_NOT_EXIST } = require("../../../config/baseResponseStatus");

module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const passport = require("passport");
  // 애플 소셜 로그인 API
  app.post("/app/users/oauth/apple", user.oauthAppleLogin);

  // 카카오 소셜 로그인 API
  app.get("/app/users/oauth/kakao", function (req, res, next) {
    // 여기서 함수는 전략에서의 함수 verify callback이다
    passport.authenticate("kakao", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      return res.send(info);
    })(req, res, next);
  });

  // 자동 로그인 API
  app.get("/app/auto-login", jwtMiddleware, user.check);
};
