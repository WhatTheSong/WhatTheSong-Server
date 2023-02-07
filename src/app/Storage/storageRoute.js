const user = require("../User/userController");
module.exports = (app) => {
    const storage = require("./storageController");

    // 음성 업로드
    app.post("/app/storage/voice", storage.postVoiceToS3);

    // 파일 경로 조회
    app.get("/app/storage/voice/:boardIdx", storage.getVoiceByIdx);
}
