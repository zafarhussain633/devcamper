import {Router} from 'express';
const bootcampRouter = Router()
import  courseRouter  from './course.js'; //rerouting course
import {getBootCamps,createBootcamp ,getSinglBootCamps,updateBootcamp,deleteBootcamp,userLogin,getBootcampsInRadius} from '../controller/bootcamp.js' //cnrollers

bootcampRouter.use("/:bootcampId/courses",courseRouter);
bootcampRouter.use("/:bootcampId/courses/add",courseRouter);
bootcampRouter.route("/").get(getBootCamps).post(createBootcamp)
bootcampRouter.route("/:id").get(getSinglBootCamps).put(updateBootcamp).delete(deleteBootcamp);
bootcampRouter.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
bootcampRouter.route("/login").post(userLogin);

export  default bootcampRouter