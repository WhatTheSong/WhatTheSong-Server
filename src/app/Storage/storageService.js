const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const storageDao = require("./storageDao");
const AWS = require('aws-sdk');
const {pool} = require("../../../config/database");
const userDao = require("../User/userDao");
const {logger} = require("../../../config/winston");

exports.uploadFileToS3 = async (uploadFile)=>{

    // AWS 설정
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION
    });

    // 업로드파일을 base64데이터로 변환
    const base64data = new  Buffer.alloc(uploadFile.size, uploadFile,'binary');

    // S3업로드를 위한 객체생성
    const s3 = new AWS.S3();

    // 업로드후 url 전달받기 위한 promise 객체 생성 메소드
    const uploadToS3 = (file) => {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: uploadFile.name,
                Body: file
            };

            s3.upload(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Location);
                }
            });
        });
    };
    return await uploadToS3(base64data);
}

exports.postS3URL = async (postId,url) =>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        const postS3URLParams = [postId, url];
        await storageDao.insertS3URL(
            connection,
            postS3URLParams
        );
        await connection.commit();
    }catch (err){
        connection.rollback();
        logger.error(
            `App - postS3URL Service error\n: ${err.message}`
        );
        throw new Error(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};


