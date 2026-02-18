import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema
(
    {
        name: {   
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [25, "Invali name. please Enter a name with Fewer than 25 Characters"],
            minLength: [3, "Name Should Contain More Than 3 Characters"],
        },
        email: {
            type: String, 
            required: [true, "Please Enter Your Email"],
            unique: true,   
            validate:[validator.isEmail, "Please Enter Valid Email"],
        }, 
        password: {
            type:String, 
            required: [true, "Please Enter Your Password"], 
            minLength: [8, "Password Should Be Greater Than 8 Charcters"],
            select: false,
        },
        avatar: {
            public_id:{
                type:String,
                required:true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        role: {
            type: String, 
            default: "user",
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

userSchema.methods.getJwtToken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECERT_KEY,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

userSchema.methods.verifyPassword = async function (userPassword) { 
    return await bcryptjs.compare(userPassword, this.password);
};

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken;
};

export default mongoose.model("user", userSchema);