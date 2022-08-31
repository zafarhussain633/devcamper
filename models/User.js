import mongoose  from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required : [true,"please enter name"],
        maxlength:[40, "name should not exceed 40 characters"]
    },
    email: {
        type: String,
        required : [true,"please enter email address"],
        match:[/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,"Please enter a valid email address"],
        unique:true
    },
    role:{
       type: String,  
       enum:['user','publisher'],
       default:'user',

    },
    password: {
      type: String,
      required : [true,"please enter password"],
      minlength: [8, "password must be at least 6 characters"],
      match:[
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ],
      select: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    createdAt:{
        type: Date,
        default: Date.now
    }

});


userSchema.pre("save",function(next){
 const hash = bcrypt.hashSync(this.password, 10);
 this.password=hash
 next();
});

userSchema.methods.getSignedJwtToken = async function(){
    const token =  jwt.sign(
          {id:this.id},
           process.env.JWT_SECRET_KEY,
          { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
        );
    return token;
}

userSchema.methods.matchPassword = async function(password){        
    console.log(password,this.password)
 const isMatch = await bcrypt.compare(password,this.password);
 return isMatch;
}

export default mongoose.model('User', userSchema);