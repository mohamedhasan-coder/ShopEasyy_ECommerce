import HandleError from "../helper/handleError.js";

export default (err,req, res, next) => 
{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server Error";
 
    // Duplicate Key Error
    if(err.code === 11000)
    {
        // console.log(Object.keys(err.keyValue));
        const message = `this ${Object.keys(err.keyValue)} is already Registerd` 
        err = new HandleError(message,400);
    }

    res.status(err.statuscode).json({
        success: false,
        message: err.message,
    });
};