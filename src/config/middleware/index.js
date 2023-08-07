const admin = require('../firebase-config');
// const auth = require('firebase-admin')

class Middleware {
    async decodeToken(req, res, next) {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            try {
                const decodeValue = await admin.auth().verifyIdToken(token);
                if (decodeValue.email_verified) {
                    req.user = decodeValue;
                    // listAllUsers();
                    // console.log("Success! ",decodeValue);
                    const list = await admin.auth().listUsers(100);
                    
                    list.users.forEach(element => {
                        console.log(element.email);
                    });
                    // console.log(auth);
                    return next();
                }
                console.log("Unauthorized user!")
                return res.json({ message: 'Unauthorized' });
            } catch (e) {
                console.log("Internal Error!")
                return res.json({ message: 'Internal Error' });
            }
        }
    }
}

module.exports = new Middleware();