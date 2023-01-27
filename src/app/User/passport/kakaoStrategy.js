const { logger } = require("../../../../config/winston");
const baseResponse = require("../../../../config/baseResponseStatus");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const userProvider = require("../userProvider");
const userService = require("../userService");
require("dotenv").config();

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_RESTAPI_KEY,
        clientSecret: process.env.KAKAO_SECRET_KEY,
        callbackURL: process.env.KAKAO_REDIRECT_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        // oauthId로 유저 조회
        const selectUserOauthIdParams = ["kakao", profile.id];
        let userRow = await userProvider.oauthIdCheck(selectUserOauthIdParams);
        try {
          if (userRow) {
            done(null, userRow);
          } else {
          }
        } catch (err) {
          logger.error(`App - oauthKakaoLogin Service error\n: ${err.message}`);
          return errResponse(baseResponse.SOCIAL_LOGIN_SERVER_ERROR);
        }
      }
    )
  );
};
