const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJwt = (payload) => {
  return {
    access() {
      return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        subject: "ACCESS_TOKEN",
        expiresIn: "30m",
      });
    },
    refresh() {
      return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        subject: "REFRESH_TOKEN",
        expiresIn: "30 days",
      });
    },
  };
};

module.exports = { createJwt };
