module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 소셜 로그인 API (JWT 발급)
  app.post("/app/users/oauth", user.oauthLogin);

  // 사용자 이름 변경 API
  app.patch("/app/users/edit-profile", jwtMiddleware, user.editProfile);

  // 푸시 알람 동의 여부 변경 API
  app.patch(
    "/app/users/edit-notification",
    jwtMiddleware,
    user.editNotificationAllow
  );

  // post: accessToken 재발급
  app
    .route("/app/users/token")
    .get(jwtMiddleware, user.check)
    .post(user.reissuanceToken);
};
