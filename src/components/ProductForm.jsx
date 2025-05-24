<form
  onSubmit={handleSubmit}
  className="space-y-2 border p-4 rounded bg-gray-50"
>
  {/* اسم المنتج */}
  <input
    type="text"
    placeholder="اسم المنتج"
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
    className="w-full border p-2 rounded"
    required
  />

  {/* السعر */}
  <input
    type="number"
    placeholder="السعر"
    value={form.price}
    onChange={(e) => setForm({ ...form, price: e.target.value })}
    className="w-full border p-2 rounded"
    required
  />

  {/* الماركة */}
  <input
    type="text"
    placeholder="الماركة"
    value={form.brand}
    onChange={(e) => setForm({ ...form, brand: e.target.value })}
    className="w-full border p-2 rounded"
  />

  {/* رابط الصورة */}
  <input
    type="text"
    placeholder="رابط الصورة"
    value={form.image}
    onChange={(e) => setForm({ ...form, image: e.target.value })}
    className="w-full border p-2 rounded"
  />

  {/* الوصف */}
  <textarea
    placeholder="الوصف"
    value={form.description}
    onChange={(e) => setForm({ ...form, description: e.target.value })}
    className="w-full border p-2 rounded"
  />

  {/* الفئة */}
  <select
    value={form.category}
    onChange={(e) => setForm({ ...form, category: e.target.value })}
    className="w-full border p-2 rounded"
    required
  >
    <option value="">اختر الفئة</option>
    <option value="هواتف">هواتف</option>
    <option value="إكسسوارات">إكسسوارات</option>
    <option value="ملحقات">ملحقات</option>
  </select>

  {/* النوع */}
  <select
    value={form.type}
    onChange={(e) => setForm({ ...form, type: e.target.value })}
    className="w-full border p-2 rounded"
  >
    <option value="">اختر النوع</option>
    <option value="samsung">Samsung</option>
    <option value="apple">Apple</option>
    <option value="huawei">Huawei</option>
    <option value="xiaomi">Xiaomi</option>
  </select>

  {/* الحالة */}
  <select
    value={form.condition}
    onChange={(e) => setForm({ ...form, condition: e.target.value })}
    className="w-full border p-2 rounded"
    required
  >
    <option value="">اختر الحالة</option>
    <option value="جديد">جديد</option>
    <option value="مستعمل">مستعمل</option>
  </select>

  {/* المواصفات بصيغة JSON */}
  <textarea
    placeholder='المواصفات (مثال: {"اللون": "أسود", "الرام": "8GB"})'
    value={form.specs}
    onChange={(e) => setForm({ ...form, specs: e.target.value })}
    className="w-full border p-2 rounded"
  />

  {/* زر الإرسال */}
  <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
    {editId ? "تحديث المنتج" : "إضافة المنتج"}
  </button>
</form>;
