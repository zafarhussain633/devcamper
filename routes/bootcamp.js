import {Router} from 'express';
const router = Router()
import {getBootCamps,createBootcamp ,getSinglBootCamps,updateBootcamp,deleteBootcamp,userLogin,getBootcampsInRadius} from '../controller/bootcamp.js' //cnrollers

router.route("/").get(getBootCamps).post(createBootcamp)
router.route("/:id").get(getSinglBootCamps).put(updateBootcamp).delete(deleteBootcamp);
router.route("/login").post(userLogin)
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

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

export  {router}