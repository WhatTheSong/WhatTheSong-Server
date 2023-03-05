module.exports = function (app) {
  const report = require("./reportController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 신고하기 API
  app.post("/app/reports/:reportIdx", jwtMiddleware, report.report);
};
