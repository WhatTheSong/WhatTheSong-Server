const { pool } = require("../../../config/database");
const notificationDao = require("./notificationDao");

exports.getUserAPNSToken = async(userId)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    const APNSTokenResult = await notificationDao.selectAPNSToken(connection,userId);
    connection.release();

    return APNSTokenResult;
}

exports.getNotifications = async(userId)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    const notificationsListResult = await notificationDao.selectNotificationUser(connection,userId);
    connection.release();

    return notificationsListResult;
}
