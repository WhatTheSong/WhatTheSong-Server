// 신고 데이터 생성
exports.insertReportInfo = async function (connection, insertReportInfoParams) {
  const insertReportInfoQuery = `
                 INSERT INTO Report(reportType, reportIdx, reportCode, reporterIdx)
                 VALUES (?, ?, ?, ?);
                 `;
  await connection.query(insertReportInfoQuery, insertReportInfoParams);
  return;
};

// ReportIdx, ReporterIdx로 신고 기록 조회
exports.selectReportInfoByReportIdx = async function (
  connection,
  selectReportInfoByReportIdxParams
) {
  const selectReportInfoByReportIdxQuery = `
                SELECT reportType
                FROM Report
                WHERE reporterIdx = ? AND reportIdx = ?;
                 `;
  const [reportInfoRow] = await connection.query(
    selectReportInfoByReportIdxQuery,
    selectReportInfoByReportIdxParams
  );
  return reportInfoRow;
};

// 누적 신고 개수 조회
exports.countReportInfo = async function (connection, countReportInfoParams) {
  const countReportInfoQuery = `
                SELECT COUNT(?)
                FROM Report
                WHERE reportIdx = ? AND reportType = ?;
                 `;
  const [count] = await connection.query(
    countReportInfoQuery,
    countReportInfoParams
  );
  return count;
};
