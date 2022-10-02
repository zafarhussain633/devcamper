import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"
import User from "../models/User.js";

//for admin get all user 
const getAllUsers = () =>asyncHandler( async(req,res)=>{
    const users = await User.find();
    res.status(200).json({success:true, data:users});
})

const addUser = () =>asyncHandler( async(req,res)=>{
    const user = await User.create(req.body);
    res.status(200).json({success:true, data:user});
})

const updateUser=()=>asyncHandler( async(req,res,next)=>{   
    let resonse = await User.findByIdAndUpdate(req.params.id,req.body,{new: true})
    if(!resonse){
       return  next(new ErrorResponse("Invalid user id or not found in database",404));
    }
    resonse.status(200).json({success:true,data:resonse})
})


const deleteUser = asyncHandler( async (req, res) => {
     await User.findByIdAndDelete(req.params.id);
     res.status(200).json({success:true, message:"user deleted successfully"})

})

const getSingeUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return  next(new ErrorResponse("Invalid user id or not found in database",404));
    }
    res.status(200).json({success:true, data:user});
}
);

//findById
export {getAllUsers,addUser,updateUser,deleteUser,getSingeUser}





