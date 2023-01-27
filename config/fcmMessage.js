const admin = require('firebase-admin');
require('dotenv').config()
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FCM_PROJECT_ID,
        clientEmail: process.env.FCM_CLIENT_EMAIL,
        privateKey: process.env.FCM_PRIVATE_KEY.replace(/\\n/g, '\n'),

    }),
});
let message = {
    notification: {
    },
    token: '',
    apns: {
        payload: {
            aps: {
                category : "NEW_MESSAGE_CATEGORY",
                badge: 1,
                alert : {
                    title:'',
                    body : '',
                },
                sound: "default",
                contentAvailable: true,
            }
        }
    }
}


module.exports = {
    admin,
    message
}
