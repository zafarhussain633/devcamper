import {Router} from 'express';
import {protect,authorize} from "./../middleware/auth.js"
import {getAllUsers,addUser,updateUser,deleteUser,getSingeUser,deleteBulk} from "./../controller/users.js";
import advanceResult from "./../middleware/advanceResult.js"; 
import User from "./../models/User.js"

//base route:   /api/v1/users
const userRouter = Router();

userRouter.use(protect,authorize("admin"));

userRouter.route("/").get(advanceResult(User,{   //here is User is model
    path: "BootCamps",  // pulating all bootcamps of user 
    populate: { path: "courses" },  // populating child of child
  }),getAllUsers).post(addUser);

userRouter.route("/:id").put(updateUser).delete(deleteUser).get(getSingeUser);
userRouter.route("/bulk/remove").delete(deleteBulk)

export default userRouter;
