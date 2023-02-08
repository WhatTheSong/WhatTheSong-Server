
const { pool } = require("../../../config/database");

const storageDao = require("./storageDao");

exports.getS3URL = async (boardIdx)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    const url = await storageDao.selectS3URLByPostId(connection, boardIdx);
    connection.release();

    return url[0];
}
