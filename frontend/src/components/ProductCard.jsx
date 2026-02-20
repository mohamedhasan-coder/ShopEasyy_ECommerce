import { useState } from "react";
import StarRating from "./StarRating";

const ProductCard = ({ product }) => {
  const [rating, setRating] = useState(product.rating || 0);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="h-44 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <StarRating value={rating} onChange={setRating} />
          <span className="text-xs text-gray-500">
            {rating}/5 ({product.reviews || 0} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-blue-600 font-bold">₹{product.price}</span>
          <button className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;