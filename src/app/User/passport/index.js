const passport = require("passport");
const kakao = require("./kakaoStrategy"); // 카카오서버로 로그인할때

module.exports = () => {
  kakao();
};
