import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setAllProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("فشل تحميل المنتجات. يرجى المحاولة لاحقًا");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const displayedProducts = useMemo(() => {
    let result = [...allProducts];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== "الكل") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    return result;
  }, [allProducts, searchTerm, selectedCategory]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("الكل");
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
          كل المنتجات
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              bg-white text-gray-900
              dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400"
            dir="rtl"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              bg-white text-gray-900
              dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400"
            dir="rtl"
          >
            <option value="الكل">الكل</option>
            <option value="الهواتف">الهواتف</option>
            <option value="الإكسسوارات">الإكسسوارات</option>
            <option value="الإلكترونيات القابلة للارتداء">
              الإلكترونيات القابلة للارتداء
            </option>
          </select>
        </div>
      </div>

      {displayedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
            لا توجد منتجات متطابقة مع بحثك
          </p>
          <button
            onClick={resetFilters}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
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
