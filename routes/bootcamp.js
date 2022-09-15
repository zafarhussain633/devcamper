import {Router} from 'express';
const bootcampRouter = Router()
import {upload} from "./../middleware/photoUpload.js"
import  courseRouter  from './course.js'; //rerouting course
import BootCamps from "./../models/Bootcamp.js"
import advanceResult from "./../middleware/advanceResult.js"; 
import {protect,authorize} from "./../middleware/auth.js"

import {getBootCamps,createBootcamp ,getSinglBootCamps,updateBootcamp,deleteBootcamp,getBootcampsInRadius,uploadPhoto} from '../controller/bootcamp.js' //cnrollers


bootcampRouter.use("/:bootcampId/courses",courseRouter);  // redirect to courseRouter route
bootcampRouter.use("/:bootcampId/courses/add",[protect,courseRouter]);  //protect middleware token

bootcampRouter.route("/")
.get(advanceResult(BootCamps,"courses"),getBootCamps)
.post(protect,authorize("admin", "publisher"),createBootcamp)

bootcampRouter.route("/:id")
.get(getSinglBootCamps)
.put(protect,authorize("admin", "publisher"),updateBootcamp)
.delete(protect,authorize("admin", "publisher"),deleteBootcamp); 

bootcampRouter.route("/radius/:zipcode/:distance")
.get(getBootcampsInRadius);


bootcampRouter.route("/:id/photo-upload")
.put(protect,authorize("admin", "publisher"),upload.single("image"),uploadPhoto); //

export  default bootcampRouter