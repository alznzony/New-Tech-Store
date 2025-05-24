import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setMainImage(product.image || "/placeholder-product.jpg");
    }
  }, [product]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product?.id) return;
    addToCart(product);
  };

  const handleImageHover = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  if (loading)
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-96 w-full bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500">المنتج غير موجود</h2>
        <p className="text-gray-600 mt-2">
          يرجى التحقق من الرابط والمحاولة مرة أخرى
        </p>
      </div>
    );

  // إنشاء مصفوفة تحتوي على جميع الصور
  const allImages = [product.image, ...(product.images || [])].filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* قسم الصور */}
        <div>
          {/* الصورة الرئيسية مع تأثير التكبير */}
          <div
            className="mb-4 border rounded-lg overflow-hidden relative bg-gray-50"
            onMouseMove={handleImageHover}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-96 object-contain transition-transform duration-300 cursor-zoom-in"
              style={zoomStyle}
              key={mainImage}
              onError={(e) => {
                e.target.src = "/placeholder-product.jpg";
              }}
            />
          </div>

          {/* معرض الصور المصغرة */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded-md overflow-hidden transition-all ${
                    mainImage === img
                      ? "border-green-500 ring-2 ring-green-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  aria-label={`عرض الصورة ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} - صورة ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-product.jpg";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* تفاصيل المنتج */}
        <div className="rtl">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-gray-600 text-lg">{product.brand}</p>
            {product.condition && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {product.condition}
              </span>
            )}
          </div>

          <p className="text-green-600 font-bold text-2xl mb-6">
            {product.price?.toLocaleString() || "0"} ج.م
          </p>

          <div className="mb-6">
            <h2 className="font-bold text-xl mb-2">الوصف</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {product.description || "لا يوجد وصف متاح لهذا المنتج."}
            </p>
          </div>

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mb-6">
              <h2 className="font-bold text-xl mb-2">المواصفات</h2>
              <ul className="list-disc pr-5 space-y-1">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-medium">{key}: </span>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg transition w-full md:w-auto flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            أضف إلى السلة
          </button>

          {/* معلومات إضافية */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-600">الفئة</h3>
                <p>{product.category || "-"}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600">النوع</h3>
                <p>{product.type || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
