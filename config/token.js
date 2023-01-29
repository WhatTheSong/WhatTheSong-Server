const jwt = require("jsonwebtoken");
const userProvider = require("../src/app/User/userProvider");
const baseResponse = require("../config/baseResponseStatus");
require("dotenv").config();

module.exports = {
  // accessToken 발급
  access: (payload) => {
    return jwt.sign({ payload }, process.env.JWTSECRET, {
      subject: "ACCESS_TOKEN",
      expiresIn: "30m",
    });
  },
  // accessToken 검증
  verify: (token) => {
    let verifiedToken = null;
    try {
      verifiedToken = jwt.verify(token, process.env.JWTSECRET);
      return verifiedToken;
    } catch (err) {
      throw new Error(baseResponse.TOKEN_VERIFICATION_FAILURE);
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
