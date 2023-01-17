const notificationProvider = require("./notificationProvider")
const notificationService = require("./notificationService")

exports.postNotifications = async(req,res)=>{
    // 특정 회원과 관련된 이벤트 발생시, 해당 user의 device테이블에 저장되어잇는 Token을 가져온다.
    const targetToken = await notificationProvider.getUserAPNSToken(userId);
    const result = []
    const message = {
        "notification":{
            "title":req.body.title,
            "body":req.body.body
        },
        "token":"",
        "apns": {
            "payload": {
                "aps": {
                    "contentAvailable": true,
                }
            }
        }
    };

    targetToken.forEach((token)=>{
        result.push( await notificationService.sendMessageToFCM(message, token));
    })

    return res.status(200).send();


};

exports.getNotifications = async(req,res)=>{

};

exports.getNotificationsStatus = async(req,res)=>{

}
