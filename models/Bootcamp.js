import mongoose  from "mongoose";
import slugify from "slugify";
import getGeolocation from "../helpers/mapquest.js";
const BootCampSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"please add name"],
        unique:false,
        trim:true, // it delete the white space from string but not from between word
        maxlength:[50, "name cannot be more than 50 character"]
    },
    slug:String,
    description: {
        type:String,
        required:[true, "Please add a Description"],
        maxlength:[500, "Description cannot be more than 500 character"]
    },
    website:{
        type: String,
        required:[true, "please add website"],
        match:[
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        ,"please valid website"]
    },
  
    phone:{
        type: String,
        maxlength:[20 , "please enter phone number less than 20 digit"]
    },

    email:{
        type: String,
        match:[
         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        ,"please valid website"]
    },

    address: {
        //Geo json 
      type:String,
      required:[true, "please addd address"],
      minlength:[20 , "Please add address at least 20 characters"],
      maxlength:[200 , "Address should  not exceed 200   characters"]
      

    },

    location :{
       
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
          },
          formattedAddress: String,
          street:String,
          city:String,
          state: String,
          zipcode:String,
          country:String,
          countryCode:String,
    },

    careers: {
        type:[String],
        required:true,
        enum:[   // it can only accept below value
            "Web Development",
            'Mobile Development',
             'UI/UX',
             'Data Science',
             'Business',
             'Other'
        ]
    },

    averageRating: {
        type:Number,
        min:[1,'Rating must be at least 1 '],
        max:[5, 'Rating could not be more than 5']
    },
    averageCost: Number,
    photo:{
        type:String,
        default:"notphto.com" //if there is not photo it will show default photo
    },
    housing:{
        type:Boolean,
        default:false
    },
    jobAssistance: {
        type:Boolean,
        default:false
    },
    jobGuarantee:{
        type:Boolean,
        default:false
    },

    acceptGi: {
        type:Boolean,
        default:false
    },
    createdAt:{
        type : Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',  //will check is this course associated with any bootcamp
        required: [true,"please add user associated with this bootcamp"],
    },
},
{
    toJSON:{virtuals:true},  // for reverese population with virtual
    toObject:{virtuals:true} // for reverese population with virtual
}
)

BootCampSchema.pre("remove", async function(next){  // this will delete all the courses associated with this bootcamp
   await this.model("Courses").deleteMany({bootcamp:this.id})
   await this.model("Reviews").deleteMany({asscociatedBootcampId:this.id})
   next();
})

BootCampSchema.pre("save",function (next){
   this.slug =  slugify(this.name,{
    lower: true,
    trim: true,
    replacement: '-',  
   })
   next();
})

BootCampSchema.pre("save",async function(next){  
   let response = await getGeolocation(this.address)
    this.location= {
        type:"Point",
        coordinates:[response[0].latitude,response[0].longitude],
        formattedAddress: response[0].formattedAddress,
        street:response[0].streetName,
        city:response[0].city,
        state: response[0].state,
        zipcode:response[0].zipcode,
        country:response[0].country,
        countryCode:response[0].countryCode,
   }

   this.address=undefined; // this will not addd addres in database
   next();
})

// reverese population with vituals
BootCampSchema.virtual('courses',{
    ref:'Courses',
    localField:"_id",
    foreignField:"bootcamp",
    justOne:false,
})

BootCampSchema.virtual('Reviews',{
    ref:'Reviews',
    localField:"_id",
    foreignField:"asscociatedBootcampId",
    justOne:false,
})


// BootCampSchema.pre("find", async function (next) {
//     let bootcampRatings  = await this.model("Reviews").find({asscociatedBootcampId: this.id}).select("rating");
//     let bootcampRatingList =  bootcampRatings.map(res=>res.rating);

//     if(bootcampRatingList.length>0){
//         const avgRating  =  getAverageCost(bootcampRatingList)
//         this.averageRating =avgRating
//     }

//     next();
// })



export default mongoose.model("BootCamps", BootCampSchema)