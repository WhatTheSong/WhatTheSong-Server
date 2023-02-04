const storageProvider = require("./storageProvider");
const storageService = require("./storageService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");


/**
 * API No. 1
 * API Name : 음성파일 S3 업로드
 * [POST] /app/storage/voice
 * body :
 */
exports.postVoiceToS3 = async(req,res) =>{
    const f = req.files.uploadFiles;
    if (!f) return res.status(404).send({msg:"파일이 없다."});

    const result = await storageService.uploadFileToS3(f);
    console.log(result)

    return res.status(200).send(`${result}`);
}
