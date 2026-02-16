import User from "../models/userModel.js";
import HandleError from "../helper/handleError.js"; 

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
    const token = user.getJwtToken();
    res.status(201).json({
      success: true,
      user,
    });
};
