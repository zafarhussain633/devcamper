import express from "express"
import 'dotenv/config'
import connectDB from "./config/db.js"
import {logger} from "./middleware/logger.js" //coustom
import morgan from "morgan"
import rootRouter from "./routes/index.js"
import cors from "cors"
import errorHadler from "./middleware/error.js"

//Connect to data base 
connectDB();

const app = express();

//Body parser for req.body
app.use(express.json())



if(process.env.NODE_ENV ==="development"){ //it will only run in devlopement
    app.use(morgan("dev")) //from morgan third party loggger
}

app.use(cors());
app.use(logger); //coustom logger                                                                       
app.use(rootRouter);
app.use(errorHadler);

// app.use(asyncHandler)

const PORT =  process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log("server running on port:"+ PORT)
)  

//handle unhandled rejection 
process.on("unhandledRejection", (err, promise)=>{
    console.log(`Error: ${err}`);
    server.close(()=>process.exit(1)) //cose server and exit
})
