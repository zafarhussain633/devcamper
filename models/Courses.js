import mongoose  from "mongoose";

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
    bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref: 'BootCamps',  //will check is this course associated with any bootcamp
        required: [true,"please add a Bootcamp Id which is associated with this course"],
    }
})

export default mongoose.model("Courses", CourseSchema);
