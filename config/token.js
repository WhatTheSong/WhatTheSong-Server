const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJwt = (payload) => {
  return jwt.sign(payload, process.env.JWTSECRET, {
    subject: "userJWT",
    expiresIn: "1h",
  });
};

module.exports = { createJwt };
