import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";

export default function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("الكل");

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", "الإكسسوارات")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setAccessories(data || []);
      } catch (err) {
        console.error("Error fetching accessories:", err);
        setError("فشل تحميل الإكسسوارات. حاول لاحقًا");
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  const displayedAccessories = useMemo(() => {
    let filtered = [...accessories];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(term) ||
          item.description?.toLowerCase().includes(term)
      );
    }

    if (selectedType !== "الكل") {
      filtered = filtered.filter((item) => item.type === selectedType);
    }

    return filtered;
  }, [accessories, searchTerm, selectedType]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("الكل");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg dark:text-white">جاري تحميل الإكسسوارات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <p className="text-lg text-red-500 dark:text-red-400">{error}</p>
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
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">الإكسسوارات</h1>

      {/* فلاتر البحث والنوع */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="ابحث عن إكسسوار..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400"
          dir="rtl"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
          dir="rtl"
        >
          <option value="الكل">الكل</option>
          <option value="سمعات">سمعات</option>
          <option value="شواحن">شواحن</option>
          <option value="كفرات">كفرات</option>
          <option value="استيكرات">استيكرات</option>
        </select>
      </div>

      {displayedAccessories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
            لا توجد إكسسوارات مطابقة لبحثك
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
          {displayedAccessories.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
