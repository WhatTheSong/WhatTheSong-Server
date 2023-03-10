const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
const admin = require("firebase-admin");
var cors = require("cors");
const fileUpload = require("express-fileupload");

module.exports = function () {
  const app = express();

  app.use(compression());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(methodOverride());

  app.use(cors());

  // 음성파일 전달 받기 위한 업로드 의존성
  app.use(
    fileUpload({
      createParentPath: true,
    })
  );

  /* App (Android, iOS) */
  // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
  require("../src/app/User/userRoute")(app);
  require("../src/app/Notification/notificationRoute")(app);
  require("../src/app/Comment/commentRouter")(app);
  require("../src/app/Storage/storageRoute")(app);
  require("../src/app/Report/reportRoute")(app);
  require("../src/app/Board/boardRoute")(app);
  require("../src/app/Like/likeRouter")(app);
  return app;
};
