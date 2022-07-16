const express = require('express');
require('dotenv').config()
const connectDB = require("./config/db")
const {logger} = require("./middleware/logger") //coustom
const morgan = require("morgan")

const bootcamps  = require("./routes/bootcamp"); //Route file


//Connect to data base 
connectDB();


const app = express();

if(process.env.NODE_ENV ==="development"){ //it will only run in devlopement
    app.use(morgan("dev")) //from morgan third party loggger
}


app.use(logger); //coustom logger
app.use("/api/v1/bootcamps" , bootcamps)


const PORT =  process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log("server running on port:"+ PORT)
)  

// handle unhandled rejection 
process.on("unhandledRejection"), (err, promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1))
}