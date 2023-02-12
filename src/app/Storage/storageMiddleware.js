const baseResponse = require("../../../config/baseResponseStatus");
const { errResponse } = require("../../../config/response");

const storageMiddleware = (req, res, next) => {
    const f = req.files.uploadFiles;
    if(!f) return res.status(400).send(errResponse(baseResponse.STORAGE_FILE_EMPTY))

    //file size validation
    if(f.size > 15000000) return res.status(400).send(errResponse(baseResponse.FILE_SIZE_EXCEED))

    const boardIdx = req.params.boardIdx;

    //boardIdx empty check
    if(!boardIdx) return res.status(404).send(errResponse(baseResponse.BOARDIDX_EMPTY))

    const numIdReg = new RegExp('^\\d*$');

    //boardIdx datatype check
    if(!numIdReg.test(boardIdx)) return res.status(400).send(errResponse(baseResponse.INVALID_BOARDIDX));

    next();

};


module.exports = storageMiddleware;
