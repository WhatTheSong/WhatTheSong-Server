const { pool } = require("../../../config/database");

const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

const commentDao = require("./commentDao");
const commentProvider = require("./commentProvider");

// 댓글 등록
exports.createComment = async function (
  postIdx,
  commentContent,
  nickname,
  loggedInUserIdx
) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    await commentDao.insertComment(
      connection,
      postIdx,
      commentContent,
      nickname,
      loggedInUserIdx
    );
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 댓글 수정
exports.updateComment = async function (
  commentIdx,
  commentContent,
  loggedInUserIdx
) {
  const connection = await pool.getConnection(async (conn) => conn);
  const commentRow = await commentProvider.getOneComment(commentIdx);
  console.log(commentRow, "확인");
  if (commentRow.length === 0) {
    // 해당 댓글이 존재하지 않을 경우
    connection.release();
    return errResponse(baseResponse.COMMENT_COMMENTIDX_NOT_EXIST);
  } else if (loggedInUserIdx !== commentRow[0].userIdx) {
    // 작성자와 일치하지 않을 경우
    return errResponse(baseResponse.COMMENT_WRITER_NOT_MATCHED);
  } else {
    try {
      await connection.beginTransaction();
      await commentDao.updateComment(
        connection,
        commentContent,
        commentIdx
      );
      await connection.commit();
      return response(baseResponse.SUCCESS);
    } catch (err) {
      console.log(err);
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      connection.release();
    }
  }
};

// 댓글 삭제
exports.deleteComment = async function (commentIdx, loggedInUserIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const commentRow = await commentProvider.getOneComment(commentIdx);
  if (commentRow.length === 0) {
    // 해당 댓글이 존재하지 않을 경우
    connection.release();
    return errResponse(baseResponse.COMMENT_COMMENTIDX_NOT_EXIST);
  } else if (loggedInUserIdx !== commentRow[0].userIdx) {
    // 작성자와 일치하지 않을 경우
    return errResponse(baseResponse.COMMENT_WRITER_NOT_MATCHED);
  } else {
    try {
      await connection.beginTransaction();
      await commentDao.deleteComment(connection, commentIdx);
      await connection.commit();
      return response(baseResponse.SUCCESS);
    } catch (err) {
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      connection.release();
    }
  }
};

// 답글 등록
exports.createReply = async function (
  postIdx,
  parentIdx,
  replyContent,
  nickname,
  loggedInUserIdx
) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    await commentDao.deleteComment(connection, postIdx, commentIdx);
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 답글 등록
exports.createReply = async function (
  postIdx,
  parentIdx,
  replyContent,
  nickname,
  loggedInUserIdx
) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    await commentDao.insertReply(
      connection,
      postIdx,
      parentIdx,
      replyContent,
      nickname,
      loggedInUserIdx
    );
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

// 답글 수정
exports.updateReply = async function (
  replyIdx,
  replyContent,
  loggedInUserIdx
) {
  const connection = await pool.getConnection(async (conn) => conn);
  const replyRow = await commentProvider.getOneReply(replyIdx);
  if (replyRow.length === 0) {
    connection.release();
    return errResponse(baseResponse.COMMENT_REPLYIDX_NOT_EXIST);
  } else if (loggedInUserIdx !== replyRow[0].userIdx) {
    // 작성자와 일치하지 않을 경우
    return errResponse(baseResponse.REPLY_WRITER_NOT_MATCHED);
  } else {
    try {
      await connection.beginTransaction();
      await commentDao.updateReply(
        connection,
        replyContent,
        replyIdx
      );
      await connection.commit();
      return response(baseResponse.SUCCESS);
    } catch (err) {
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      connection.release();
    }
  }
};

// 답글 삭제
exports.deleteReply = async function (
  replyIdx,
  loggedInUserIdx
) {
  const connection = await pool.getConnection(async (conn) => conn);
  const replyRow = await commentProvider.getOneReply(replyIdx);
  if (replyRow.length === 0) {
    connection.release();
    return errResponse(baseResponse.COMMENT_REPLYIDX_NOT_EXIST);
  } else if (loggedInUserIdx !== replyRow[0].userIdx) {
    // 작성자와 일치하지 않을 경우
    return errResponse(baseResponse.REPLY_WRITER_NOT_MATCHED);
  } else {
    try {
      await connection.beginTransaction();
      await commentDao.deleteReply(connection, replyIdx);
      await connection.commit();
      return response(baseResponse.SUCCESS);
    } catch (err) {
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      connection.release();
    }
  }
};

// 신고 누적 시 자동 댓글 삭제
exports.automaticallyDelete = async function (targetIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    await commentDao.automaticallyDelete(connection, targetIdx);
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    connection.rollback();
    logger.error(
      `App - automaticallyDeleteComment Service error\n: ${err.message}`
    );
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};
