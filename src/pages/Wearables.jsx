import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";

export default function Wearables() {
  const [wearables, setWearables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("الكل");

  useEffect(() => {
    const fetchWearables = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", "الإلكترونيات القابلة للارتداء")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setWearables(data || []);
      } catch (err) {
        console.error("Error fetching wearables:", err);
        setError("فشل تحميل المنتجات. حاول مرة أخرى لاحقاً.");
      } finally {
        setLoading(false);
      }
    };

    fetchWearables();
  }, []);

  // تصفية مع البحث والفلترة
  const displayedProducts = wearables.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "الكل" || product.type === selectedType;

    return matchesSearch && matchesType;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("الكل");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">جاري تحميل المنتجات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <p className="text-lg text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        الإلكترونيات القابلة للارتداء
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="ابحث عن منتج..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          dir="rtl"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          dir="rtl"
        >
          <option value="الكل">الكل</option>
          <option value="ساعات ذكية">ساعات ذكية</option>
          <option value="أساور اللياقة">أساور اللياقة</option>
          <option value="نظارات ذكية">نظارات ذكية</option>
        </select>
      </div>

      {displayedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-6">
            لا توجد منتجات متطابقة مع بحثك
          </p>
          <button
            onClick={resetFilters}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="hover:shadow-lg transition-shadow"
            />
          ))}
        </div>
      )}
    </div>
  );
}
