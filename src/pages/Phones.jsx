import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";

export default function Phones() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("الكل");

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category", "الهواتف")
      .order("created_at", { ascending: false });
    setPhones(data || []);
    setLoading(false);
  };

  const displayedPhones = useMemo(() => {
    let filtered = [...phones];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (phone) =>
          phone.name?.toLowerCase().includes(term) ||
          phone.description?.toLowerCase().includes(term)
      );
    }

    if (selectedCondition !== "الكل") {
      filtered = filtered.filter(
        (phone) => phone.condition === selectedCondition
      );
    }

    return filtered;
  }, [phones, searchTerm, selectedCondition]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCondition("الكل");
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-500">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        الهواتف
      </h1>

      {/* الفلاتر */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="ابحث عن هاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            dir="rtl"
          />

          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            dir="rtl"
          >
            <option value="الكل">الكل</option>
            <option value="جديد">جديد</option>
            <option value="مستعمل">مستعمل</option>
          </select>
        </div>

        {(searchTerm || selectedCondition !== "الكل") && (
          <button
            onClick={resetFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            إعادة تعيين الفلاتر
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-900 dark:text-gray-100">جاري التحميل...</p>
      ) : displayedPhones.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
            لا توجد هواتف مطابقة لبحثك
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPhones.map((phone) => (
            <ProductCard key={phone.id} product={phone} />
          ))}
        </div>
      )}
    </div>
  );
}
