import { Router } from "express";

import { getCourses, getSingleCourse, addCourse, updateCourse } from "./../controller/course.js"

const courseRouter = Router({ mergeParams: true });

courseRouter.route("/")
    .get(getCourses)
    .post(addCourse);

courseRouter.route("/:id")
    .get(getSingleCourse)
    .patch(updateCourse);


export default courseRouter


