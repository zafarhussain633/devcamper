import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "./../util/errorResponse.js";
import {generateOtp} from "./../helpers/auth.js";

const userSchema = new mongoose.Schema({
  profilePicture: String,
  name: {
    type: String,
    required: [true, "please enter name"],
    maxlength: [40, "name should not exceed 40 characters"]
  },
  email: {
    type: String,
    required: [true, "please enter email address"],
    match: [/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Please enter a valid email address"],
    unique: true
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user',

  },  
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [8, "password must be at least 8 characters"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ],
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  resetOtpVerified: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }

});


// for checking emal exit or not 
userSchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    next(new ErrorResponse("Email already exists", 400));
  } else {
    next();
  }
});


userSchema.pre("save", function async (next) {

  if(!this.isModified("password")){
     next();
  }
  const hashpassword = bcrypt.hashSync(this.password, 10);
 
  this.password = hashpassword
  next();
});


userSchema.methods.getSignedJwtToken = async function () {
  const token = jwt.sign(
    { id: this.id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
  );
  return token;
}

userSchema.methods.setResetToken =  async function () {
  let otp = generateOtp();
  const hashResetToken = bcrypt.hashSync(otp,10); 
  this.resetPasswordToken =  hashResetToken; // adding encrypted to database for security.
  this.resetPasswordExpires = Date.now()+10*60*1000;
  return otp; // return for sending to email
}

userSchema.methods.matchPassword = async function (password) {
  console.log(this.password,"sss")

  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
}

userSchema.methods.matchResetToken = async function (otp) {
  const isMatch = await bcrypt.compare(otp,this.resetPasswordToken); 
  return isMatch;   
}


export default mongoose.model('User', userSchema);