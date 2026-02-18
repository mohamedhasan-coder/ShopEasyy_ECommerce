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

router
  .route("/products")
  .get(verifyUser, getAllProducts)
  .post(verifyUser, roleBasedAccess("admin"), addProducts);
// router.get("/product/:id", getSingleProduct);
router
  .route("product/:id")
  .get(getSingleProduct)
  .put(verifyUser, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUser, roleBasedAccess("admin"), deleteProduct);

export default router;
