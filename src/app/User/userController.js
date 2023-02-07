const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { refreshToken } = require("firebase-admin/app");

/**
 * API Name : 소셜 로그인 API (JWT 발급)
 * [POST] /app/users/oauth
 *
 * Query String: code
 *
 * Response: jwt, userIdx, rememberMeToken(자동 로그인)
 */
exports.oauthLogin = async function (req, res) {
  const { oauthId, nickname, email } = req.body;
  const { oauthProvider } = req.query;
  if (oauthProvider != "kakao" && oauthProvider != "apple") {
    return res.send(errResponse(baseResponse.USER_PROVIDER_IS_EMPTY));
  }
  const profile = {
    provider: oauthProvider,
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
  const { userIdx } = req.verifiedToken;
  const { nickname } = req.body;

  if (!nickname) {
    return res.send(errResponse(baseResponse.USER_NICKNAME_IS_EMPTY));
  }

  const editProfileResponse = await userService.updateUserNickname(
    nickname,
    userIdx
  );

  return res.send(editProfileResponse);
};

exports.editNotificationAllow = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  const { isAllow } = req.body;
  if (!isAllow) {
    return res.send(errResponse(baseResponse.USER_NOTIFICATION_VALUE_IS_EMPTY));
  }
  if (isAllow != 1) {
    if (isAllow != 2) {
      return res.send(
        errResponse(baseResponse.USER_NOTIFICATION_VALUE_IS_EMPTY)
      );
    }
  }
  const editNotificationAllowResponse =
    await userService.updateUserNotification(isAllow, userIdx);

  return res.send(editNotificationAllowResponse);
};
