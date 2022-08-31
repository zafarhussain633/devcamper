import User from "../models/User.js";
import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"
import getGeolocation from "../helpers/mapquest.js"


const ragisterUser = asyncHandler( async(req,res,next)=>{
   
    const user = await User.create(req.body)
    const token = await user.getSignedJwtToken();
    res.status(200).json({status:"success",token,data:user,message:"User created successfully"})
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
    res.status(200).json({status:"success",token,data:user,message:"User created successfully"})
})


export {ragisterUser,loginUser}