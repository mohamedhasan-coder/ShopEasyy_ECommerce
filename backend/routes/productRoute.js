import express from "express";
import {
  addProducts,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
import { roleBasedAccess, verifyUser } from "../helper/userAuth.js";

const router = express.Router();

// User Side
router.get("/products", getAllProducts);
router.route("/product/:id").get(getSingleProduct);

// User Review


// Admin Side
router.route("/admin/product/create").post(verifyUser, roleBasedAccess("admin"), addProducts);
router.route("admin/product/product/:id").put(verifyUser, roleBasedAccess("admin"),updateProduct).delete(verifyUser,roleBasedAccess("admin"),deleteProduct);

// Admin View All Products
// View Review
// Delete Review

export default router;