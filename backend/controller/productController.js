import { error } from "console";
import Product from "../models/productModel.js";
import errorHandler from "../helper/handleError.js";
import APIHelper from "../helper/APIHelper.js";
import HandleError from "../helper/handleError.js";

// Create Product
export const addProducts = async (req, res) => {
  try {
    req.body.user = req.user.id;
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

// Product Review
export const createProductReview = async(req,res,next) => {
  const { rating, comment, productId} = req.body;
  const review = {
    user:req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if(!product)
  {
    return next(new HandleError("product not Found", 400));
  }

  const reviewExists = products.reviews.find((review) => review.user.toString() == req.user.id);
  if(reviewExists)
  {
    // Update Review
    product.reviews.forEach((review) => {
      if(review.user.toString() === req.user.id) {
        review.rating = rating 
        reviewExists.comment = comment;
      }
    });
  }
  else
  {
    // ADD / Push Review
    product.reviews.push(review);
  }

  // Update Review Count 
  product.numOfReviews = product.reviews.length;

  //update Rating 
  let sum = 0;
  product.reviews.forEach((review) => {
    sum = sum+review.rating;
  });

  product.ratings = product.reviews.length > 0 ?  sum/product.reviews.length : 0;

  // Save Details
  await product.save( {validateBeforeSave: false} );

  res.status(200).json({
    success:true,
    product,
  });
};

// User Review view
export const viewProductReviews = async (req,res,next) => {
  const product = await Product.findById(req.query.id);
  if(!product)
  {
    return next(new errorHandler("Product Not Found", 400));
  }
  res.status(200).json({
    success: true,
    review: product.reviews,
  });
};

// Admin View All Products
export const getAllProductsByAdmin = async(req,res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products}); 
}

// Delete Reviews
export const adminDeleteReview = async(req,res,next) => {
  // req.query.productId | review: req.query.id
  const product = await Product.findById(req.query.productId); // ProductID
  if(!product)
  {
    return next(new errorHandler("Product Not Found",400));
  }
  const reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString());

  let sum = 0;
  reviews.forEach((review) => {
    sum+review.rating;
  });
  const ratings = reviews.length > 0 ? sum/reviews.length : 0;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {reviews, ratings, numOfReviews}, 
  {new: true, runValidators: true});
  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
};