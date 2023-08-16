const {admin} = require("../firebase-config");

class Middleware {
  async decodeToken(req, res, next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      console.log("type ", req.headers.type);
      if (req.headers.type === "remove") {
        try {

          const decodeValue = await admin.auth().verifyIdToken(token);
    x
          req.user = decodeValue;
          //   console.log(decodeValue);
          if (decodeValue) {
            const parsedDataString = req.query.parsedData;
            const parsedData = JSON.parse(decodeURIComponent(parsedDataString));
            console.log(parsedData);
            const del = [];
            const uids = [];
            for (const element of parsedData) {
              const email = element["email"];
              if (email) {
                try {
                  const user = await admin.auth().getUserByEmail(email);
                  uids.push(user.uid);
                  console.log(user.uid, " ", email);
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
              deleteUsersResult.errors.forEach((err) => {
                console.log(err.error);
              });
              return res.json({
                message: `${deleteUsersResult.successCount} users deleted successfully`,
                type: "success",
              });
            } catch (error) {
              return res.json({
                message: "Something went wrong! Please try again.",
                type: "error",
              });
            }
          }
          return res.json({ message: "Unauthorized", type: "error" });
        } catch (e) {
          return res.json({ message: "Internal Error", type: "error" });
        }
      } else {
        try {
          console.log('here')
          const decodeValue = await admin.auth().verifyIdToken(token);
          console.log('here1')
          if (decodeValue) {
            req.user = decodeValue;
            const parsedDataString = req.query.parsedData;
            const parsedData = JSON.parse(decodeURIComponent(parsedDataString));
            const users = [];
            for (const user of parsedData) {
              if (user["email"])
                users.push({ email: user["email"], password: "chhotahathi" });
            }
            console.log(users);
            let addCount = 0;

            for (const user of users) {
              try {
                const newUser = await admin.auth().createUser(user);
                console.log(`Successfully created new user: ${newUser.uid}`);
                addCount++;
              } catch (error) {
                console.log(`Error creating new user: ${error}`);
              }
            }
            return res.json({
              message: `Successfully added ${addCount} users!`,
              type: "success",
            });
          }
        } catch (error) {
          console.log("error creating users");
          console.log("Internal Error!");
          return res.json({ message: "Internal Error", type: "error" });
        }
      }
    }
  }
}

module.exports = new Middleware();
