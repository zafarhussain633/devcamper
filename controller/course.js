import Courses from "../models/Courses.js"
import BootCamps from "../models/Bootcamp.js"
import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"

// desc:    Get all courses
// @route:  GET  /api/v1/courses and  /api/v1/bootcamps/:bootcampId/courses 
// @access: public 
const getCourses = asyncHandler(async (req, res) => {
    let { bootcampId } = req.params
    let query;

    if (bootcampId) {
        console.log("yeas")
        query = Courses.find({ bootcamp: bootcampId })
    } else {
        query = Courses.find()
    }

    const courses = await query.populate({
        path: "bootcamp",
        select: "name id"
    });
    // const courses  =  await query.populate("bootcamp", "name id"); // another shorthand way
    res.status(200).json({ status: "success", count: courses.length, data: courses })

})


// desc:    Get single courses
// @route:  GET  /api/v1/courses/:id
// @access: public
const getSingleCourse = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    const course = await Courses.findById(id);

    if (!course) {
        next(new ErrorResponse(`Course not found with id ${req.params.id}`, 404))
    }

    res.status(200).json({ status: "success", count: course.length, data: course })

})

// desc:    add courses with accociated bootcamp id
// @route:  POST /api/v1/bootcamps/:bootcampId/courses/add
// @access: private
const addCourse = asyncHandler(async (req, res, next) => {
   
    const bootcampId = req.params.bootcampId;
    const payload = req.body;

    payload.bootcamp=bootcampId // if user forgot to add boocamp id we will add it from req params
    
    const bootcampAvail = await BootCamps.findById(bootcampId);

    if(!bootcampAvail){
      return next(new ErrorResponse(`no Bootcamp with id of ${bootcampId}`, 404))
    }

    const course = await Courses.create(payload);

    res.status(200).json(
        {
            status: "success",
            data: course,
            msg: "Courses created successfully"
        }
    )
});

// desc:    update courses by id
// @route:  PATCH  /api/v1/courses/:id
// @access: private
const updateCourse = asyncHandler(async (req, res, next) => {
    const {id} = req.params
    const payload = req.body;
   
    const course = await Courses.findByIdAndUpdate(id,payload,{
        new : true,
        runValidators:true
    });

    if(!course){
       return next(new ErrorResponse(`no Course found  with id of ${id}`, 400))
    }

    res.status(200).json(
        {
            status: "success",
            data: course,
            msg: "Courses updated successfully"
        }
    )
});

// desc:    delete course with course id
// @route:  delete  /api/v1/courses/:id
// @access: private
const deleteCourse = asyncHandler( async(req,res,next)=>{
  const {id} = req.params
  const course = await Courses.findByIdAndDelete(id);

  if(!course){
    return next(new ErrorResponse(`Failed to delete course or already deleted  with id ${id}`, 400))
  }

  res.status(200).json({success: true , data:{} , msg:"Course deleted Sucessfully"})
})

export { getCourses, getSingleCourse, addCourse,updateCourse ,deleteCourse}
