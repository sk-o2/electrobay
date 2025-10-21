import React from "react";

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              {cat}
            </button>
          </li>
        ))}

        {/* "All Products" option */}
        <li className="pt-2 border-t border-gray-200 mt-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === ""
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
          >
            All Products
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CategoryFilter;
