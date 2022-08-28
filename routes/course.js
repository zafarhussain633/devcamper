import { Router } from "express";
import Courses from "../models/Courses.js";
import advanceResult from "./../middleware/advanceResult.js"; 
import { getCourses, getSingleCourse, addCourse, updateCourse,deleteCourse } from "./../controller/course.js"

const courseRouter = Router({ mergeParams: true });

courseRouter.route("/")
    .get(advanceResult(Courses,{path: "bootcamp",select: "name id"}), getCourses)
    .post(addCourse);

courseRouter.route("/:id")
    .get(getSingleCourse)
    .patch(updateCourse)
    .delete(deleteCourse)


export default courseRouter


