import multer from 'multer'
import ErrorResponse from "./../util/errorResponse.js"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,process.env.FILE_UPLOAD_PATH)  // the file will be automatically uploaded in uopload folder
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      let {ext} = path.parse(file.originalname);
      const fname = `photo_${req.params.id||req.user.id}${ext}`
      
      cb(null, fname)
    }
  })
  


function fileFilter (req, file, cb) {

    const fileSize = req.headers["content-length"];

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  
    //To reject this file pass `false`, like so:
    cb(null, false) // its mandatery do not remove this code
  
    //To accept the file pass `true`, like so:
    cb(null, true)


    // You can always pass an error if something goes wrong:
    // cb(new Error('I don\'t have a clue!'))
    if(!file.mimetype.includes("image")){
        return cb(new ErrorResponse('Please select image type',400))
    }

    if(fileSize>maxImageSize()){
        return cb(new ErrorResponse(`please upload image less than ${process.env.MAX_IMAGE_SIZE}`,400))
    }

  }

const maxImageSize = ()=>{
    let limit = Number(process.env.MAX_IMAGE_SIZE.replace("MB",""));
    const max  = limit*1000000
    return max
}

export const upload = multer(
    {  
        storage: storage ,
        // limits:{              //unable it if you dont want coustom message from filFilter fx
        //     fileSize:maxImageSize()
        // },
        fileFilter: fileFilter,
    },
)
