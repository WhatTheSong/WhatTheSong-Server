exports.insertReportInfo = async function (connection, insertReportInfoParams) {
  const insertReportInfoQuery = `
                 INSERT INTO Report(reportType, reportId, reportCode, reporterIdx)
                 VALUES (?, ?, ?, ?);
                 `;
  await connection.query(insertReportInfoQuery, insertReportInfoParams);
  return;
};
