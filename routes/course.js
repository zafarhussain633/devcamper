import { Router } from "express";

import { getCourses, getSingleCourse, addCourse, updateCourse,deleteCourse } from "./../controller/course.js"

const courseRouter = Router({ mergeParams: true });

courseRouter.route("/")
    .get(getCourses)
    .post(addCourse);

courseRouter.route("/:id")
    .get(getSingleCourse)
    .patch(updateCourse)
    .delete(deleteCourse)


export default courseRouter


