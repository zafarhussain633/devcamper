import {Router} from 'express';
import {ragisterUser,loginUser,getMe,resetPassword,verifyOtp,savePassword,updateUser} from "../controller/auth.js"
import { protect } from '../middleware/auth.js';
import {upload} from "./../middleware/photoUpload.js"
const authRouter  = Router();
authRouter.route("/ragister").post(ragisterUser)
authRouter.route("/login").post(loginUser)
authRouter.route("/me").get(protect,getMe) // need token
authRouter.route("/reset-password").post(resetPassword)  
authRouter.route("/verify-otp").post(verifyOtp);
authRouter.route("/save-password").post(savePassword);
authRouter.route("/update-user").post(protect,upload.single("image"),updateUser); // need token

export default authRouter
