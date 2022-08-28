import BootCamps from "../models/Bootcamp.js"
import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"
import getGeolocation from "../helpers/mapquest.js"

// desc:    Get all bootcaps
// @route:  GET  /api/v1/bootcamps  
// @access: public   
export const getBootCamps= asyncHandler(async(req,res, next)=>{
    res.status(200).json(res.advanceResult)
})


// desc:    Get single bootcaps
// @route:  GET  /api/v1/bootcamps/:id
// @access: public   
export const getSinglBootCamps= asyncHandler(async(req,res, next)=>{
    const bootcamps = await BootCamps.findById(req.params.id);
    if(!bootcamps){ 
      next(new ErrorResponse(`Bootcamps not found with id ${req.params.id}`,404))
    }
    res.status(200).json({success: true , data:bootcamps})
 
})
  


// desc:    create put bootcamp
// @route:  POST  /api/v1/bootcamps/:id
// @access: private  
export const createBootcamp= asyncHandler(async(req,res, next)=>{
      const bootcamp = await BootCamps.create(req.body);
      res.status(200).json({
        sucess:true,
         data:bootcamp
      })
  })
  
// desc:    updae bootcaps
// @route:  PUT  /api/v1/bootcamps/:id
// @access: private  
export const updateBootcamp= asyncHandler( async(req,res, next)=>{
    const bootcamps = await BootCamps.findByIdAndUpdate(req.params.id, req.body,{
      new:true, // it will return updated data
      runValidators:true
    });

    if(!bootcamps){ 
     return next(new ErrorResponse(`Bootcamps not found with id ${req.params.id}`,404 ))
    }
    res.status(200).json({success: true , data:bootcamps , msg:"bootcamp updated Sucessfully"})
})


// desc:    delete bootcaps
// @route:  DELETE  /api/v1/bootcamps/:id
// @access: private  
export const deleteBootcamp= asyncHandler(async(req,res, next)=>{
    const bootcamp =await BootCamps.findById(req.params.id);

    if(!bootcamp){ 
     next(new ErrorResponse(`Failed to delete Bootcamp not found with id ${req.params.id}`))
     return res.status(400).json({success: false})
    }

    bootcamp.remove();

    res.status(200).json({success: true , data:{} , msg:"bootcamp deleted Sucessfully"})
})



//@desc: get bootcaps with a radius
//@route: GET /api/v1/bootcamps/radius/:zipcode/:distance
//access: Private

export const getBootcampsInRadius= asyncHandler(async(req,res,next)=>{
    const {zipcode, distance} = req.params
    const loc = await getGeolocation(zipcode)

    const lat = loc[0].latitude;
    const long=loc[0].longitude;
 
    //cal radius of earth
    const earthRadius =6371
    const radius = distance/earthRadius

    const bootcamp = await BootCamps.find({
      location: {
        $geoWithin: { $centerSphere: [ [ long, lat ], radius ] }
      }
    })
    
    res.status(200).json({success: true , count: bootcamp.length, data:bootcamp})

});


//@desc: upload or update bootcamp photo
//@route: GET /api/v1/bootcamps/:id/photo-upload
//access: Private
export const uploadPhoto =asyncHandler( async (req, res,next) => {

  const {id} = req.params;

  if(!req.file){
    return next(new ErrorResponse(`please add image`,404 ))
  }

  let bootcamp = await BootCamps.findOneAndUpdate(id,{photo:req.file.filename},{new :true, runValidators:true})
   
  res.status(200).json({success: true ,data:bootcamp.photo, msg: "image uploaded successfully"})

})


export const userLogin=async (req,res,next)=>{
  res.status(200).json({sucess:true, msg:`development under processs`}) 
}
