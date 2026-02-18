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

// Forgot Password (Send Reset Link Email)
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new HandleError("User does not exist", 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    const resetEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 16px;">
        <h2>Reset Your Password</h2>
        <p>Hi <strong>${user.name}</strong>,</p>
        <p>You requested to reset your password. Click the button below:</p>
        <a href="${resetPasswordURL}" 
           style="display:inline-block;padding:12px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:6px;">
           Reset Password
        </a>
        <p>This link will expire in <strong>30 minutes</strong>.</p>
        <p>If you didn’t request this, you can ignore this email.</p>
        <hr/>
        <p style="font-size:12px;color:#777;">© ${new Date().getFullYear()} E-Commerce</p>
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

// Reset Password (Change Password + Send Success Email)
export const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new HandleError("Reset token is invalid or has expired", 400));
    }

    const { password, confirmPassword } = req.body;

    if (!password) {
      return next(new HandleError("Password cannot be empty", 400));
    }

    if (confirmPassword && password !== confirmPassword) {
      return next(new HandleError("Passwords do not match", 400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    // Send confirmation email after successful reset
    const successEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 16px;">
        <h2>Password Changed Successfully</h2>
        <p>Hi <strong>${user.name}</strong>,</p>
        <p>Your password has been successfully updated.</p>
        <p>If you did not make this change, please contact support immediately.</p>
        <hr/>
        <p style="font-size:12px;color:#777;">© ${new Date().getFullYear()} E-Commerce</p>
      </div>
    `;

    await sendEmail({
      email: user.email,
      subject: "Your Password Was Changed",
      html: successEmailHTML,
    });

    sendToken(user, 200, res);
  } catch (error) {
    return next(new HandleError(error.message, 500));
  }
};
