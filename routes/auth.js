import {Router} from 'express';
import {ragisterUser,loginUser} from "../controller/auth.js"
const authRouter  = Router();


authRouter.route("/ragister").post(ragisterUser)
authRouter.route("/login").post(loginUser)


export default authRouter
