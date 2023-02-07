// S3 url 저장 row 생성
const insertS3URL = async (connection, postS3URLParams)=>{
    const insertS3UrlQuery = `INSERT INTO Storage(boardIdx, url) VALUES (?,?);`;
    await connection.query(insertS3UrlQuery, postS3URLParams)
    return true;
}

const selectS3URLByPostId = async (connection, boardIdx)=>{
    const selectS3URLByPostIdQuery = `SELECT * FROM Storage WHERE boardIdx = ? AND status = 'ONLINE';`
    return await connection.query(selectS3URLByPostIdQuery, boardIdx);
}

module.exports ={
    insertS3URL,
    selectS3URLByPostId
}
