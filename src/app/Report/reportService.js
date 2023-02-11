const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const reportDao = require("./reportDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

exports.insertReportInfo = async function (
  reportType,
  reportIdx,
  reportCode,
  reporterIdx
) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const insertReportInfoParams = [
      reportType,
      reportIdx,
      reportCode,
      reporterIdx,
    ];
    await reportDao.insertReportInfo(connection, insertReportInfoParams);
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    connection.rollback();
    logger.error(`App - insertReportInfo Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};
