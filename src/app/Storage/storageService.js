const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const AWS = require('aws-sdk');
exports.uploadFileToS3 = async (uploadFile)=>{
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION
    });
    const s3 = new AWS.S3();
    const base64data = new  Buffer.alloc(uploadFile.size, uploadFile,'binary');
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: uploadFile.name,
        Body: base64data
    };

    s3.upload(params, (err, data) =>{
        if (err) {
            console.log(`Error uploading file ${uploadFile.name}.`, err);
            return err

        }
        if (data) {
            console.log(`File uploaded successfully. ${data.Location}`);
            return data.Location
        }
    });
}

exports.postS3URL = async (url) =>{

}


