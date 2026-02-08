import Product from "../models/productModel.js"
// Create Products

export const addProducts = async(req,res) => {
    // console.log(req.body);
    const product = await Product.create(req.body);
    res.status(201);
};

export const getAllProducts= (req, res) => {   
    res.status(200).json({"message":"All Products"})
};

export const getSingleProduct = (req, res) => {
    res.status(200).json({"message":"Single Products"})
};
