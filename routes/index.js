import {Router} from 'express';
import bootcampRouter from './bootcamp.js'
import courseRouter from "./course.js"
import authRouter from "./auth.js"
import quizRouter from "./quiz.js"
import userRouter from "./users.js"
import ReviewsRouter from "./reviews.js"


const rootRouter= Router();

rootRouter.use("/api/v1/bootcamps",bootcampRouter)
rootRouter.use("/api/v1/courses",courseRouter)
rootRouter.use("/api/v1/auth",authRouter)
rootRouter.use("/api/v1/quiz",quizRouter)
rootRouter.use("/api/v1/users",userRouter)
rootRouter.use("/api/v1/reviews",ReviewsRouter)

export default rootRouter;


