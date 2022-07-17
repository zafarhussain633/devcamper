import mongoose  from "mongoose";

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
      required:[true, "please addd address"]

    },

    // location :{
       
    //     type: {
    //         type: String, // Don't do `{ location: { type: String } }`
    //         enum: ['Point'], // 'location.type' must be 'Point'
    //         required: true
    //       },
    //       coordinates: {
    //         type: [Number],
    //         required: true,
    //         index: '2dsphere'
    //       },
    //       formattedAddress: String,
    //       street:String,
    //       city:String,
    //       state: String,
    //       zipcode:String,
    //       country:String
    // },

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
    }
}
)

export default mongoose.model("BootCamps", BootCampSchema)