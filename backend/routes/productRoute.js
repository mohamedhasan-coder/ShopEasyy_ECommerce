import express from "express";
import {
  addProducts,
  adminDeleteReview,
  createProductReview,
  deleteProduct,
  getAllProducts,
  getAllProductsByAdmin,
  getSingleProduct,
  updateProduct,
  viewProductReviews,
} from "../controller/productController.js";
import { roleBasedAccess, verifyUser } from "../helper/userAuth.js";

const router = express.Router();

// User Side
router.get("/products", getAllProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(verifyUser,createProductReview);

// Admin Side
router.route("/admin/product/create").post(verifyUser, roleBasedAccess("admin"), addProducts);
router.route("admin/product/product/:id").put(verifyUser, roleBasedAccess("admin"),updateProduct).delete(verifyUser,roleBasedAccess("admin"),deleteProduct);
router.route("/admin/reviews").get(verifyUser, roleBasedAccess("admin",viewProductReviews)).delete(verifyUser, roleBasedAccess("admin"),adminDeleteReview);
router.route("/admin/products").get(verifyUser, roleBasedAccess("admin",getAllProductsByAdmin));

export default router;