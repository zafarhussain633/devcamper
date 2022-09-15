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
    console.log(password, email)

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

    console.log(options);
    res.status(200).cookie('token', token, options).json({ success: true, msg, token })
}



// desc:    get user about user  
// @route:  GET  /api/v1/auth/me  
// @access: private 
const getMe = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const aboutMe = await User.findById(id);
    res.status(200).json({ success: true, data: aboutMe })
})


// desc:    fro reset password 
// @route:  GET  /api/v1/auth/reset-password  
// @access: private 
const resetPassword = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorResponse("Email not found", 404));
    }

    const otp = await user.setResetToken();
    await user.save({ validateBeforeSave: false });

    const msg = {
        from: {
            name: "dev camper || reset password",
            email: "devcyper@gmail.com"
        },
        to: "zafarhussain6333@gmail.com",
        subject: "Reset your password",
        html: `<div>Hi, ${user.email}
        <h4 style="text-align:center">Use Below OTP to reset password</h4>
        <h1 style="color:grey; front-weight:600; font-size:24px;text-align:center">${otp}</h1>
        <p style="font-size:20px;text-align:center">Note this otp will expire in 10 minutes</p>
    </div>`
    }


    //   await sendEmail(msg);
    await sendMailUsingSendGrid(msg);
    res.status(200).json({ success: true, msg: "OTP sent to email" })

})


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

    await user.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, message: "Otp has been successfully verified." });

})


const savePassword = asyncHandler(async (req, res, next) => {
    const { email, password, confirmPassowrd } = req.body;
    const user = await User.findOne({ email: email });

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

    await user.update({ password })
    const token = await user.getSignedJwtToken();
    await user.update({ resetOtpVerified: null, resetPasswordExpires: null, resetPasswordToken: "" })
    await user.save();

    const msg = "Your password has been changed"
    sendResponseToken(token, res, msg);
})

export { ragisterUser, loginUser, getMe, resetPassword, verifyOtp, savePassword }