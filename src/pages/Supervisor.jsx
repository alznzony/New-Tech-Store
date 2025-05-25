import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const categoryOptions = {
  الهواتف: ["Android", "iOS", "Windows", "HarmonyOS"],
  الإكسسوارات: ["سمعات", "شواحن", "كفرات", "استيكرات"],
  "الإلكترونيات القابلة للارتداء": [
    "ساعات ذكية",
    "أساور اللياقة",
    "نظارات ذكية",
  ],
};

export default function Supervisor() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    type: "",
    condition: "",
    image: "",
    images: "[]",
    description: "",
    brand: "",
    specs: "{}",
  });
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      alert("خطأ في جلب المنتجات: " + error.message);
    } else {
      setProducts(data);
      setFilteredProducts(data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, products]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let parsedSpecs, parsedImages;
    try {
      parsedSpecs = JSON.parse(form.specs);
      parsedImages = JSON.parse(form.images);
      if (!Array.isArray(parsedImages)) {
        throw new Error("يجب أن تكون الصور مصفوفة");
      }
    } catch (err) {
      alert(`خطأ في صيغة البيانات: ${err.message}`);
      return;
    }

    if (!form.image && parsedImages.length === 0) {
      alert("يجب إضافة صورة رئيسية على الأقل");
      return;
    }

    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      type: form.type,
      condition: form.condition,
      image: form.image,
      images: parsedImages,
      description: form.description,
      brand: form.brand,
      specs: parsedSpecs,
    };

    if (editId) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editId);
      if (error) alert("خطأ في تحديث المنتج: " + error.message);
      else alert("تم التحديث بنجاح!");
    } else {
      const { error } = await supabase.from("products").insert([payload]);
      if (error) alert("خطأ في إضافة المنتج: " + error.message);
      else alert("تم إضافة المنتج بنجاح!");
    }

    resetForm();
    fetchProducts();
    setActiveTab("products");
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      category: "",
      type: "",
      condition: "",
      image: "",
      images: "[]",
      description: "",
      brand: "",
      specs: "{}",
    });
    setEditId(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      type: product.type,
      condition: product.condition,
      image: product.image,
      images: JSON.stringify(product.images || []),
      description: product.description,
      brand: product.brand,
      specs: JSON.stringify(product.specs || {}, null, 2),
    });
    setEditId(product.id);
    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) alert("خطأ في حذف المنتج: " + error.message);
      else fetchProducts();
    }
  };

  const currentTypeOptions = categoryOptions[form.category] || [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* الترويسة */}
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">لوحة تحكم المشرف</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              تسجيل الخروج
            </button>
          </div>

          {/* التبويبات */}
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "products"
                  ? "border-white text-white"
                  : "border-transparent text-blue-200 hover:text-white"
              }`}
            >
              عرض المنتجات
            </button>
            <button
              onClick={() => {
                setActiveTab("add");
                resetForm();
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "add"
                  ? "border-white text-white"
                  : "border-transparent text-blue-200 hover:text-white"
              }`}
            >
              {editId ? "تعديل المنتج" : "إضافة منتج جديد"}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "products" && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-800">
                قائمة المنتجات
              </h2>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    dir="rtl"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">جميع الفئات</option>
                  {Object.keys(categoryOptions).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  لا توجد منتجات
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {products.length === 0
                    ? "لم يتم إضافة أي منتجات بعد."
                    : "لا توجد نتائج مطابقة للبحث."}
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setActiveTab("add");
                      resetForm();
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    إضافة منتج جديد
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        الصورة
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        المنتج
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        السعر
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        الفئة
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        النوع
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        الحالة
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.brand}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.price} ر.س
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.condition === "جديد"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {product.condition}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "add" && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {editId ? "تعديل المنتج" : "إضافة منتج جديد"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {editId
                  ? "قم بتعديل بيانات المنتج"
                  : "املأ النموذج لإضافة منتج جديد للمتجر"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المنتج *
                  </label>
                  <input
                    type="text"
                    placeholder="اسم المنتج"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    السعر (ر.س) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="السعر (مثلاً 3999.00)"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الماركة *
                  </label>
                  <input
                    type="text"
                    placeholder="الماركة"
                    value={form.brand}
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الحالة *
                  </label>
                  <select
                    value={form.condition}
                    onChange={(e) =>
                      setForm({ ...form, condition: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    dir="rtl"
                  >
                    <option value="">اختر الحالة</option>
                    <option value="جديد">جديد</option>
                    <option value="مستعمل">مستعمل</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الفئة *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value, type: "" })
                    }
                    required
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    dir="rtl"
                  >
                    <option value="">اختر الفئة</option>
                    {Object.keys(categoryOptions).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {form.category === "الهواتف" ? "نظام التشغيل *" : "النوع *"}
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    required
                    disabled={!form.category}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    dir="rtl"
                  >
                    <option value="">
                      اختر{" "}
                      {form.category === "الهواتف" ? "نظام التشغيل" : "النوع"}
                    </option>
                    {currentTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                        {form.category === "الهواتف" && (
                          <>
                            {" "}
                            {opt === "Android" && "(مثل سامسونج، شاومي، هواوي)"}
                            {opt === "iOS" && "(أجهزة آبل)"}
                            {opt === "HarmonyOS" && "(أجهزة هواوي)"}
                          </>
                        )}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الصورة الرئيسية *
                </label>
                <input
                  type="text"
                  placeholder="رابط الصورة الرئيسية"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الصور الإضافية
                </label>
                <textarea
                  placeholder={`مثال:\nhttps://example.com/image2.jpg\nhttps://example.com/image3.jpg`}
                  value={
                    form.images === "[]"
                      ? ""
                      : JSON.parse(form.images).join("\n")
                  }
                  onChange={(e) => {
                    const imageLinks = e.target.value
                      .split("\n")
                      .map((link) => link.trim())
                      .filter((link) => link !== "");
                    setForm({
                      ...form,
                      images: JSON.stringify(imageLinks),
                    });
                  }}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows={3}
                  dir="ltr"
                />
                <p className="text-xs text-gray-500 mt-1">
                  سطر لكل صورة - سيتم حفظها كصور إضافية للمنتج
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الوصف *
                </label>
                <textarea
                  placeholder="الوصف"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المواصفات (JSON) *
                </label>
                <textarea
                  placeholder='{"الذاكرة": "128GB", "الشاشة": "6.1 بوصة"}'
                  value={form.specs}
                  onChange={(e) => setForm({ ...form, specs: e.target.value })}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows={6}
                  dir="ltr"
                />
                <p className="text-xs text-gray-500 mt-1">
                  يجب أن تكون البيانات بصيغة JSON صحيحة (مفاتيح بين أقواس "")
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setActiveTab("products");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    إلغاء
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editId ? "حفظ التعديلات" : "إضافة المنتج"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
