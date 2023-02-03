const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { refreshToken } = require("firebase-admin/app");

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
  const { oauthId, nickname, email } = req.body;
  const profile = {
    provider: "kakao",
    id: oauthId,
    email,
    displayName: nickname,
  };

  // oauthId로 유저 조회
  const selectUserOauthIdParams = [profile.provider, profile.id];
  let userRow = await userProvider.oauthIdCheck(selectUserOauthIdParams);

  if (!userRow) {
    return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));
  }

  const refreshToken = await userService.createRefreshToken();

  if (userRow) {
    await userService.updateUserRefreshToken_oauthId(refreshToken, profile.id);
  } else {
    userRow = await userService.createUser(
      refreshToken,
      profile,
      selectUserOauthIdParams
    );
  }

  const accessToken = await userService.createAccessToken(userRow.idx);

  return res.send(
    response(baseResponse.SUCCESS, {
      userIdx: userRow.idx,
      accessToken: accessToken,
      refreshToken: refreshToken,
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
  const accessTokenResponse = await userService.reissuanceToken(
    accessToken,
    refreshToken
  );
  return res.send(accessTokenResponse);
};

exports.editProfile = async function (req, res) {
  const userIdx = req.verifiedToken.userIdx;
  const { nickname } = req.body;

  if (!nickname) {
    return res.send(errResponse(baseResponse.USER_NICKNAME_IS_EMPTY));
  }

  const editProfileResponse = await userService.editProfile();

  return res.send(editProfileResponse);
};
