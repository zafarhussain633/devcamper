import {Router} from 'express';
import {ragisterUser} from "../controller/auth.js"
const authRouter  = Router();


authRouter.route("/ragister").post(ragisterUser)


export default authRouter
