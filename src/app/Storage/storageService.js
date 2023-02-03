const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const AWS = require('aws-sdk');
exports.uploadFileToS3 = async (uploadFile)=>{
    try {

        let f = uploadFile
        f.mv('./uploads/' + f.name);


    } catch (err) {
        console.log(err)
        return false
    }
}


