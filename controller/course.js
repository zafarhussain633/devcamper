import Courses from "../models/Courses.js"
import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"

const getCourses = asyncHandler( async(req,res,next) => {
    let {bootcampId} = req.params
    let query;

    if(bootcampId){
        console.log("yeas")
       query= Courses.find({bootcamp: bootcampId})
    }else{
        query= Courses.find()
    }
    
    const courses  =  await query.populate({
        path:"bootcamp",
        select:"name id"
    });
    // const courses  =  await query.populate("bootcamp", "name id"); // another shorthand way
    res.status(200).json({status:"success",count: courses.length, data: courses})
    
})

export {getCourses}

