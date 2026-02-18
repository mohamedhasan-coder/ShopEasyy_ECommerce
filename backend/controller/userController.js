import User from "../models/userModel.js";
import HandleError from "../helper/handleError.js";
import { sendToken } from "../helper/jwtToken.js";
import { sendEmail } from "../helper/sendEmail.js";
import crypto from "crypto";

// Register User
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) return next(new HandleError("Name cannot be empty", 400));
    if (!email) return next(new HandleError("Email cannot be empty", 400));
    if (!password) return next(new HandleError("Password cannot be empty", 400));

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "temp_id",
        url: "temp_url",
      },
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(new HandleError(error.message, 500));
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HandleError("Email or Password cannot be empty", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new HandleError("Invalid Email or Password", 401));
    }

    const isValidPassword = await user.verifyPassword(password);

    if (!isValidPassword) {
      return next(new HandleError("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    return next(new HandleError(error.message, 500));
  }
};

// Logout User
export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    return next(new HandleError(error.message, 500));
  }
};

// Forgot Password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new HandleError("User does not exist", 404));

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const resetEmailHTML = `
      <div style="font-family: Arial, sans-serif;">
        <h2>Reset Your Password</h2>
        <p>Hi ${user.name},</p>
        <a href="${resetPasswordURL}">Reset Password</a>
      </div>
    `;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      html: resetEmailHTML,
    });

    res.status(200).json({
      success: true,
      message: `Password reset email sent to ${user.email}`,
    });
  } catch (error) {
    return next(new HandleError("Email could not be sent. Try again later.", 500));
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return next(new HandleError("Reset token is invalid or expired", 400));

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return next(new HandleError("Passwords do not match", 400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    sendToken(user, 200, res);
  } catch (error) {
    return next(new HandleError(error.message, 500));
  }
};

// Get Profile
export const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new HandleError(error.message, 500));
  }
};

// Update Password
export const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");
    const isCorrect = await user.verifyPassword(oldPassword);

    if (!isCorrect) return next(new HandleError("Incorrect old password", 400));
    if (newPassword !== confirmPassword)
      return next(new HandleError("Confirm password must match new password", 400));

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    return next(new HandleError(error.message, 500));
  }
};

// Update Profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    return next(new HandleError(error.message, 500));
  }
};
