const user = require("../User/userController");
const storageMiddleware = require("./storageMiddleware");
module.exports = (app) => {
    const storage = require("./storageController");
    const storageMiddleware = require("./storageMiddleware");
    // 음성 업로드
    app.post("/app/storages/voice", storageMiddleware, storage.postVoiceToS3);

    // 파일 경로 조회
    app.get("/app/storages/voice/:boardIdx", storage.getVoiceByIdx);

    // 음성 수정
    app.patch("/app/storages/voice/:boardIdx",storageMiddleware, storage.updateVoiceByIdx);
}
