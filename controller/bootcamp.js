
// desc:    Get all bootcaps
// @route:  GET  /api/v1/bootcamps
// @access: public   
export const getBootCamps=(req,res, next)=>{
  res.status(200).json({sucess:true, msg:"show all bootcamps", data:{}, middleware:req.hello})
}


// desc:    Get single bootcaps
// @route:  GET  /api/v1/bootcamps/:id
// @access: public   
export const getSinglBootCamps=(req,res, next)=>{
    res.status(200).json({sucess:true, msg:`show single bootcamps ${req.params.id}`}) 
  }
  


// desc:    create put bootcamp
// @route:  POST  /api/v1/bootcamps/:id
// @access: private  
export const createBootcamp=(req,res, next)=>{
    res.status(200).json({sucess:true, msg:"create bootcamps"})
  }
  
// desc:    updae bootcaps
// @route:  PUT  /api/v1/bootcamps/:id
// @access: private  
export const updateBootcamp=(req,res, next)=>{
    res.status(200).json({sucess:true, msg:`update single bootcamp ${req.params.id}`})
  }


// desc:    delete bootcaps
// @route:  DELETE  /api/v1/bootcamps/:id
// @access: private  
export const deleteBootcamp=(req,res, next)=>{
    res.status(200).json({sucess:true, msg:`delete single bootcamp ${req.params.id}`})
  }


export const userLogin=(req,res,next)=>{
  console.lo
}
