import { Router } from "express";
import Courses from "../models/Courses.js";
import advanceResult from "./../middleware/advanceResult.js"; 
import { getCourses, getSingleCourse, addCourse, updateCourse,deleteCourse } from "./../controller/course.js"
import {protect,authorize} from "./../middleware/auth.js"



const courseRouter = Router({ mergeParams: true });

courseRouter.route("/")
    .get(advanceResult(Courses,{path: "bootcamp",select: "name id"}), getCourses)
    .post(protect,authorize("admin", "publisher"),addCourse);

courseRouter.route("/:id")
    .get(getSingleCourse)
    .patch(protect,authorize("admin", "publisher"),updateCourse)
    .delete(protect,authorize("admin", "publisher"),deleteCourse)


export default courseRouter


