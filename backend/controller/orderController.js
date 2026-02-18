import Order from "../models/orderModel.js";
import errorHandler from "../helper/handleError.js";
import Product from "../models/productModel.js";

// Create New Order
export const createNewOrder = async(req,res,next) => {
    const {shippingAddress, orderItems, paymentInfo, itemPrice, TaxPrice, shippingPrice,  totalPrice } = req.body;
    const order = await Order.create({
        shippingAddress, 
        orderItems,
        paymentInfo,
        itemPrice,
        TaxPrice,
        shippingPrice,
        totalPrice, 
        paidAt:Date.now(),
        user:req.user._id,
    });
    res.status(201).json({
        success: true,
        order,
    });
};

//Get Single Order Details
export const getOrderDetails = async(req,res,next) => {
    const order = await Order.findById(req.params.id).populate("user","name email");
    if(!order)
    {
        return next (new errorHandler("Order Not Found",404));
    }
    res.status(200).json({
        success: true,
        order,
    });
};

// Get All Order Details
export const getAllOrders = async(req,res,next) => {
    const orders = await Order.find({
        user: req.user._id
    });
    if(!orders)
    {
    
        return next (new errorHandler("Order Not Found",404));
    }
    res.status(200).json({
        success: true,
        orders,
    });
};

// Get All Order Details By Admin 
export const getAllOrdersByAdmin = async (req,res,next) => {
    const orders = await Order.find().populate("email", "name email");
    if(!orders)
    {
        return next (new errorHandler("Order Not Found",404));
    }
    let totalAmount = 0;
    orders.forEach((order)=>(totalAmount += order.totalPrice));
    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    });
};

// Admin Delete Orders

export const deleteOrder = async(req,res,next) => {
    const order = await Order.findById(req.params.id);
    if(!order)
    {
        return next (new errorHandler("Order Not Found",404));
    }
    if(order.orderStatus !== "Delivered")
    {
        return next (new errorHandler("this Order Under Processing and Cannot be Deleted", 404));
    }
    await Order.deleteOne({_id:req.params.id});
    res.status(200).json({
        success: true,
        message: " Order Deleted Successfully",
    });
};

// Admin Order Update
export const updateOrderStatus = async(req,res,next) => {
    const id = req.params.id;

    const order = await Order.findById(id)
    if(!order)
    {
        return next (new errorHandler("Order Not Found",404));
    }
    if(order.orderStatus === "Delivered")
    {
        return next (new errorHandler("this Order is Already Been Delivered", 404));
    }

    // Update Stock

    await Promise.all(order.orderItems.map((item) => updateQuantity(item.product,item.quantity)));
    order.orderStatus = req.body.status;

    if(order.orderStatus === "Delivered")
    {
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success: true,
        order,
    })
};

async function updateQuantity(id,quantity) {
    const product = await Product.findById(id);

    if(!product)
    {
        throw new Error ("Product Not Found");
    }
    product.stock -= quantity;
    await product.save({validateBeforeSave: false});
}