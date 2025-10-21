import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      <div className="relative w-full h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full p-4 transform group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <p className="text-indigo-600 font-bold text-lg mb-4">${product.price}</p>

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
