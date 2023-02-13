const baseResponse = require("../../../config/baseResponseStatus");
const { errResponse } = require("../../../config/response");
const numIdReg = new RegExp('^\\d*$');

const storageVoiceMiddleware = (req, res, next) => {
    const f = req.files.uploadFiles;

    //file type check
    if(f.mimetype.split("/")[0]!= 'audio') return res.status(400).send(errResponse(baseResponse.INVALID_FILETYPE));

    //file being check
    if(!f) return res.status(400).send(errResponse(baseResponse.STORAGE_FILE_EMPTY))

    //file size validation
    if(f.size > 15000000) return res.status(400).send(errResponse(baseResponse.FILE_SIZE_EXCEED))

    const boardIdx = req.params.boardIdx;

    //boardIdx empty check
    if(!boardIdx) return res.status(404).send(errResponse(baseResponse.BOARDIDX_EMPTY))

    //boardIdx datatype check
    if(!numIdReg.test(boardIdx)) return res.status(400).send(errResponse(baseResponse.INVALID_BOARDIDX));

    next();

};
const storageImageMiddleware = (req, res, next)=>{
    const f = req.files.uploadFiles;

    //file type check
    if(f.mimetype.split("/")[0]!= 'image') return res.status(400).send(errResponse(baseResponse.INVALID_FILETYPE));

    //file being check
    if(!f) return res.status(400).send(errResponse(baseResponse.STORAGE_FILE_EMPTY))

    //file size validation
    if(f.size > 10000000) return res.status(400).send(errResponse(baseResponse.IMAGE_FILE_SIZE_EXCEED))

    const boardIdx = req.params.boardIdx;

    //boardIdx empty check
    if(!boardIdx) return res.status(404).send(errResponse(baseResponse.BOARDIDX_EMPTY))

    //boardIdx datatype check
    if(!numIdReg.test(boardIdx)) return res.status(400).send(errResponse(baseResponse.INVALID_BOARDIDX));

    next();
}

module.exports = {
    storageVoiceMiddleware,
    storageImageMiddleware
};
