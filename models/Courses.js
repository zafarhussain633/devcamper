import mongoose  from "mongoose";
import {getAverageCost} from "./../helpers/statics.js"

const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"please add title"]
    },
    description:{
        type: String,
        required: [true,"please add description"]
    },
    weeks:{
        type: Number,
        required: [true,"please add no of weeks"]
    },
    tuition:{
        type: Number,
        required: [true,"please add tuition cost"]
    },
    minimumSkill:{
        type:String,
        required: [true,"please add skill level"],
        enum: ["intermediate","beginner","advance"]
    },
    scholarhipsAvailable:{
        type:Boolean,
        default: false
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    averageCost:{
        type:Number,
        required:false
    },
    bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref: 'BootCamps',  //will check is this course associated with any bootcamp
        required: [true,"please add a Bootcamp Id which is associated with this course"],
    },
  
})

// coustom method for calculating averageCost
CourseSchema.post("save", async function (next) {
    let courseCost  = await this.model("Courses").find({bootcamp: this.bootcamp}).select("tuition");
    let costsList =  courseCost.map(res=>res.tuition)
    if(courseCost.length>0){
        const avgCost  =  getAverageCost(costsList)
        this.averageCost =avgCost
    }
    // next();
})



export default mongoose.model("Courses", CourseSchema);
