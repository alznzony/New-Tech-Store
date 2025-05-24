import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaMobileAlt,
  FaHeadphonesAlt,
  FaUser,
  FaBoxOpen,
  FaClock, // أيقونة تمثل الـ Wearables مثل الساعات الذكية
} from "react-icons/fa";

export default function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { path: "/", icon: <FaHome />, text: "الرئيسية" },
    { path: "/all-products", icon: <FaBoxOpen />, text: "كل المنتجات" },
    { path: "/phones", icon: <FaMobileAlt />, text: "الهواتف" },
    { path: "/accessories", icon: <FaHeadphonesAlt />, text: "الإكسسوارات" },
    {
      path: "/wearables",
      icon: <FaClock />,
      text: "الإلكترونيات القابلة للارتداء",
    }, // ✅ الإضافة الجديدة
    { path: "/about", icon: <FaUser />, text: "عن المتجر" },
    // { path: "/policy", icon: <FaFileAlt />, text: "سياسة الاستخدام" }, ❌ تم الحذف
  ];
  return (
    <nav className="hidden md:flex items-center justify-center gap-1 mx-auto">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            pathname === item.path
              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white font-bold"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {item.icon}
          <span>{item.text}</span>
        </Link>
      ))}
    </nav>
  );
}
