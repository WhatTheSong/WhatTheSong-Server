const reportDao = require("./reportDao");
const { pool } = require("../../../config/database");

exports.getReportInfo = async function (selectReportInfoByReportIdxParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const reportInfoResult = await reportDao.selectReportInfoByReportIdx(
    connection,
    selectReportInfoByReportIdxParams
  );
  connection.release();

  return reportInfoResult[0];
};

exports.countReportInfo = async function (countReportInfoParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const reportInfoResult = await reportDao.countReportInfo(
    connection,
    countReportInfoParams
  );
  connection.release();

  return reportInfoResult[0];
};
