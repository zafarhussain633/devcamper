import {Router} from 'express';
import bootcampRouter from './bootcamp.js'
import courseRouter from "./course.js"
const rootRouter= Router();

rootRouter.use("/api/v1/bootcamps",bootcampRouter)
rootRouter.use("/api/v1/courses",courseRouter)

export default rootRouter;


