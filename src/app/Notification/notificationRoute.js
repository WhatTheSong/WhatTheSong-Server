const notification = require("./notificationController");
module.exports = (app) => {
    const notification = require('./notificationController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 알림생성
    app.post('/app/notification', notification.postNotifications);

    // 2. 알림조회
    app.get('/app/notification/:id', notification.getNotifications);

    // 3. 알림 상태조회
    app.get('/app/notification/status/:id', notification.getNotificationsStatus);
};
