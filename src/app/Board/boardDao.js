// 전체 추천 게시글 조회
async function selectRecommendations(connection, userIdx){
    const selectRecommendationListQuery = `
        SELECT idx, fileUrl, category
        FROM Board;
        `;
    const [recommendationListRow] = await connection.query(
        selectRecommendationListQuery,
        userIdx
    );

    return recommendationListRow;
}

// 추천 게시글 상세 조회
async function selectRecommendation(connection, boardIdx){
    const selectRecommendationQuery = `
        SELECT idx, writerIdx, fileUrl, category, content
        FROM Board
        WHERE userIdx = ?;
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
        INSERT INTO Board (fileUrl, category, content, userIdx, writerIdx)
        VALUE (?, ?, ?, ?, ?);
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
        DELETED Board
        SET status = "DELETED"
        WHERE userIdx = ?;
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
        WHERE userIdx = ?;
        `;
    const [recommendationRow] = await connection.query(
        existRecommendationQuery,
        boardIdx
    );

    return recommendationRow[0];
}

// 추천 게시글 수정
async function updateRecommendation(connection, postRecommendationInfoParams){
    const updateRecommendationQuery = `
        UPDATE Board
        SET status = "EDITED"
        WHERE userIdx = ?;
        `;
    const updateRecommendationRow = await connection.query(
        updateRecommendationQuery,
        postRecommendationInfoParams
    );

    return updateRecommendationRow[0];
}

module.exports = {
    selectRecommendations,
    selectRecommendation,
    insertRecommendation,
    deleteRecommendation,
    existRecommendation,
    updateRecommendation,
};