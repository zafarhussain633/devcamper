import mongoose  from "mongoose";


const QuizeSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true,"please add title"],
        unique: true
    },
    description:{
        type: String,
    },
    options: [],
    correctAnswer: {
        type: String,
        required: [true,"add correctAnswer for this question"],
    },
    isAnsweredCorrectly:Boolean,
    score : {
        type: Number,
        default: 0,
    },
    category: {
            type: String,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
  
})




export default mongoose.model("Quizes", QuizeSchema);
