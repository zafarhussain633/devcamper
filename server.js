import express from "express"
import 'dotenv/config'
import connectDB from "./config/db.js"
import {logger} from "./middleware/logger.js" //coustom
import morgan from "morgan"
import {router} from "./routes/bootcamp.js" //Route file
import axios from "axios"
import cors from "cors"

//Connect to data base 

connectDB();


const app = express();

if(process.env.NODE_ENV ==="development"){ //it will only run in devlopement
    app.use(morgan("dev")) //from morgan third party loggger
}
app.use(cors());
app.use(logger); //coustom logger                                                                       
app.use("/api/v1/bootcamps" , router)




const PORT =  process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log("server running on port:"+ PORT)
)  

//handle unhandled rejection 
// process.on("unhandledRejection"), (err, promise)=>{
//     console.log(`Error: ${err.message}`);
//     server.close(()=>process.exit(1))
// }