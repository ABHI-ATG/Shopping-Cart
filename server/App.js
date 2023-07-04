const express = require("express");
const app=express();
const cookieParser=require("cookie-parser");
app.use(cookieParser());
cors=require("cors");
app.use(cors());
const dotenv=require("dotenv");
dotenv.config({path:'./config.env'});

require('./db/conn')
const port=process.env.PORT;
app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://radiant-pudding-081ed3.netlify.app/');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});



const router=require('./router/routes')
app.use('/api/client',router);




app.listen(port,()=>{
    console.log(`Connected ${port}`);
})