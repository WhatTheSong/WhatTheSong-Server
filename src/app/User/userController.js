const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

/**
 * API Name : 애플 소셜 로그인 API
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
 * API Name : 카카오 소셜 로그인 API
 * [POST] /app/users/oauth/kakao
 *
 * Query String: code
 *
 * Response: jwt, userIdx, rememberMeToken(자동 로그인)
 */
exports.oauthKakaoLogin = async function (req, res) {
  const authorizationCode = req.query.code;
  const error = req.query.error_description;

  // 카카오 로그인이 정상적으로 수행되지 않았을 경우
  if (error) {
    return res.send(errResponse(baseResponse.SOCIAL_LOGIN_REJECT, error));
  } else if (!authorizationCode) {
    return res.send(errResponse(baseResponse.SOCIAL_AUTHORIZATION_CODE_EMPTY));
  }

  const oauthKakaoLoginResponse = await userService.oauthKakaoLogin(
    authorizationCode
  );

  return res.send(oauthKakaoLoginResponse);
};

/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
  const userIdResult = req.verifiedToken.userId;
  console.log(userIdResult);
  return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
