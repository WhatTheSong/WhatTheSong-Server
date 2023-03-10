module.exports = {
  // Success
  SUCCESS: { isSuccess: true, code: 1000, message: "성공" },

  // Common
  TOKEN_EMPTY: {
    isSuccess: false,
    code: 2000,
    message: "JWT 토큰을 입력해주세요.",
  },
  TOKEN_VERIFICATION_FAILURE: {
    isSuccess: false,
    code: 3000,
    message: "JWT 토큰 검증 실패",
  },
  TOKEN_VERIFICATION_SUCCESS: {
    isSuccess: true,
    code: 1001,
    message: "JWT 토큰 검증 성공",
  },

  //Request error
  USER_USERID_NOT_EXIST: {
    isSuccess: false,
    code: 2001,
    message: "해당 회원이 존재하지 않습니다.",
  },
  USER_NICKNAME_IS_EMPTY: {
    isSuccess: false,
    code: 2002,
    message: "닉네임을 입력해주세요.",
  },
  SOCIAL_LOGIN_REJECT: {
    isSuccess: false,
    code: 2003,
    message: "소셜 로그인이 정상적으로 수행되지 않았습니다. 다시 시도해주세요.",
  },
  USER_NOTIFICATION_VALUE_IS_EMPTY: {
    isSuccess: false,
    code: 2004,
    message: "푸시 알람 동의 여부 값이 잘못되었습니다.",
  },
  USER_PROVIDER_IS_EMPTY: {
    isSuccess: false,
    code: 2005,
    message: "소셜 로그인 종류 값이 잘못되었습니다.",
  },
  USER_VALUE_IS_EMPTY: {
    isSuccess: false,
    code: 2006,
    message: "Body 값을 다시 확인해주세요.",
  },

  BOARD_FILEURL_EMPTY: {
    isSuccess: false,
    code: 2052,
    message: "파일을 넣어주세요.",
  },
  BOARD_CONTENT_EMPTY: {
    isSuccess: false,
    code: 2053,
    message: "내용을 작성해주세요.",
  },
  BOARD_CATEGORY_EMPTY: {
    isSuccess: false,
    code: 2054,
    message: "카테고리를 선택해주세요.",
  },
  BOARD_TITLE_EMPTY: {
    isSuccess: false,
    code: 2058,
    message: "제목을 작성해주세요.",
  },
  BOARD_NICKNAME_EMPTY: {
    isSuccess: false,
    code: 2059,
    message: "닉네임을 입력해주세요.",
  },
  BOARDTYPE_NOT_EXIST: {
    isSuccess: false,
    code: 3051,
    message: "존재하지 않는 게시판 종류입니다."
  },
  BOARD_NOT_EXIST: {
    isSuccess: false,
    code: 3052,
    message: "해당 게시글이 존재하지 않습니다.",
  },
  BOARD_USERIDX_NOT_MATCH: {
    isSuccess: false,
    code: 3053,
    message: "유저 아이디 값을 확인해주세요.",
  },
  BOARD_USERIDX_EMPTY: {
    isSuccess: false,
    code: 3054,
    message: "해당 유저가 존재하지 않습니다.",
  },
  BOARD_USER_BANNED: {
    isSuccess: false,
    code: 3055,
    message: "정지된 회원입니다.",
  },
  BOARD_USER_DELETED: {
    isSuccess: false,
    code: 3056,
    message: "탈퇴한 회원입니다.",
  },

  LIKE_EMPTY: {
    isSuccess: true,
    code: 1000,
    message: "좋아요가 없습니다.",
  },
  LIKE_SUCCESS: {
    isSuccess: true,
    code: 1000,
    message: "좋아요를 눌렀습니다.",
  },
  LIKE_DELETE: {
    isSuccess: true,
    code: 1000,
    message: "좋아요를 삭제했습니다.",
  },

  STORAGE_FILE_EMPTY: {
    isSuccess: false,
    code: 2201,
    message: "파일이 없습니다.",
  },
  STORAGE_S3_ERROR: {
    isSuccess: false,
    code: 2202,
    message: "S3 버켓 업로드에 실패했습니다.",
  },
  BOARDIDX_EMPTY: {
    isSuccess: false,
    code: 2203,
    message: "게시글 idx를 입력해주세요.",
  },
  INVALID_BOARDIDX: {
    isSuccess: false,
    code: 2204,
    message: "게시글 idx를 정수로 입력해주세요",
  },
  FILE_SIZE_EXCEED: {
    isSuccess: false,
    code: 2205,
    message: "오디오 파일의 용량 제한은 15MB입니다.",
  },
  IMAGE_FILE_SIZE_EXCEED: {
    isSuccess: false,
    code: 2206,
    message: "사진 파일의 용량 제한은 10MB입니다.",
  },
  INVALID_FILETYPE: {
    isSuccess: false,
    code: 2207,
    message: "파일유형이 옳지 않습니다.",
  },

  REPORT_TYPE_IS_EMPTY: {
    isSuccess: false,
    code: 2251,
    message: "신고 유형을 입력해주세요.",
  },
  REPORT_CODE_IS_EMPTY: {
    isSuccess: false,
    code: 2252,
    message: "신고 코드를 입력해주세요.",
  },
  REPORT_IDX_IS_EMPTY: {
    isSuccess: false,
    code: 2253,
    message: "신고 대상 idx를 입력해주세요.",
  },
  REPORT_IDX_WRONG: {
    isSuccess: false,
    code: 2254,
    message: "신고 코드가 잘못 되었습니다.",
  },
  REPORT_TYPE_WRONG: {
    isSuccess: false,
    code: 2255,
    message: "신고 유형이 잘못 되었습니다.",
  },

  // Response error
  SIGNUP_REDUNDANT_EMAIL: {
    isSuccess: false,
    code: 3001,
    message: "중복된 이메일입니다.",
  },
  SIGNUP_REDUNDANT_NICKNAME: {
    isSuccess: false,
    code: 3002,
    message: "중복된 닉네임입니다.",
  },

  SIGNIN_EMAIL_WRONG: {
    isSuccess: false,
    code: 3003,
    message: "아이디가 잘못 되었습니다.",
  },
  SIGNIN_PASSWORD_WRONG: {
    isSuccess: false,
    code: 3004,
    message: "비밀번호가 잘못 되었습니다.",
  },
  SIGNIN_INACTIVE_ACCOUNT: {
    isSuccess: false,
    code: 3005,
    message: "비활성화 된 계정입니다. 고객센터에 문의해주세요.",
  },
  SIGNIN_WITHDRAWAL_ACCOUNT: {
    isSuccess: false,
    code: 3006,
    message: "탈퇴 된 계정입니다. 고객센터에 문의해주세요.",
  },

  TOKEN_REFRESH_NOT_MATCHED: {
    isSuccess: false,
    code: 3047,
    message: "DB의 유저 Refresh Token과 동일하지 않습니다.",
  },
  TOKEN_REFRESH_EXPIRED: {
    isSuccess: false,
    code: 3048,
    message: "Refresh Token이 만료되었습니다. 다시 로그인해주세요.",
  },
  TOKEN_IS_NOT_EXPIRED: {
    isSuccess: false,
    code: 3049,
    message: "Access Token이 아직 만료되지 않았습니다.",
  },

  COMMENT_EMPTY: {
    isSuccess: false,
    code: 3101,
    message: "조회할 댓글 목록이 존재하지 않습니다.",
  },
  COMMENT_COMMENTIDX_NOT_EXIST: {
    isSuccess: false,
    code: 3102,
    message: "해당 댓글이 존재하지 않습니다.",
  },
  REPLY_EMPTY: {
    isSuccess: false,
    code: 3103,
    message: "조회할 답글 목록이 존재하지 않습니다.",
  },
  COMMENT_REPLYIDX_NOT_EXIST: {
    isSuccess: false,
    code: 3104,
    message: "해당 답글이 존재하지 않습니다.",
  },
  

  COMMENT_WRITER_NOT_MATCHED: {
    isSuccess: false,
    code: 3105,
    message: "댓글 작성자가 아닙니다.",
  },
  REPLY_WRITER_NOT_MATCHED: {
    isSuccess: false,
    code: 3106,
    message: "답글 작성자가 아닙니다.",
  },

  REPORT_TARGET_NOT_EXIST: {
    isSuccess: false,
    code: 3251,
    message: "신고 대상을 찾을 수 없습니다.",
  },
  REPORT_ARTICLE_DUPLICATE: {
    isSuccess: false,
    code: 3252,
    message: "이미 신고한 게시글입니다.",
  },
  REPORT_COMMENT_DUPLICATE: {
    isSuccess: false,
    code: 3253,
    message: "이미 신고한 댓글입니다.",
  },

  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
  SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" },
  SOCIAL_LOGIN_SERVER_ERROR: {
    isSuccess: false,
    code: 4002,
    message: "소셜 로그인 서버 에러",
  },
};