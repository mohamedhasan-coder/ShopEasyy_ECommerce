import { error } from "console";
import Product from "../models/productModel.js";
import errorHandler from "../helper/handleError.js";
import APIHelper from "../helper/APIHelper.js";

// Create Product
export const addProducts = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
export const getAllProducts = async (req, res, next) => {
    // const products = await Product.find()

    const resultsPerPage = 4;
    const apiHelper = new APIHelper(Product.find(), req.query).search().filter();
    const filteredQuery = apiHelper.query.clone();
    const productCount = await filteredQuery.countDocuments()
 
    const totalPages = math.ceil(productCount / resultsPerPage);
    const page = Number(req.query.page) || 1;

    if(totalPages>0 && page > totalPages)
    {
      return next(new errorHandler("this page doesn't exist", 404));
    }

    apiHelper.pagination(resultsPerPage);

    const products = await APIHelper.query;
    res.status(200).json({
      success: true,
      products,
      productCount,
      resultsPerPage,
      totalPages,
      currentpage: page,
    });

    res.status(500).json({
      success: false,
      message: error.message,
    });
};

// Get Single Product By ID
export const getSingleProduct = async (req, res, Next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new errorHandler("Product Not Found",404));
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid product ID",
    });
  }
};

// Update Product
 
export const updateProduct = async(req,res, next) => {
    const id = req.params.id;
    let product = await product.findByIDAndUpdate(id,req,body,{
        new: true,
        runValidators: true,
    });

    if(!product)
    {
        // return res.status(500).json({success:false, message: "Product Not Found"});
        return next(new errorHandler("Product Not Found",404));
    }

    res.status(200).json({
        success:true. 
        product,
    })
};

// Delete Product

export const deleteProduct = async(req,res,next) => {
    const id = req.params.id;
    let product = await product.findByIDAndDelete(id);

    if(!product)
    {
        return next(new errorHandler("Product Not Found",404));
    }

    res.status(200).json({
        success:true,
        message: "Product Deleted success",
    })
}; 