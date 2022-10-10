import {Router} from 'express';
import {protect,authorize} from "./../middleware/auth.js"
import {getAllUsers,addUser,updateUser,deleteUser,getSingeUser,deleteBulk} from "./../controller/users.js";

//base route:   /api/v1/users
const userRouter = Router();

userRouter.use(protect,authorize("admin"));

userRouter.route("/").get(getAllUsers).post(addUser);
userRouter.route("/:id").put(updateUser).delete(deleteUser).get(getSingeUser);
userRouter.route("/bulk/remove").delete(deleteBulk)

export default userRouter;
