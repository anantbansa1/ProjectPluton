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
                    const parsedDataString = req.query.parsedData;
                    const parsedData = JSON.parse(decodeURIComponent(parsedDataString));
                    const users = req.headers.users
                    const del = [];
                    const uids = [];



                    for (const element of parsedData) {
                        const email = element['email'];
                        if (email) {
                            try {
                                const user = await admin.auth().getUserByEmail(email);
                                uids.push(user.uid);
                                console.log(user.uid, " ",email)
                                del.push(email);
                            } catch (error) {
                                console.log(`${email} not found!`);
                            }

                        }

                    }


                    console.log(del.length);
                    console.log(uids.length);
                    try {
                        const deleteUsersResult = await admin.auth().deleteUsers(uids);
                        console.log(`Successfully deleted ${deleteUsersResult.successCount} users`);
                    
                        console.log(`Failed to delete ${deleteUsersResult.failureCount} users`);
                        deleteUsersResult.errors.forEach((err) => {
                            console.log(err.error);
                        });
                        return res.json({message: `${deleteUsersResult.successCount} users deleted successfully`, type: "success"});
                      } catch (error) {
                        console.log(`Error deleting users: ${error}`);
                        return res.json({message: 'Something went wrong! Please try again.', type: "error"})
                      }



                    return next();
                }
                console.log("Unauthorized user!")
                return res.json({ message: 'Unauthorized',type: "error" });
            } catch (e) {
                console.log("Internal Error!")
                return res.json({ message: 'Internal Error', type: "error" });
            }
        }
    }
}

module.exports = new Middleware();