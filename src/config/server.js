const express = require("express");
const cors = require("cors");
const middleware = require("./middleware");
const { db } = require("./firebase-config");
const cron = require("node-cron");

const app = express();
const port = 3001;

app.use(cors());
app.use(middleware.decodeToken);
let a = 10;

app.get("/api/pluton", (req, res) => {
  return res.send("server is working...");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);

  cron.schedule("0 0 1 * *", () => {
    db.collection("clubs")
      .get()
      .then(function (querySnapshot) {
        const promises = [];
        querySnapshot.forEach(function (doc) {
          const membersRef = db
            .collection("clubs")
            .doc(doc.id)
            .collection("Members");
          const promise = membersRef.get().then((membersSnapshot) => {
            const memberCount = membersSnapshot.size;
            return doc.ref.update({
              points: memberCount * 100,
            });
          });
          promises.push(promise);
        });
        return Promise.all(promises);
      })
      .then();
  });
  let drank = 0;
  cron.schedule("0 0 1 8,2 *", () => {
    db.collection("user")
      .orderBy("points")
      .get()
      .then(function (querySnapshot) {
        const promises = [];
        querySnapshot.forEach(function (doc) {
          const promise = doc.ref
            .update({
              points: 0,
              rank: 0,
            })
            .then(() => {
              drank = drank + 1;
              return db
                .collection("user")
                .doc(doc.id)
                .collection("medals")
                .add({ rank: drank });
            });
          promises.push(promise);
        });
        return Promise.all(promises);
      })
      .then();
  });
});
