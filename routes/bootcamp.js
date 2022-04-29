const express = require('express');
const router = express.Router()
const {getBootCamps,createBootcamp ,getSinglBootCamps,updateBootcamp,deleteBootcamp} = require('../controller/bootcamp')

router.route("/").get(getBootCamps).post(createBootcamp)
router.route("/:id").get(getSinglBootCamps).put(updateBootcamp).delete(deleteBootcamp);

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

module.exports = router