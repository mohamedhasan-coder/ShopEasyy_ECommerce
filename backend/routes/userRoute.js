import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  profile,
  updatePassword,
  updateProfile,
} from "../controller/userController.js";
import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile").get(verifyUser, profile);
router.route("/password/update").put(verifyUser, updatePassword);
router.route("/profile/update").put(verifyUser, updateProfile);

export default router;