// 쿼리문의 writerIdx == userIdx

// 전체 추천 게시글 조회
async function selectRecommendations(connection, boardType){
    //console.log(boardType);
    const selectRecommendationListQuery = `
        SELECT fileUrl, category, title, content, nickname
        FROM Board
        WHERE status = "posted" and boardType = ?;
        `;
    const [recommendationListRow] = await connection.query(
        selectRecommendationListQuery,
        boardType
    );
    //console.log(boardType);
    return recommendationListRow;
}

// 추천 게시글 상세 조회
async function selectRecommendation(connection, boardIdx){
    const selectRecommendationQuery = `
        SELECT fileUrl, category, title, content, nickname
        FROM Board
        WHERE status = "posted" and idx = ?;
        `;
    const [recommendationListRow] = await connection.query(
        selectRecommendationQuery,
        boardIdx
    );

    return recommendationListRow[0];
}

// 추천 게시글 생성
async function insertRecommendation(connection, postRecommendationInfoParams){
    const insertRecommendationQuery = `
        INSERT INTO Board (writerIdx, nickname, fileUrl, title, content, category, boardType, status)
        VALUE (?, ?, ?, ?, ?, ?, ?, "posted");
        `;
    const insertRecommendationRow = await connection.query(
        insertRecommendationQuery,
        postRecommendationInfoParams
    );

    return insertRecommendationRow[0];
}

// 추천 게시글 삭제
async function deleteRecommendation(connection, boardIdx){
    const deleteRecommendationQuery = `
        UPDATE Board
        SET status = "deleted"
        WHERE idx = ?;
        `;
    const deleteRecommendationRow = await connection.query(
        deleteRecommendationQuery,
        boardIdx
    );

    return deleteRecommendationRow[0];
}

// 추천 게시글 존재 유무 확인 
async function existRecommendation(connection, boardIdx){
    const existRecommendationQuery = `
        SELECT writerIdx
        FROM Board
        WHERE status = "posted" and idx = ?;
        `;
    //console.log(boardIdx);
    const recommendationRow = await connection.query(
        existRecommendationQuery,
        boardIdx
    );

    return recommendationRow[0];
}

// 추천 게시글 수정
async function updateRecommendation(connection, patchRecommendationInfoParams){
    const updateRecommendationQuery = `
        UPDATE Board
        SET fileUrl = ?, title = ?, content = ?, category = ?
        WHERE idx = ?;
        `;
    const updateRecommendationRow = await connection.query(
        updateRecommendationQuery,
        patchRecommendationInfoParams
    );

    return updateRecommendationRow[0];
}

// 유저 조회
async function selectUserIdx(connection, userIdx){
    const selectUserIdxQuery = `
        SELECT idx, status
        FROM User
        WHERE idx = ?;
    `;
    //console.log(userIdx);
    const [userRow] = await connection.query(selectUserIdxQuery, userIdx);

    return userRow[0];
}

module.exports = {
    selectRecommendations,
    selectRecommendation,
    insertRecommendation,
    deleteRecommendation,
    existRecommendation,
    updateRecommendation,
    selectUserIdx,
};