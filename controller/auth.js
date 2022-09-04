import User from "../models/User.js";
import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"
import {getCookiesExpireTime} from "./../helpers/auth.js"


const ragisterUser = asyncHandler( async(req,res,next)=>{
   
    const user = await User.create(req.body)
    const token = await user.getSignedJwtToken();
    const messsage = "User created successfully"
    sendResponseToken(token,res,messsage);

})



const loginUser = asyncHandler( async(req,res,next)=>{
    const {password,email} = req.body;
    console.log(password,email)

    if(!password || !email){
        return next(new ErrorResponse("Invalid credentials",400));
    }
    let user = await User.findOne({email}).select("+password")


    if(!user){
        return next(new ErrorResponse("Invalid credentials",400));
    }

    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return next(new ErrorResponse("Invalid password",400));
    }
    
    const token = await user.getSignedJwtToken();
    sendResponseToken(token,res);
    
})


const sendResponseToken = (token,res,msg)=>{
   const  options  = {
        expires: getCookiesExpireTime(), //this fx return milliseconds
        httpOnly:true,
        secure:true,
    }
    if(process.env.NODE_ENV==="development"){
        options.secure = false;
    }

    console.log(options);
    res.status(200).cookie('token',token,options).json({success:true,token,msg})
}


const getMe = asyncHandler( async(req,res,next)=>{
    const {id} = req.user;
    const aboutMe = await User.findById(id);
    res.status(200).json({success:true,data:aboutMe})
})





export {ragisterUser,loginUser,getMe}