const { pool } = require("../../../config/database");
const commentDao = require('./commentDao');

exports.getComments = async function (postIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const commentListResult = await commentDao.selectComment(connection, postIdx);
    //connection.query("SELECT comment FROM Comment WHERE postIdx = ?;");
    connection.release();
    console.log(commentListResult);
    return commentListResult;
    
}
