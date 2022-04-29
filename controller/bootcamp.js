
// desc  Get all bootcaps
// @route  GET/api/v1/bootcamps
// @access public   
exports.getBootCamps=(req,res, next)=>{
  res.status(200).json({sucess:true, msg:"show all bootcamps"})
}


// desc  Get single bootcaps
// @route  GET/api/v1/bootcamps/:id
// @access public   
exports.getSinglBootCamps=(req,res, next)=>{
    res.status(200).json({sucess:true, msg:`show single bootcamps ${req.params.id}`}) 
  }
  


// desc  POST  bootcaps
// @route  POST/api/v1/bootcamps/:id
// @access private  
  exports.createBootcamp=(req,res, next)=>{
    res.status(200).json({sucess:true, msg:"create bootcamps"})
  }
  
// desc  updae bootcaps
// @route  PUT/api/v1/bootcamps/:id
// @access private  
  exports.updateBootcamp=(req,res, next)=>{
    res.status(200).json({sucess:true, msg:`update single bootcamp ${req.params.id}`})
  }


  // desc  delete bootcaps
  // @route  DELETE/api/v1/bootcamps/:id
// @access private  
exports.deleteBootcamp=(req,res, next)=>{
    res.status(200).json({sucess:true, msg:`delete single bootcamp ${req.params.id}`})
  }
  
