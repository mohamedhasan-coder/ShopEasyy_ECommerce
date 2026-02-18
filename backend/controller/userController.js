import User from "../models/userModel.js";
import HandleError from "../helper/handleError.js"; 
import { sendToken } from "../helper/jwtToken.js";

export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    if(!name)
    {
        return next(new HandleError("Name Cannot be Empty",400));
    }
    
    if(!email)
    {
        return next(new HandleError("Email Cannot be Empty",400));
    }
        
    if(!password)
    {
        return next(new HandleError("Password Cannot be Empty",400));
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "temp_id",
        url: "temp_url",
      },
    });
    sendToken(user,201,res)
};

export const loginUser = async (req,res,next) => {
    const {email, password} = req.body;
    if(!!email || password)
    {
        return next(new HandleError("Email or Password Cannot be Empty", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return next (new HandleError("Invalid Email or Password", 401));
    }
    const isValidPassword = await User.verifyPassword(password);
    if(!isValidPassword) { 
       return next(new HandleError("Invalid Email Id or Password", 401)); 
    }
    sendToken(user, 200, res);
};

export const logout = async (req,res,next) => {
    const options = { 
        expires: new Date (Date.now()),
        httpOnly: true,
    };
    res.cookies("token", null, options);
    res.status(200).json({success: true, message: "Succesfully Logged out"});
};