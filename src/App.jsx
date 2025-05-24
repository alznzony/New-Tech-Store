import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import AdminLogin from "./pages/AdminLogin";
import Supervisor from "./pages/Supervisor";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import Phones from "./pages/Phones";
import Accessories from "./pages/Accessories";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wearables from "./pages/Wearables";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop"; // تم استيراد المكون الجديد

import { CartProvider } from "./context/CartContext";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <CartProvider>
        <Router>
          {/* إضافة مكون ScrollToTop هنا */}
          <ScrollToTop />

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
              {toastMessage}
            </div>
          )}

          {/* الترويسة */}
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* المحتوى */}
          <main className="pt-20 pb-16 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/all-products"
                element={<AllProducts showToast={showToast} />}
              />
              <Route
                path="/phones"
                element={<Phones showToast={showToast} />}
              />
              <Route
                path="/accessories"
                element={<Accessories showToast={showToast} />}
              />
              <Route path="/wearables" element={<Wearables />} />
              <Route
                path="/product/:id"
                element={<ProductDetails showToast={showToast} />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/admin"
                element={<AdminLogin setIsAdmin={setIsAdmin} />}
              />
              <Route
                path="/supervisor"
                element={
                  <ProtectedRoute isAdmin={isAdmin}>
                    <Supervisor />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          {/* التذييل */}
          <Footer />

          {/* الأزرار الثابتة */}
          <WhatsAppButton />
          <ScrollToTopButton />
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
