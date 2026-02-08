import express from "express";
import { addProducts, getAllProducts,getSingleProduct } from "../controller/productController.js";

const router = express.Router();

router.route("/products").get(getAllProducts).post(addProducts);
router.get("/product", getSingleProduct);

export default router;