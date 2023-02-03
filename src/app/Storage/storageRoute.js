const user = require("../User/userController");
module.exports = (app) => {
    const storage = require("./storageController");

    // 음성 업로드
    app.post("/app/storage/voice", storage.postVoiceToS3);
}
