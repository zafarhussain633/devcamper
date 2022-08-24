import BootCamps from "../models/Bootcamp.js"
import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"
import getGeolocation from "../helpers/mapquest.js"

// desc:    Get all bootcaps
// @route:  GET  /api/v1/bootcamps  
// @access: public   
export const getBootCamps= asyncHandler(async(req,res, next)=>{
 
    let totalCount = await BootCamps.countDocuments(); //all bootcamps count 
    let {query} = req;
    let advanceFilter = {...req.query}
  
    
    if(req.query.select || req.query.sort||req.query.page||req.query.limit){
      delete req.query.select
      delete req.query.sort
      delete req.query.page
      delete req.query.limit
    }
    
    console.log(advanceFilter)


  

    //query for finding particular bootcamps
    let queryStr= JSON.stringify(query);
    queryStr= JSON.parse(queryStr.replace(/\b(lt|lte|gt|gte|contain|in)\b/g, matchVal=>`$${matchVal}`));
    query=  BootCamps.find(queryStr);

    //selecting
    if(advanceFilter.select){
      let selectQuery = advanceFilter.select.replaceAll(",", " ");
      query  = query.select(selectQuery)
    }

    //sorting
    if(advanceFilter.sort){
      let sortQuery = advanceFilter.sort.replaceAll(",", " ");
      query  = query.sort(sortQuery)
    }else{
      query  = query.sort('createdAt')
    }

    //pagination
    const page = parseInt(advanceFilter.page,10)||1 // here 10 is for convert string into number
    const limit = parseInt(advanceFilter.limit,10) ||10  //if limit not mentioned by limit will be 10
    const skip = (page -1) * limit
    query = query.skip(skip).limit(limit);
    
  
    const bootcamps =await query;

    res.status(200).json({success: true , data:bootcamps, total:totalCount})
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
    const bootcamps =await BootCamps.findByIdAndDelete(req.params.id);
    if(!bootcamps){ 
     return res.status(400).json({success: false})
    }
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

    const bootcamp = await Bootcamp.find({
      location: {
        $geoWithin: { $centerSphere: [ [ long, lat ], radius ] }
      }
    })
    
    res.status(200).json({success: true , count: bootcamp.length, data:bootcamp})

});



export const userLogin=async (req,res,next)=>{
  res.status(200).json({sucess:true, msg:`development under processs`}) 
}
