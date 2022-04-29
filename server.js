const express = require('express');
const dotenv = require('dotenv');

//Route file
const bootcamps  = require("./routes/bootcamp");

//load env file 
dotenv.config({path:"./config/config.env"})

const app = express();
app.use("/api/v1/bootcamps" , bootcamps)



const PORT =  process.env.PORT || 5000;

app.listen(
    PORT,
    console.log("server running on port:"+ PORT)
)  