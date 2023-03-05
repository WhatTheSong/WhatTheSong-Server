const user = require("../User/userController");
const storageMiddleware = require("./storageMiddleware");
const storage = require("./storageController");
const {storageVoiceMiddleware} = require("./storageMiddleware");
module.exports = (app) => {
    const storage = require("./storageController");
    const { storageVoiceMiddleware, storageImageMiddleware} = require("./storageMiddleware");
    // 음성 업로드
    app.post("/app/storages/voice/:boardIdx", storageVoiceMiddleware, storage.postVoiceToS3);

    // 음성 수정
    app.patch("/app/storages/voice/:boardIdx",storageVoiceMiddleware, storage.updateVoiceByIdx);

    // 이미지 업로드
    app.post("/app/storages/image/:boardIdx", storageImageMiddleware, storage.postImageToS3);

    // 이미지 수정
    app.patch("/app/storages/image/:boardIdx",storageImageMiddleware, storage.updateImageByIdx);

    // url 조회
    app.get("/app/storages/:boardIdx", storage.getVoiceByIdx);


}
