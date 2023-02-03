const notificationProvider = require("./notificationProvider")
const notificationService = require("./notificationService")
const {admin, message} = require("../../../config/fcmMessage")
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");


/**
 * API No. 0
 * API Name : 테스트
 * [POST] /app/
 * body : {title, body, receiverId, senderId}
 */
exports.testNotifications = async(req,res)=>{
    // 특정 회원과 관련된 이벤트 발생시, 해당 user의 device테이블에 저장되어잇는 Token을 가져온다. 우선은 기기가 하나인것으로 간주한다.
    const targetToken = await notificationProvider.getUserAPNSToken(req.body.userId);
    // ============================= API1, API2 로 분리 =============================
    // ============================================================================
    return res.status(200).send("Notification TEST API")
};

/**
 * API No. 1
 * API Name : 댓글작성 알림 생성
 * [POST] /app/
 * body : {receiverId, senderId}
 */
exports.postReplyNotifications = async(req,res)=>{
    // const targetToken = await notificationProvider.getUserAPNSToken(req.body.receiverId);
    const targetToken = 'test apns target token';
    // //APNS 토큰을 받아오지 못한다면 기기등록이 되어있지 않다는뜻 -> push 보내지 않아도됨
    // if(!targetToken) console.log("기기가 등록되어있지 않습니다.")
    // const senderName = await user.getUsername();
    const testSender = "테스터"
    const replyMessage = message;
    replyMessage.token = targetToken;
    replyMessage.apns.payload.aps.alert.title = '왓송'
    replyMessage.apns.payload.aps.alert.body = `${testSender}님이 회원님의 게시글에 댓글을 작성했습니다.`;
    admin.messaging()
        .send(replyMessage)
        .then(function (response) {
            console.log('Successfully sent message: : ', response)
            return res.status(200).send(response);
        })
        .catch(function (err) {
            console.log('Error Sending message!!! : ', err)
            return res.status(404).send(err);
        })

}

/**
 * API No. 2
 * API Name : 공감 알림 생성
 * [POST] /app/
 * body : {receiverId, senderId}
 */
exports.postLikeNotifications = async(req,res)=>{
    const targetToken = await notificationProvider.getUserAPNSToken(req.body.receiverId);
    //APNS 토큰을 받아오지 못한다면 기기등록이 되어있지 않다는뜻 -> push 보내지 않아도됨
    if(!targetToken) console.log("기기가 등록되어있지 않습니다.")

    // const senderName = await user.getUsername();
    const testSender = "테스터"
    const likeMessage = message;
    likeMessage.token = targetToken;
    likeMessage.apns.payload.aps.alert.title = '왓송'
    likeMessage.apns.payload.aps.alert.body = `${testSender}님이 회원님의 게시글에 공감했습니다.`;
    admin.messaging()
        .send(likeMessage)
        .then(function (response) {
            console.log('Successfully sent message: : ', response)
        })
        .catch(function (err) {
            console.log('Error Sending message!!! : ', err)
        })
}

/**
 * API No. 3
 * API Name : 알림 조회
 * [GET] /app/notifications
 * header : jwt
 * body : {receiverId, senderId}
 */
exports.getNotifications = async(req,res)=>{
    const userIdFromJWT = req.verifiedToken.userId
    return res.send(response(baseResponse.SUCCESS, await notificationProvider.getNotifications(userIdFromJWT)));
};

exports.getNotificationsStatus = async(req,res)=>{

}
