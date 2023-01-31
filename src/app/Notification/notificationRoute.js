const notification = require("./notificationController");
module.exports = (app) => {
    const notification = require('./notificationController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 알림생성
    app.get('/app/notification', notification.testNotifications);

    // 1-1. 댓글 알림 생성
    app.post('/app/notification/reply', notification.postReplyNotifications);

    // 1-2. 공감 알림 생성
    // app.post('/app/notification/like', notification.postLikeNotifications);

    // 2. 알림조회
    // app.get('/app/notification/:id', notification.getNotifications);

    // 3. 알림 상태조회
    // app.get('/app/notification/status/:id', notification.getNotificationsStatus);
};
