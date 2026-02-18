import HandleError from "./handleError.js";
import jwt from "jsonwebtoken";

export const verifyUser = async(req,res,next) => {
    const { token } = req.cookies;
    if(!token){
        return next(new HandleError("Access Denied Please Login to Access",401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECERT_KEY);
    req.user = await User.findByID(decodedData.id);
    next();
};

// ["Admin", "SuperAdmin"]
// ["User"]
export const roleBasedAccess = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new HandleError(`role- ${req.user.role} is not allowed to access this resources`, 403));
        }
        next();
    };
};