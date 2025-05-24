import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const categoryOptions = {
  الهواتف: ["آبل", "سامسونج", "هواوي", "سوني", "نوكيا", "ريلمي", "شاومي"],
  الإكسسوارات: ["سمعات", "شواحن", "كفرات", "استيكرات"],
  "الإلكترونيات القابلة للارتداء": [
    "ساعات ذكية",
    "أساور اللياقة",
    "نظارات ذكية",
  ],
};

export default function Supervisor() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    type: "",
    condition: "",
    image: "",
    description: "",
    brand: "",
    specs: "{}", // نص JSON
  });
  const [editId, setEditId] = useState(null);
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
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let parsedSpecs;
    try {
      parsedSpecs = JSON.parse(form.specs);
      if (typeof parsedSpecs !== "object" || Array.isArray(parsedSpecs)) {
        throw new Error();
      }
    } catch {
      alert(
        'صيغة المواصفات غير صحيحة! يجب أن تكون كائن JSON مثل: {"الذاكرة": "128GB"}'
      );
      return;
    }

    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      type: form.type,
      condition: form.condition,
      image: form.image,
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
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      category: "",
      type: "",
      condition: "",
      image: "",
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
      description: product.description,
      brand: product.brand,
      specs: JSON.stringify(product.specs || {}, null, 2),
    });
    setEditId(product.id);
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded shadow p-6 flex flex-col md:flex-row gap-8">
        {/* القسم الأيسر: النموذج */}
        <div className="md:w-1/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editId ? "تعديل المنتج" : "إضافة منتج جديد"}
            </h2>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              title="تسجيل الخروج"
            >
              خروج
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="اسم المنتج"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="rtl"
            />

            <input
              type="number"
              step="0.01"
              placeholder="السعر (مثلاً 3999.00)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="rtl"
            />

            <input
              type="text"
              placeholder="الماركة"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="rtl"
            />

            <input
              type="text"
              placeholder="رابط الصورة"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="ltr"
            />

            <textarea
              placeholder="الوصف"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              dir="rtl"
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value, type: "" })
              }
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="rtl"
            >
              <option value="">اختر الفئة</option>
              {Object.keys(categoryOptions).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
              disabled={!form.category}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              dir="rtl"
            >
              <option value="">اختر النوع</option>
              {currentTypeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <select
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="rtl"
            >
              <option value="">اختر الحالة</option>
              <option value="جديد">جديد</option>
              <option value="مستعمل">مستعمل</option>
            </select>

            <textarea
              placeholder='المواصفات (JSON مثل: {"الذاكرة": "128GB"})'
              value={form.specs}
              onChange={(e) => setForm({ ...form, specs: e.target.value })}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              rows={4}
              dir="ltr"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {editId ? "تحديث المنتج" : "إضافة المنتج"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-400 text-black py-2 rounded hover:bg-gray-500 transition"
                >
                  إلغاء
                </button>
              )}
            </div>
          </form>
        </div>

        {/* القسم الأيمن: قائمة المنتجات */}
        <div className="md:w-2/3 overflow-auto max-h-[75vh]">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">المنتجات</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">لا توجد منتجات حتى الآن.</p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center bg-gray-50 rounded shadow p-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <div className="mr-4 flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {product.brand} - {product.category} - {product.type} -{" "}
                      {product.condition}
                    </p>
                    <p className="text-blue-700 font-bold">
                      {product.price} ر.س
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 transition"
                      title="تعديل"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition text-white"
                      title="حذف"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
