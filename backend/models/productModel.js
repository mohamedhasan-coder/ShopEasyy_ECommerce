import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.schema({
    name:{
        type:string,
        required: [true, "Please Enter Product Name"],
    },
    description:{
        type:string,
        required: [true, "Please Enter Product Description"],
    },
    price:{
        type:Number,
        required: [true, "Please Enter Product Price"],
        maxlength:[7, "Please Cannot Exceed 7 Digit"],
    }, 
    ratings: {
        type: Number,
        default: 0,
    },
    image: [
        {
            public_id: {
                type:string,
                required:[true],
            },
            url: {type:string, required:[true]},
        },
    ],
    catogery: {
        type:string, 
        required: [true, "Please Enter Product Catogery"],
    },
    stock: {
        type:Number,
        required: [true, "Please Enter Product Stock"],
        default:1,
    },
    numOfReviews: {
        type:Number,
        default:0,
    },
    reviews: [
        {
            name:{type:string, required: true}, 
            rating:{type:Number, required: true},
            Comment:{type:string, required:true},
        }
    ],
    createdAt: {
        type:Date,
        default: Date.now,
    },
});

export default mongoose.model("product",productSchema);