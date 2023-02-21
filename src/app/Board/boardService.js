const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const boardProvider = require("./boardProvider");
const boardDao = require("./boardDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

// 추천 게시글 등록
exports.postRecommendation = async function (
  userIdx,
  nickname,
  title,
  content,
  category,
  boardType
) {
  // 게시글 생성자 status 검사
  const checkUserStatus = await boardProvider.userStatusCheck(userIdx);
  if (checkUserStatus.code === 1000) {
    const connection = await pool.getConnection(async (conn) => conn);
    const postRecommendationInfoParams = [
      userIdx,
      nickname,
      title,
      content,
      category,
      boardType,
    ];

    try {
      await connection.beginTransaction();
      await boardDao.insertRecommendation(
        connection,
        postRecommendationInfoParams
      );
      await connection.commit();
      return response(baseResponse.SUCCESS);
    } catch (err) {
      await connection.rollback();
      logger.error(`Web - postRecommendation Service error\n: ${err.content}`);

      return errResponse(baseResponse.DB_ERROR);
    } finally {
      connection.release();
    }

  } else {
    return checkUserStatus;
  }

  
};

// 질문 게시글 등록
exports.postQuestion = async function (
  userIdx,
  nickname,
  content,
  boardType
) {
  // 게시글 생성자 status 검사
  const checkUserStatus = await boardProvider.userStatusCheck(userIdx);
  if (checkUserStatus.code === 1000) {
    const connection = await pool.getConnection(async (conn) => conn);
    const postQuestionInfoParams = [
      userIdx,
      nickname,
      content,
      boardType,
    ];

    try {
      await connection.beginTransaction();
      await boardDao.insertQuestion(
        connection,
        postQuestionInfoParams
      );
      await connection.commit();
      return response(baseResponse.SUCCESS);
    } catch (err) {
      await connection.rollback();
      logger.error(`Web - postQuestion Service error\n: ${err.content}`);
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      connection.release();
    }

  } else {
    return checkUserStatus;
  }
};

// 게시글 삭제
exports.deleteBoard = async function (boardIdx, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const isExistBoard = await boardProvider.boardCheck(
      boardIdx
    );
    // 게시글 존재 확인
    if (isExistBoard.length === 0) {
      return errResponse(baseResponse.BOARD_NOT_EXIST);
    }
    // 해당 작성자가 쓴 게시글이 맞는지 검증
    if (userIdx !== isExistBoard[0].writerIdx) {
      return errResponse(baseResponse.BOARD_USERIDX_NOT_MATCH);
    }

    await connection.beginTransaction();
    await boardDao.deleteBoard(
      connection,
      boardIdx
    );
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    await connection.rollback();
    logger.error(`Web - deleteRecommendation Service error\n: ${err.content}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 추천 게시글 수정
exports.patchRecommendation = async function (
  title,
  content,
  category,
  boardIdx,
  loggedInUserIdx
) {
  const connection = await pool.getConnection(async (conn) => conn);
  const patchRecommendationInfoParams = [
    title,
    content,
    category,
    boardIdx,
    loggedInUserIdx,
  ];

  try {
    const isExistBoard = await boardProvider.boardCheck(
      boardIdx
    );
    // 추천 게시글 존재 확인
    if (isExistBoard.length === 0) {
      return errResponse(baseResponse.BOARD_NOT_EXIST);
    }
    // 작성자 검증
    if (loggedInUserIdx !== isExistBoard[0].writerIdx) {
      return errResponse(baseResponse.BOARD_USERIDX_NOT_MATCH);
    }

    await connection.beginTransaction();
    await boardDao.updateRecommendation(
      connection,
      patchRecommendationInfoParams
    );
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    await connection.rollback();
    logger.error(`Web - patchRecommendation Service error\n: ${err.content}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 질문 게시글 수정
exports.patchQuestion = async function (
  content,
  boardIdx,
  loggedInUserIdx
) {
  const connection = await pool.getConnection(async (conn) => conn);
  const patchQuestionInfoParams = [
    content,
    boardIdx,
    loggedInUserIdx,
  ];

  try {
    const isExistBoard = await boardProvider.boardCheck(
      boardIdx
    );
    // 질문 게시글 존재 확인
    if (isExistBoard.length === 0) {
      return errResponse(baseResponse.BOARD_NOT_EXIST);
    }
    // 작성자 검증
    if (loggedInUserIdx !== isExistBoard[0].writerIdx) {
      return errResponse(baseResponse.BOARD_USERIDX_NOT_MATCH);
    }

    await connection.beginTransaction();
    await boardDao.updateQuestion(
      connection,
      patchQuestionInfoParams
    );
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    await connection.rollback();
    logger.error(`Web - updateQuestion Service error\n: ${err.content}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 신고 누적 시 자동 게시글 삭제
exports.automaticallyDelete = async function (targetIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    await boardDao.deleteRecommendation(connection, targetIdx);
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    connection.rollback();
    logger.error(
      `App - automaticallyDeletePost Service error\n: ${err.message}`
    );
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};