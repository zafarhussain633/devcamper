import Courses from "../models/Courses.js";
import Reviews from "../models/Reviews.js";
import ErrorResponse from "../util/errorResponse.js";
import asyncHandler from "../util/asyncHandler.js";

//for submitting review by bootcamps
export const addReviews = asyncHandler(async (req, res, next) => {
  const { id: bootCampId } = req.params;
  req.body.asscociatedBootcampId = bootCampId;
  console.log(req.body)
  await Reviews.create(req.body);
  res
    .status(200)
    .json({ success: true, message: "review submitted successfully" });
});
