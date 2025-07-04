import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product?.id) return;
    addToCart(product);
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition duration-300 relative bg-white dark:bg-gray-800 dark:border-gray-700">
      {/* بادج حالة المنتج */}
      {product.condition && (
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded
            ${
              product.condition === "جديد"
                ? "bg-green-500 text-white"
                : product.condition === "مستعمل"
                ? "bg-yellow-400 text-black"
                : "bg-gray-300 text-black"
            }`}
          dir="rtl"
        >
          {product.condition}
        </span>
      )}

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain rounded bg-white dark:bg-gray-700"
      />
      <h2 className="text-lg font-bold mt-2 text-gray-800 dark:text-gray-100">
        {product.name}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mt-1">
        {product.price.toLocaleString()} ج.س
      </p>

      <div className="flex gap-2 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          عرض التفاصيل
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={handleAddToCart}
        >
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
