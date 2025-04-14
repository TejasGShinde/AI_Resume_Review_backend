const express = require('express');
const bodyParser = require('body-parser')

const server = express();
const router = express.Router();

const cors = require('cors');
const mulRouter = require('./routes/multiply')
server.use(cors());
server.use(bodyParser.json());
server.get('/temp',(req,res)=>{
    res.send("this is just welcome page here")
})
// server.get("/multiply",multiply)
server.use('/api',mulRouter)
server.get('/welcome',(req,res)=>{
     res.send("this is test api")
})
port =4001;
server.listen(port,()=>{
    console.log(`the server is runnning on port ${port}`);
})