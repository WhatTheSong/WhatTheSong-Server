const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
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
        console.log(profile);
      }
    )
  );
};
