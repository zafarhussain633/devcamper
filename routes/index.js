import {Router} from 'express';
import bootcampRouter from './bootcamp.js'
import courseRouter from "./course.js"
import authRouter from "./auth.js"

const rootRouter= Router();

rootRouter.use("/api/v1/bootcamps",bootcampRouter)
rootRouter.use("/api/v1/courses",courseRouter)
rootRouter.use("/api/v1/auth",authRouter)

export default rootRouter;


