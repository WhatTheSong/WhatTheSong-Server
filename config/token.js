const jwt = require("jsonwebtoken");
const baseResponse = require("../config/baseResponseStatus");
const { errResponse } = require("./response");
require("dotenv").config();

module.exports = {
  // accessToken 발급
  access: (payload) => {
    return jwt.sign(payload, process.env.JWTSECRET, {
      subject: "ACCESS_TOKEN",
      expiresIn: "1s",
    });
  },
  // accessToken 검증
  verify: (token) => {
    let verifiedToken = null;
    try {
      verifiedToken = jwt.verify(token, process.env.JWTSECRET);
      return verifiedToken;
    } catch (err) {
      if (err.message == "jwt malformed") {
        throw errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE);
      }
      return err.message;
    }
  },
  // refreshToken 발급
  refresh: () => {
    return jwt.sign({}, process.env.JWTSECRET, {
      subject: "REFRESH_TOKEN",
      expiresIn: "30 days",
    });
  },
};
