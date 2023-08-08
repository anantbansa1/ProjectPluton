const express = require('express');
const cors = require('cors');
const middleware = require('./middleware');

const app = express();
const port = 5000;

app.use(cors())
app.use(middleware.decodeToken)


app.get('/api/pluton', (req,res) => {
    // return res.send('hello world')
    return res.send("server is working...")
})

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`)
})