const reportProvider = require("./reportProvider");
const reportService = require("./reportService");
const boardProvider = require("../Board/boardProvider");
const commentProvider = require("../Comment/commentProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

exports.report = async function (req, res) {
  const reporterIdx = req.verifiedToken.userIdx;
  const { reportType, reportCode } = req.body;
  const { reportIdx } = req.params;

  // validation 체크
  if (!reportType) {
    return res.send(errResponse(baseResponse.REPORT_TYPE_IS_EMPTY));
  }
  if (!reportCode && reportCode != 0) {
    return res.send(errResponse(baseResponse.REPORT_CODE_IS_EMPTY));
  }
  if (reportCode > 5) {
    return res.send(errResponse(baseResponse.REPORT_IDX_WRONG));
  }
  if (!reportIdx) {
    return res.send(errResponse(baseResponse.REPORT_IDX_IS_EMPTY));
  }

  // 신고 대상이 존재하는지 확인
  let isValidIdx;
  if (reportType == "article") {
    isValidIdx = await boardProvider.retrieveRecommendation(reportIdx);
    if (!isValidIdx.isSuccess) {
      return res.send(errResponse(baseResponse.REPORT_TARGET_NOT_EXIST));
    }
  } else if (reportType == "comment" || reportType == "reply") {
    isValidIdx = await commentProvider.getCommentOrReplyByIdx(reportIdx);
    if (!isValidIdx) {
      return res.send(errResponse(baseResponse.REPORT_TARGET_NOT_EXIST));
    }
  } else {
    return res.send(errResponse(baseResponse.REPORT_TYPE_WRONG));
  }

  // 이전에 신고한 적이 있는지 확인
  const selectReportInfoByReportIdxParams = [reporterIdx, reportIdx];
  const isExistReportInfo = await reportProvider.getReportInfo(
    selectReportInfoByReportIdxParams
  );
  if (isExistReportInfo) {
    if (isExistReportInfo.reportType == "article") {
      return res.send(errResponse(baseResponse.REPORT_ARTICLE_DUPLICATE));
    } else if (
      isExistReportInfo.reportType == "comment" ||
      isExistReportInfo.reportType == "reply"
    ) {
      return res.send(errResponse(baseResponse.REPORT_COMMENT_DUPLICATE));
    }
  }

  //TODO: 트리거 이용해서 신고개수 체크하기

  // 신고 데이터 DB 저장
  const reportResponse = await reportService.insertReportInfo(
    reportType,
    reportIdx,
    reportCode,
    reporterIdx
  );

  return res.send(reportResponse);
};
