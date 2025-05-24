import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          سلة التسوق فارغة
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          لم تقم بإضافة أي منتجات بعد
        </p>
        <Link
          to="/phones"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg inline-block transition-colors"
        >
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        سلة التسوق
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-right border-b dark:border-gray-600">
                المنتج
              </th>
              <th className="p-3 text-right border-b dark:border-gray-600">
                السعر
              </th>
              <th className="p-3 text-center border-b dark:border-gray-600">
                الكمية
              </th>
              <th className="p-3 text-right border-b dark:border-gray-600">
                الإجمالي
              </th>
              <th className="p-3 text-center border-b dark:border-gray-600">
                إزالة
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr
                key={item.id}
                className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item.name}
                  </span>
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {item.price.toLocaleString()} ج.س
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </td>
                <td className="p-3 font-medium text-gray-800 dark:text-gray-200">
                  {(item.price * item.quantity).toLocaleString()} ج.س
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                    aria-label={`حذف ${item.name} من السلة`}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col items-end">
        <div className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          الإجمالي: {total.toLocaleString()} ج.س
        </div>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            إفراغ السلة
          </button>
          <Link
            to="/checkout"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            إتمام الشراء
          </Link>
        </div>
      </div>
    </div>
  );
}
