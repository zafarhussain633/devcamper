import User from "../models/User.js";
import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"
import getGeolocation from "../helpers/mapquest.js"


const ragisterUser = asyncHandler( async(req,res,next)=>{
    console.log(req.body,"res")
    const user = await User.create(req.body);
    res.status(200).json({status:"success",data:user,message:"User created successfully"})
})

export {ragisterUser}