import React, { useEffect, useState } from "react";
import { getLatestProducts } from "../services/productsService";
import ProductCard from "../components/ProductCard";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";

const Home = ({ addToCart, showToast }) => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  // بيانات السلايدر
  const slides = [
    {
      title: "عروض موسم صيف 2025",
      subtitle: "خصومات تصل إلى 40% على أحدث المنتجات",
      link: { href: "/all-products", label: "تسوق الآن" },
      imageUrl:
        "https://modo3.com/thumbs/fit630x300/92369/1593000924/%D9%85%D9%88%D8%B6%D9%88%D8%B9_%D8%B9%D9%86_%D9%81%D8%B5%D9%84_%D8%A7%D9%84%D8%B5%D9%8A%D9%81.jpg",
    },
    {
      title: "أحدث الأجهزة الذكية",
      subtitle: "اكتشف أحدث التقنيات بأفضل الأسعار",
      link: { href: "/phones", label: "تصفح الأجهزة" },
      imageUrl:
        "https://cdn.pixabay.com/photo/2022/09/25/22/25/iphone-7479302_1280.jpg",
    },
    {
      title: "عروض حصرية",
      subtitle: "صفقات خاصة لفترة محدودة فقط",
      link: { href: "/Wearables", label: "اكتشف العروض" },
      imageUrl:
        "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true);
        const products = await getLatestProducts();
        setLatestProducts(products);
      } catch (error) {
        console.error("خطأ في جلب المنتجات الحديثة:", error);
        showToast("حدث خطأ أثناء جلب المنتجات");
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4">
      {/* السلايدر الرئيسي */}
      <section className="mb-8">
        <Slider slides={slides} />
      </section>

      {/* قسم المنتجات الحديثة */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            أحدث المنتجات
          </h2>
          <Link
            to="/all-products"
            className="text-blue-600 text-sm sm:text-base"
          >
            عرض الكل
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">جاري تحميل المنتجات...</p>
          </div>
        ) : latestProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            لا توجد منتجات حالياً
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {latestProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                showToast={showToast}
                compactMode // وضع مضغوط للجوال
              />
            ))}
          </div>
        )}
      </section>

      {/* تصفح حسب الفئة */}
      <section className="my-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-900">
          تصفح حسب الفئة
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {[
            { icon: "📱", label: "الهواتف", link: "/phones" },
            { icon: "🎧", label: "سماعات", link: "/headphones" },
            { icon: "🔋", label: "شواحن", link: "/chargers" },
            { icon: "🔌", label: "باور بانك", link: "/power-banks" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-white p-3 sm:p-4 rounded-lg shadow-sm text-center hover:shadow-md transition"
            >
              <div className="text-3xl sm:text-4xl mb-2">{item.icon}</div>
              <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                {item.label}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ميزات المتجر */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 my-8">
        {[
          {
            icon: "🚚",
            title: "توصيل سريع",
            desc: "توصيل خلال 24-48 ساعة في بورتسودان",
          },
          {
            icon: "🔒",
            title: "دفع آمن",
            desc: "خيارات دفع متعددة وآمنة",
          },
          {
            icon: "🔄",
            title: "ضمان واستبدال",
            desc: "ضمان لمدة عام على جميع المنتجات",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white text-center p-4 sm:p-6 rounded-lg shadow-sm"
          >
            <div className="text-3xl sm:text-4xl mb-3">{feature.icon}</div>
            <h3 className="font-bold mb-1 sm:mb-2 text-gray-800 text-sm sm:text-base">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* العلامات التجارية */}
      <section className="my-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-900">
          العلامات التجارية
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4">
          {["apple", "samsung", "xiaomi", "huawei", "oppo"].map((brand) => (
            <div
              key={brand}
              className="bg-white p-2 sm:p-4 rounded-lg shadow-sm flex justify-center"
            >
              <img
                src={`/img/${brand}-logo.jpg`}
                alt={brand}
                className="h-8 sm:h-12 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* قسم الدعوة للعمل */}
      <section className="my-8 bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 sm:p-10 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            تسوّق بسهولة وسرعة!
          </h2>
          <p className="text-sm sm:text-base mb-4">
            استمتع بتجربة تسوّق سلسة وآمنة، تصفح أفضل المنتجات، واحصل على عروض
            حصرية يوميًا!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
            <Link
              to="/all-products"
              className="bg-white text-blue-900 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-sm sm:text-base"
            >
              تصفح الآن
            </Link>
            <Link
              to="/about"
              className="border border-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-sm sm:text-base"
            >
              عن المتجر
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
