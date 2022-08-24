import {Router} from 'express';
const bootcampRouter = Router()
import {getBootCamps,createBootcamp ,getSinglBootCamps,updateBootcamp,deleteBootcamp,userLogin,getBootcampsInRadius} from '../controller/bootcamp.js' //cnrollers

bootcampRouter.route("/").get(getBootCamps).post(createBootcamp)
bootcampRouter.route("/:id").get(getSinglBootCamps).put(updateBootcamp).delete(deleteBootcamp);
bootcampRouter.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
bootcampRouter.route("/login").post(userLogin);


// ====or=====
// router.get("/:id", (req, res) => {
//     res.status(200).send({sucess: true , msg:`get single bootcamps ${req.params.id}`});
// })
 
// router.post("/", (req, res) => {
//     res.status(200).send({sucess: true , msg:"create new bootcamps"});
// })

// router.put("/:id", (req, res) => {
//     res.status(200).send({sucess: true , msg:`updae bootcamps ${req.params.id}`});
// })
 
// router.delete("/:id", (req, res) => {
//     res.status(200).send({sucess: true , msg:`delete bootcamps ${req.params.id}`});
// })

export  {bootcampRouter}