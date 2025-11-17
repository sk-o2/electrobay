
// // src/components/ProductCard.jsx
// import React from "react";

// const ProductCard = ({ product, onAdd = () => {}, onView = () => {} }) => {
//   const images =
//     product?.images && product.images.length
//       ? product.images
//       : product?.image
//       ? [product.image]
//       : [];
//   const imgSrc =
//     images.length
//       ? images[0]
//       : `https://via.placeholder.com/400x240?text=${encodeURIComponent(
//           product?.name || "Product"
//         )}`;

//   const price =
//     typeof product?.price === "number"
//       ? product.price.toFixed(2)
//       : product?.price ?? "0.00";

//   return (
//     <div className="bg-white/95 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#E2E8F0] overflow-hidden group">

// <div className="bg-white/95 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#E2E8F0] overflow-hidden group">

//   {/* Phone: h-32 | Tablet/Laptop: sm:h-52 */}
//   <div className="relative w-full h-32 sm:h-52 bg-gradient-to-b from-white to-[#F8FAFC] flex items-center justify-center overflow-hidden">
//     <img
//       src={imgSrc}
//       alt={product?.name}
//       className="object-contain max-h-full p-2 sm:p-4 transform group-hover:scale-105 transition duration-300"
//     />
//   </div>

//   {/* Tightest compact spacing */}
//   <div className="p-2 sm:p-5">
    
//     <h3 className="text-sm sm:text-lg font-semibold text-[#1E293B] truncate mb-1">
//       {product?.name}
//     </h3>

//     <p className="text-[#64748B] text-[10px] sm:text-sm mb-1">
//       {product?.category}
//     </p>

//     {typeof product?.stock !== "undefined" && (
//       <p
//         className={`text-[10px] sm:text-sm font-semibold mb-1 ${
//           product.stock > 0 ? "text-[#16A34A]" : "text-[#EF4444]"
//         }`}
//       >
//         {product.stock > 0
//           ? `In stock (${product.stock})`
//           : "Out of stock"}
//       </p>
//     )}

//     <p className="text-[#2D7D9A] font-bold text-sm sm:text-lg mb-2 sm:mb-4">
//       ${price}
//     </p>

//     <div className="flex flex-col gap-1 sm:gap-2">

//       <button
//         onClick={onView}
//         className="w-full bg-white border border-[#E2E8F0] text-[#1E293B] py-1.5 sm:py-2 rounded-lg hover:shadow transition-all duration-300 text-xs sm:text-base"
//       >
//         View Details
//       </button>

//       <button
//         onClick={onAdd}
//         disabled={product?.stock === 0}
//         className={`w-full py-1.5 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-base ${
//           product?.stock === 0
//             ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//             : "bg-[#F9A826] text-[#1E293B] hover:bg-[#3BA8C8]"
//         }`}
//       >
//         Add to Cart
//       </button>

//     </div>
//   </div>
// </div>
//     </div>
//   );
// };

// export default ProductCard;









// src/components/ProductCard.jsx
import React from "react";
import { ShoppingCart, Eye } from "lucide-react";

const ProductCard = ({ product, onAdd = () => {}, onView = () => {} }) => {
  const images =
    product?.images && product.images.length
      ? product.images
      : product?.image
      ? [product.image]
      : [];
  const imgSrc =
    images.length
      ? images[0]
      : `https://via.placeholder.com/400x240?text=${encodeURIComponent(
          product?.name || "Product"
        )}`;

  const price =
    typeof product?.price === "number"
      ? product.price.toFixed(2)
      : product?.price ?? "0.00";

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden group">
      {/* Image Container */}
      <div 
        className="relative w-full h-40 sm:h-56 bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={onView}
      >
        <img
          src={imgSrc}
          alt={product?.name}
          className="object-contain max-h-full p-3 sm:p-4 transform group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView();
              }}
              className="bg-white text-slate-900 px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition"
            >
              <Eye size={16} />
              <span className="text-sm font-medium">Quick View</span>
            </button>
          </div>
        </div>

        {/* Stock Badge */}
        {typeof product?.stock !== "undefined" && (
          <div className="absolute top-2 right-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5">
        {/* Category */}
        {product?.category && (
          <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md mb-2">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <h3 
          className="text-sm sm:text-lg font-semibold text-slate-900 mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] cursor-pointer hover:text-blue-600 transition"
          onClick={onView}
        >
          {product?.name}
        </h3>

        {/* Price */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${price}
            </p>
            {product?.mrp && product.mrp > product.price && (
              <p className="text-xs text-slate-400 line-through">
                ${product.mrp.toFixed(2)}
              </p>
            )}
          </div>
          
          {product?.mrp && product.mrp > product.price && (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
              Save ${(product.mrp - product.price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onView}
            className="flex-1 bg-slate-100 text-slate-900 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-slate-200 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            <span>View</span>
          </button>

          <button
            onClick={onAdd}
            disabled={product?.stock === 0}
            className={`flex-1 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 ${
              product?.stock === 0
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105"
            }`}
          >
            <ShoppingCart size={16} />
            <span>{product?.stock === 0 ? "Sold Out" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;



