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
    const f = req.file.uploadFile;
    if (!f) return res.status(404).send(baseResponse.UPLOAD_FILE_EMPTY);
    console.log(f.size);
    // if(f.size>)
    // storageService.uploadFileToS3(req.file.uploadFile)
    return res.status(200).send(`${f.name}이 업로드되었다이`);



}
