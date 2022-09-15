
import asyncHandler from "../util/asyncHandler.js"

const advanceResult  = (model, populate) => asyncHandler( async(req,res,next)=>{
    let totalCount = await model.countDocuments(); //all model count 
    let {query} = req;
    let advanceFilter = {...req.query}
  
    
    if(req.query.select || req.query.sort||req.query.page||req.query.limit){
      delete req.query.select
      delete req.query.sort
      delete req.query.page
      delete req.query.limit
    }

    //query for finding particular model
    let queryStr= JSON.stringify(query);
    queryStr= JSON.parse(queryStr.replace(/\b(lt|lte|gt|gte|contain|in)\b/g, matchVal=>`$${matchVal}`));
    console.log(queryStr);
    if(populate){
        query=  model.find(queryStr).populate(populate); // al field of course model
    }

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
    const limit = parseInt(advanceFilter.limit,10) || totalCount  //if limit not mentioned by limit will be show all
    const skip = (page -1) * limit
    query = query.skip(skip).limit(limit);
    
  
    const result =await query
    res.advanceResult = {
        success: true ,
        data:result,
        total:totalCount,
        totalResult:result.length
    }   // THIS WIILL ADD advanceResult IN res with all mentioned route
    next();
})

export default advanceResult