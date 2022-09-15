import {Router} from 'express';
import {ragisterUser,loginUser,getMe,resetPassword,verifyOtp,savePassword} from "../controller/auth.js"
import { protect } from '../middleware/auth.js';
const authRouter  = Router();


authRouter.route("/ragister").post(ragisterUser)
authRouter.route("/login").post(loginUser)
authRouter.route("/me").get(protect,getMe)
authRouter.route("/reset-password").post(resetPassword)  
authRouter.route("/verify-otp").post(verifyOtp);
authRouter.route("/save-password").post(savePassword);


export default authRouter
