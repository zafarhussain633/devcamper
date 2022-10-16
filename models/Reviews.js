import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema(
  {
    title:String,
    description: String,
    rating: Number,
    asscociatedBootcampId: {
      type: mongoose.Schema.ObjectId,
      ref: "BootCamps", //will check is this course associated with any bootcamp
      required: [
        true,
        "please add a Bootcamp Id which is associated with this course",
      ],
    },
  },
  { timestamps: true }
);



export default mongoose.model("Reviews", ReviewsSchema);
