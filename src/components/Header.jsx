import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, X, Moon, Sun } from "lucide-react";
import {
  FaHome,
  FaMobileAlt,
  FaHeadphonesAlt,
  FaUser,
  FaClock,
  FaBoxOpen,
} from "react-icons/fa";
import Navbar from "./Navbar"; // تأكد من أن المسار صحيح
import { useCart } from "../context/CartContext"; // مسار السياق

export default function Header({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { cart } = useCart(); // الحصول على السلة من السياق

  const navItems = [
    { path: "/", icon: <FaHome />, text: "الرئيسية" },
    { path: "/all-products", icon: <FaBoxOpen />, text: "كل المنتجات" },
    { path: "/phones", icon: <FaMobileAlt />, text: "الهواتف" },
    { path: "/accessories", icon: <FaHeadphonesAlt />, text: "الإكسسوارات" },
    {
      path: "/wearables",
      icon: <FaClock />,
      text: "الإلكترونيات القابلة للارتداء",
    },
    { path: "/about", icon: <FaUser />, text: "عن المتجر" },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-50 top-0 border-b dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* الجزء الأيسر: الشعار */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/img/logo.jpg"
            alt="شعار المتجر"
            className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-600"
          />
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            نيو تك
          </span>
        </Link>

        {/* الجزء الأوسط: Navbar */}
        <Navbar />

        {/* الجزء الأيمن: الأدوات */}
        <div className="flex items-center gap-4">
          {/* زر الوضع الليلي */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={darkMode ? "تفعيل الوضع المضيء" : "تفعيل الوضع المظلم"}
          >
            {darkMode ? (
              <Sun className="text-yellow-300" />
            ) : (
              <Moon className="text-gray-700" />
            )}
          </button>

          {/* زر السلة */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {/* زر القائمة الجانبية للجوال */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="فتح القائمة"
          >
            <Menu className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* القائمة الجانبية للجوال */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 z-40 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
            القائمة
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <nav className="p-4 space-y-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                pathname === item.path
                  ? "bg-gray-100 dark:bg-gray-700 font-bold"
                  : ""
              }`}
            >
              <span className="text-gray-700 dark:text-gray-300">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </Link>
          ))}

          {/* زر الوضع الليلي داخل القائمة */}
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <>
                <Sun className="text-yellow-300" />
                <span>الوضع المضيء</span>
              </>
            ) : (
              <>
                <Moon className="text-gray-700" />
                <span>الوضع المظلم</span>
              </>
            )}
          </button>
        </nav>
      </div>

      {/* خلفية تعتيم عند فتح القائمة الجانبية */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
