import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext"; // استدعاء السياق

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // استخدام دالة الإضافة من السياق

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    setProduct(data);
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (!product?.id) return;
    addToCart(product); // التوست يُعرض من داخل السياق
  };

  if (loading) return <p>جاري التحميل...</p>;
  if (!product) return <p>المنتج غير موجود</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image || "/placeholder-product.jpg"}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{product.brand}</p>
          <p className="text-green-600 font-bold text-2xl mb-6">
            {product.price.toLocaleString()} ج.م
          </p>

          <div className="mb-6">
            <h2 className="font-bold text-xl mb-2">الوصف</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-xl mb-2">المواصفات</h2>
            <ul className="list-disc pl-5">
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium">{key}: </span>
                  {value}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg transition"
          >
            أضف إلى السلة
          </button>
        </div>
      </div>
    </div>
  );
}
