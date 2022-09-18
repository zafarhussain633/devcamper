import User from "../models/User.js";
import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"
import { getCookiesExpireTime, sendEmail, sendMailUsingSendGrid } from "./../helpers/auth.js"



// desc:    Ragister user 
// @route:  POST  /api/v1/auth/ragister  
// @access: private 
const ragisterUser = asyncHandler(async (req, res, next) => {

    const user = await User.create(req.body)
    const token = await user.getSignedJwtToken();
    const messsage = "User created successfully"

    sendResponseToken(token, res, messsage);

})



// desc:    login user 
// @route:  POst  /api/v1/auth/login  
// @access: private 
const loginUser = asyncHandler(async (req, res, next) => {
    const { password, email } = req.body;

    if (!password || !email) {
        return next(new ErrorResponse("Invalid credentials", 400));
    }
    let user = await User.findOne({ email }).select("+password")


    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 400));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse("Invalid password", 400));
    }

    const token = await user.getSignedJwtToken();
    sendResponseToken(token, res);

})

// for sending token after login and ragister
const sendResponseToken = (token, res, msg) => {
    const options = {
        expires: getCookiesExpireTime(), //this fx return milliseconds
        httpOnly: true,
        secure: true,
    }
    if (process.env.NODE_ENV === "development") {
        options.secure = false;
    }
    res.status(200).cookie('token', token, options).json({ success: true, msg, token })
}



// desc:    get user about user  
// @route:  GET  /api/v1/auth/me  
// @access: private 
const getMe = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const aboutMe = await User.findById(id);
    res.status(200).json({ success: true, data: aboutMe })
})


// desc:    fro reset password 
// @route:  post  /api/v1/auth/reset-password  
// @access: private 
const resetPassword = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorResponse("Email not found", 404));
    }

    const otp = await user.setResetToken();
    await user.save({ validateBeforeSave: false });

    console.log(user.email)

    const msg = {
        from: {
            name: "dev camper || reset password",
            email: "devcyper@gmail.com"
        },
        to: user.email,
        subject: "Reset your password",
        html: `<div>Hi, ${user.email}
        <h4 style="text-align:center">Use Below OTP to reset password</h4>
        <h1 style="color:grey; front-weight:600; font-size:24px;text-align:center">${otp}</h1>
        <p style="font-size:20px;text-align:center">Note this otp will expire in 10 minutes</p>
    </div>`
    }

    //await sendEmail(msg);  // send email using node mailder 
    const emailSent = await sendMailUsingSendGrid(msg);   // send mail using sendgrid

    if (!emailSent) {
        return next(new ErrorResponse("Failed to send email something went wrong", 503));
    }

    res.status(200).json({ success: true, msg: "OTP sent to email" })

})

// desc:    for reset password 
// @route:  GET  api/v1/auth/verify-otp  
// @access: private 

const verifyOtp = asyncHandler(async (req, res, next) => {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
    const isOtpExpired = user.resetPasswordExpires < Date.now()
    const isOtpMatch = await user.matchResetToken(otp);

    if (!user) {
        return next(new ErrorResponse("Invalid Email", 404));
    }

    if (!isOtpMatch) {
        await user.update({ resetOtpVerified: false })
        return next(new ErrorResponse("Invalid Otp", 401));
    }

    if (isOtpExpired) {
        await user.update({ resetOtpVerified: false })
        return next(new ErrorResponse("Otp has been expired please resend Otp", 410));
    }

    if (!isOtpExpired && isOtpMatch) {
        await user.update({ resetOtpVerified: true })
    }

    await user.save({ validateBeforeSave: false });  //it will ignore pre save hooks in user model
    res.status(200).json({ success: true, message: "Otp has been successfully verified." });

})


// desc:    for reset password 
// @route:  GET  api/v1/auth/save-password
// @access: private 
const savePassword = asyncHandler(async (req, res, next) => {
    const { email, password, confirmPassowrd } = req.body;
    const user = await User.findOne({ email: email });
    const isOtpExpired = user.resetPasswordExpires < Date.now()

    if (!password || !email || !confirmPassowrd) {
        return next(new ErrorResponse("email , password , confirmPassowrd are required to reset password", 404));
    }

    if (password !== confirmPassowrd) {
        return next(new ErrorResponse("password did not match", 404));
    }

    if (!user) {
        return next(new ErrorResponse("Invalid Email", 404));
    }

    if (!user.resetOtpVerified) {
        return next(new ErrorResponse("Otp is not verified", 400));
    }

    if (isOtpExpired) {
        await user.update({ resetOtpVerified: false })
        return next(new ErrorResponse("Otp has been expired please resend Otp", 410));
    }

    user.password = password;
    user.resetOtpVerified = null;
    user.resetPasswordExpires = null;
    user.resetPasswordToken = "";


    await user.save();

    const token = await user.getSignedJwtToken();
    const msg = "Your password has been changed"
    sendResponseToken(token, res, msg);
})


// desc:    for reset password 
// @route:  GET  api/v1/auth/save-password
// @access: private
const updateUser = asyncHandler(async (req, res, next) => {

    const { file, body } = req;    // here file is formdata image 
    let user = await User.findOne({id:req.user.id}).select("+password")  // geting id from token & and adding select passsowrd to add password in this scope so that matchpassword can work
    const validation = { validateBeforeSave: false }  // we have selected password field so we have to allow validation for password field

    if (file) {
        user.profilePicture = file.filename
    }

    console.log(body)

    if (body.password) {
        if(!body.newPassword){
            return next(new ErrorResponse("Please add your new password", 410));
        }
         validation.validateBeforeSave=true
        const isPasswordCorrect = await user.matchPassword(body.password);  // matchPassword is model custom method.

        if (!isPasswordCorrect) {
            return next(new ErrorResponse("You current password is incorrect", 410));
        }
        console.log("yes")
        user.password = body.newPassword; 
    }else{
        validation.validateBeforeSave=false
    }

    if(body.name){
       user.name = body.name;
    }

    if(body.email){
        user.email = body.email;
    }

    await user.save(validation);
    res.status(200).json({success: true, message:"profile updated"});

})






export { ragisterUser, loginUser, getMe, resetPassword, verifyOtp, savePassword, updateUser }
