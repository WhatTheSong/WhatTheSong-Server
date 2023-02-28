const notificationProvider = require("./notificationProvider")
const notificationService = require("./notificationService")
const {admin, message} = require("../../../config/fcmMessage")
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const kafka = require("../../../config/kafka")

/**
 * API No. 0
 * API Name : 테스트-1
 * [POST] /app/
 * body :
 */
exports.testNotifications = async(req,res)=>{
    return res.status(200).send("Notification TEST API")
};
/**
 * API No. 2
 * API Name : 공감 알림 생성
 * [POST] /app/
 * body : {receiverId, senderId}
 */
exports.postLikeNotifications = async(req,res)=>{

}

/**
 * API No. 3
 * API Name : 알림 조회
 * [GET] /app/notifications
 * header : jwt
 * body : {receiverId, senderId}
 */
// exports.getNotifications = async(req,res)=>{
//     const userIdFromJWT = req.verifiedToken.userId
//     return res.send(response(baseResponse.SUCCESS, await notificationProvider.getNotifications(userIdFromJWT)));
// };

exports.getNotificationsStatus = async(req,res)=>{

}
