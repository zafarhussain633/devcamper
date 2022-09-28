
import User from "../models/User.js";
import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"
import jwt from "jsonwebtoken"


const protect = asyncHandler((req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    } else {
        next(new ErrorResponse("Invalid token", 401));
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            next(new ErrorResponse("Invalid token", 401));
        } else {
            console.log(decoded) // bar
            req.user = await User.findById(decoded.id)
        }
        next();
    });
})


const authorize = (...roles) => (req, res, next) => {
     console.log(req.user)
    if (roles.includes(req.user.role)) {
        next();
    } else {
        next(new ErrorResponse(`you are not authorize to access this route`, 403));
    }
}

export { protect, authorize } 