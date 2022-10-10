import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"
import User from "../models/User.js";

//for admin get all user 
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
})

//for admin add user
const addUser = asyncHandler(async (req, res, next) => {
    await User.create(req.body);
    res.status(200).json({ success: true, message:"user create successfully" });
})

//for admin update user
const updateUser = asyncHandler(async (req, res, next) => {
    let resonse = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!resonse) {
        return next(new ErrorResponse("Invalid user id or not found in database", 404));
    }
    res.status(200).json({ success: true, data: resonse })
})

//for adming delete user
const deleteUser = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "user deleted successfully" })

})

const deleteBulk = asyncHandler(async (req, res,next) => {
    const {id} = req.body
    const user =  await User.deleteMany({_id: {$in:id}})
    res.status(200).json({ success: true, message: `${id.length} user deleted successfully` })
});

//for admin get single user
const getSingeUser = asyncHandler(async (req, res,next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorResponse("Invalid user id or not found in database", 404));
    }
    res.status(200).json({ success: true, data: user });
}
);

export { getAllUsers, addUser, updateUser, deleteUser, getSingeUser,deleteBulk }





