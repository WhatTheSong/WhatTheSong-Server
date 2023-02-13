const storageProvider = require("./storageProvider");
const storageService = require("./storageService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const {storage} = require("firebase-admin");


/**
 * API No. 1
 * API Name : 음성파일 S3 업로드
 * [POST] /app/storage/voice/:boardIdx
 * files : uploadFiles;
 * params : boardIdx
 */
exports.postVoiceToS3 = async(req,res) =>{
    const f = req.files.uploadFiles;
    const boardIdx =req.params.boardIdx
    const result = await storageService.uploadFileToS3(f);
    if(!result) return res.status(404).send(response(baseResponse.STORAGE_S3_ERROR));

    const daoResult = await storageService.postS3URL(boardIdx,result);
    return res.status(200).send(response(baseResponse.SUCCESS,true));
}
/**
 * API No. 2
 * API Name : 게시글 idx로 S3 링크 조회
 * [GET] /app/storage/voice/:boardIdx
 * params : boardIdx
 */
exports.getVoiceByIdx = async(req,res) =>{
    const boardIdx = req.params.boardIdx

    if(!boardIdx) return res.status(404).send(errResponse(baseResponse.BOARDIDX_EMPTY))

    const daoResult = await storageProvider.getS3URL(boardIdx);

    if(!daoResult.length) res.status(400).send(errResponse(baseResponse.INVALID_BOARDIDX))

    return res.status(200).send(response(baseResponse.SUCCESS, daoResult));
}
/**
 * API No. 3
 * API Name : 게시글 idx로 음성파일 변경하기.
 * [PATCH] /app/storage/voice/:boardIdx
 * files : uploadFiles;
 * params : boardIdx
 */
exports.updateVoiceByIdx = async(req,res) =>{
    const f = req.files.uploadFiles;
    const boardIdx = req.params.boardIdx
    const result = await storageService.uploadFileToS3(f);
    if(!result) return res.status(404).send(response(baseResponse.STORAGE_S3_ERROR));

    const daoResult = await storageService.updateS3URL(boardIdx, result);
    return res.status(200).send(response(baseResponse.SUCCESS, daoResult));
};
/**
 * API No. 4
 * API Name : 이미지파일 S3 업로드
 * [GET] /app/storage/image/:boardIdx
 * params : boardIdx
 */
exports.postImageToS3 = async(req,res)=>{
    const f = req.files.uploadFiles;
    const boardIdx = req.params.boardIdx
    const result = await storageService.uploadFileToS3(f);
    if(!result) return res.status(404).send(response(baseResponse.STORAGE_S3_ERROR));

    const daoResult = await storageService.postImageS3URL(boardIdx,result);
    return res.status(200).send(response(baseResponse.SUCCESS, daoResult));
}
/**
 * API No. 5
 * API Name : 게시글 idx로 이미지파일 변경하기.
 * [PATCH] /app/storage/image/:boardIdx
 * files : uploadFiles;
 * params : boardIdx
 */
exports.updateImageByIdx = async(req,res)=>{
    const f = req.files.uploadFiles;
    const boardIdx = req.params.boardIdx
    const result = await storageService.uploadFileToS3(f);
    if(!result) return res.status(404).send(response(baseResponse.STORAGE_S3_ERROR));

    const daoResult = await storageService.updateImageS3URL(boardIdx,result);
    return res.status(200).send(response(baseResponse.SUCCESS, result));
}
