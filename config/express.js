const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("../src/app/User/passport");
module.exports = function () {
  const app = express();

  passportConfig();

  app.use(compression());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(methodOverride());

  app.use(cors());

  app.use(passport.initialize());

  // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
  require("../src/app/User/userRoute")(app);

  return app;
};
