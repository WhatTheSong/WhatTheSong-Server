/* 공통 */
const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
require("dotenv").config();

/* 소셜 로그인 공통 */
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { createJwt } = require("../../../config/token");

/* 카카오 소셜 로그인 */
const KakaoStrategy = require("passport-kakao").Strategy;

exports.oauthAppleLogin = async function (authorizationCode) {};

exports.oauthKakaoLogin = async function (authorizationCode) {};
