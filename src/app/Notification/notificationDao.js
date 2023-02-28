
const selectAPNSToken = async (connection,userIdx)=>{
 const selectDeviceTokenByUserIdQuery = `SELECT deviceToken FROM Device WHERE userIdx = ? AND status = 'ONLINE';`
 return await connection.query(selectDeviceTokenByUserIdQuery, [userIdx]);

}

const selectNotificationUser = async (connection, userId)=>{

}

module.exports ={
 selectAPNSToken,
 selectNotificationUser
}
