import {Router} from 'express';
const bootcampRouter = Router()
import {upload} from "./../middleware/photoUpload.js"
import  courseRouter  from './course.js'; //rerouting course
import BootCamps from "./../models/Bootcamp.js"
import advanceResult from "./../middleware/advanceResult.js"; 

import {getBootCamps,createBootcamp ,getSinglBootCamps,updateBootcamp,deleteBootcamp,getBootcampsInRadius,uploadPhoto} from '../controller/bootcamp.js' //cnrollers


bootcampRouter.use("/:bootcampId/courses",courseRouter);
bootcampRouter.use("/:bootcampId/courses/add",courseRouter);
bootcampRouter.route("/")
.get(advanceResult(BootCamps,"courses"),getBootCamps)
.post(createBootcamp)

bootcampRouter.route("/:id")
.get(getSinglBootCamps)
.put(updateBootcamp)
.delete(deleteBootcamp);

bootcampRouter.route("/radius/:zipcode/:distance")
.get(getBootcampsInRadius);


bootcampRouter.route("/:id/photo-upload")
.put(upload.single("image"),uploadPhoto); //

export  default bootcampRouter