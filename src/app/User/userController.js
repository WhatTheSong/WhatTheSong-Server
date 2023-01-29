const passport = require("passport");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

/**
 * API Name : 애플 소셜 로그인 API (JWT 발급)
 * [POST] /app/users/oauth/apple
 *
 * Body: authorizationCode
 *
 * Response: jwt, userIdx, rememberMeToken(자동 로그인)
 */
exports.oauthAppleLogin = async function (req, res) {
  const { authorizationCode } = req.body;

  if (!authorizationCode) {
    return res.send(errResponse(baseResponse.SOCIAL_AUTHORIZATION_CODE_EMPTY));
  }

  const oauthAppleLoginResponse =
    userService.oauthAppleLogin(authorizationCode);

  return res.send(oauthAppleLoginResponse);
};

/**
 * API Name : 카카오 소셜 로그인 API (JWT 발급)
 * [POST] /app/users/oauth/kakao
 *
 * Query String: code
 *
 * Response: jwt, userIdx, rememberMeToken(자동 로그인)
 */
exports.oauthKakaoLogin = async function (req, res) {
  const { err, user, info } = req;
  if (err) {
    return res.send(errResponse(baseResponse.SOCIAL_LOGIN_REJECT));
  }
  if (!user) {
    return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));
  }
  return res.send(
    response(baseResponse.SUCCESS, {
      userIdx: user.idx,
      accessToken: info.accessJwt,
      refreshToken: info.refreshJwt,
    })
  );
};

/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
  return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};

exports.reissuanceToken = async function (req, res) {
  const accessToken = req.headers["x-access-token"];
  const refreshToken = req.headers["x-refresh-token"];
  if (!accessToken || !refreshToken) {
    return res.send(errResponse(baseResponse.TOKEN_EMPTY));
  }
};
