import { Router } from "express";

import {getCourses} from "./../controller/course.js"

const courseRouter =  Router({mergeParams:true});

courseRouter.route("/").get(getCourses);

export default courseRouter


