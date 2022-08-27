import fs from "fs"
import 'dotenv/config'
import connectDB from "./config/db.js"
import BootCamps from "./models/Bootcamp.js"
await connectDB();


const BootCampsfiledata = JSON.parse(fs.readFileSync("./data/bootcamps.json"))

const importData = async () => {
    try {
        await BootCamps.create(BootCampsfiledata);
        console.log("bootcamps data added to database");

    } catch (err) {
        console.log(err);

    }
}

const delteData = async () => {
    try{
      await BootCamps.deleteMany();
        console.log("bootcamps data deleted from database");
    }catch(err){
        console.log(err)
    }
 
}

if(process.argv[2]==="-i"){
    importData();
}else if(process.argv[2]==="-d"){
    delteData();
}






