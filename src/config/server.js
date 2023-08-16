const express = require("express");
const cors = require("cors");
const middleware = require("./middleware");
const {db} = require('./firebase-config')
const cron = require('node-cron')

const app = express();
const port = 3001;

app.use(cors());
app.use(middleware.decodeToken);
let a = 10;

app.get("/api/pluton", (req, res) => {s
  return res.send("server is working...");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
  
  // cron.schedule('*/10 * * * * *',()=>{
  //   // db.collection('user').doc('41321071').update({points: a}).then(()=>{
  //   //   console.log('success');
  //   //   a++;
  //   // })
  // })
    

});
