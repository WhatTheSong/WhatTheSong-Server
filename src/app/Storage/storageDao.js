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

const updateS3URL = async (connection, updateS3URLParams)=>{
    const updateS3UrlQuery = `UPDATE Storage SET url = ? WHERE boardIdx = ? AND fileType = 'audio';`;
    return await connection.query(updateS3UrlQuery, updateS3URLParams);
}

const insertImageS3URL = async (connection, postImageS3URLParams) =>{
    const insertImageS3UrlQuery = `INSERT INTO Storage(boardIdx, url, fileType) VALUES (?,?,'image');`;
    await connection.query(insertImageS3UrlQuery, postImageS3URLParams)
    return true;
}

const updateImageS3URL = async (connection, updateImageS3URLParams) =>{
    const insertImageS3UrlQuery = `UPDATE Storage SET url = ? WHERE boardIdx = ? AND fileType = 'image';`;
    await connection.query(insertImageS3UrlQuery, updateImageS3URLParams)
    return true;
}

module.exports ={
    insertS3URL,
    selectS3URLByPostId,
    updateS3URL,
    insertImageS3URL,
    updateImageS3URL
}
