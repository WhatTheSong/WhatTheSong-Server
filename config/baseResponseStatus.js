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
  }, // ?

  //Request error
  USER_USERID_NOT_EXIST: {
    isSuccess: false,
    code: 2001,
    message: "해당 회원이 존재하지 않습니다.",
  },
  APPLE_AUTHORIZATION_CODE_EMPTY: {
    isSuccess: false,
    code: 2002,
    message: "authorizationCode를 입력해주세요.",
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

  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
  SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" },
  SOCIAL_LOGIN_SERVER_ERROR: {
    isSuccess: false,
    code: 4002,
    message: "소셜 로그인 서버 에러",
  },
};
