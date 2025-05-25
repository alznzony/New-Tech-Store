import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer({ darkMode }) {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              نيو تك
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              وجهتك الأولى لأحدث الأجهزة والإكسسوارات التقنية بجودة عالية وأسعار
              تنافسية.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              {[
                { path: "/", text: "الرئيسية" },
                { path: "/phones", text: "الهواتف" },
                { path: "/accessories", text: "الإكسسوارات" },
                { path: "/about", text: "عن المتجر" },
                { path: "/Wearables", text: "الإلكترونيات القابلة للارتداء" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              تواصل معنا
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Mail size={16} />
                <span>newtechsudan0@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>0916424528</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>السودان - بورتسودان</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              تابعنا
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 mt-8 pt-6 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} نيو تك. جميع الحقوق محفوظة</p>
          <p className="text-xs opacity-70">التطوير التقني: حامد محمود</p>
        </div>
      </div>
    </footer>
  );
}
