const { logger } = require("../../../../config/winston");
const { response } = require("../../../../config/response");
const { errResponse } = require("../../../../config/response");
const baseResponse = require("../../../../config/baseResponseStatus");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const userProvider = require("../userProvider");
const userService = require("../userService");
const token = require("../../../../config/token");
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
        const selectUserOauthIdParams = [profile.provider, profile.id];
        let userRow = await userProvider.oauthIdCheck(selectUserOauthIdParams);
        try {
          const refreshJwt = token.refresh();
          if (userRow) {
            await userService.updateUserRefreshToken_oauthId(
              profile.id,
              refreshJwt
            );
          } else {
            userRow = await userService.createUser(
              refreshJwt,
              profile,
              selectUserOauthIdParams
            );
          }

          const userIdx = userRow.idx;
          // jwt 생성
          const accessJwt = token.access({ userIdx });

          done(null, userRow, { accessJwt, refreshJwt });
        } catch (err) {
          logger.error(`App - oauthKakaoLogin Service error\n: ${err.message}`);
          return errResponse(baseResponse.SOCIAL_LOGIN_SERVER_ERROR);
        }
      }
    )
  );
};
