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

    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    BOARD_NOT_EXIST : {"isSuccess": false, "code": 2051, "message": "해당 게시글이 존재하지 않습니다."},
    BOARD_FILEURL_EMPTY : {"isSuccess": false, "code": 2052, "message": "파일을 넣어주세요."},
    BOARD_CONTENT_EMPTY : {"isSuccess": false, "code": 2053, "message": "내용을 작성해주세요."},
    BOARD_CATEGORY_EMPTY : {"isSuccess": false, "code": 2054, "message": "카테고리를 선택해주세요."},
    BOARD_USERIDX_NOT_MATCH : {"isSuccess": false, "code": 2056, "message": "유저 아이디 값을 확인해주세요."},
    BOARD_USERIDX_EMPTY : {"isSuccess": false, "code": 2057, "message": "해당 유저가 존재하지 않습니다."},
    BOARD_TITLE_EMPTY : {"isSuccess": false, "code": 2058, "message": "제목을 작성해주세요."},
    BOARD_NICKNAME_EMPTY : {"isSuccess": false, "code": 2059, "message": "닉네임을 입력해주세요."},
    
    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
