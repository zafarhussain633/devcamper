
import fs from "fs"
import 'dotenv/config'
import connectDB from "./config/db.js"
import Courses from "./models/Courses.js"
await connectDB();


const Coursesfiledata = JSON.parse(fs.readFileSync("./data/courses.json"))

const importData = async () => {
    try {
        await Courses.create(Coursesfiledata);
        console.log("Courses data added to database");

    } catch (err) {
        console.log(err);

    }
}

const delteData = async () => {
    try{
      await Courses.deleteMany();
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






