import { Router } from "express";
import { protect, authorize } from "./../middleware/auth.js";
import {addReviews} from "./../controller/reviews.js"

const ReviewsRouter = Router();
ReviewsRouter.use(protect, authorize("user","admin"));

ReviewsRouter.route("/bootcamp/:id")
  .post(addReviews)
//   .delete(deleteUser)
//   .get(getSingeUser);
//   .post()

export default ReviewsRouter