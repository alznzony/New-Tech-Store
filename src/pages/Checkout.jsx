import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, forceClearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const successSound = new Audio("/sounds/success.mp3");

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalWithDelivery = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 500000 ? subtotal : subtotal + 3000;
  };

  const handleSendWhatsApp = () => {
    if (!name || !phone || !address) {
      alert("الرجاء تعبئة جميع الحقول الإلزامية.");
      return;
    }

    const subtotal = calculateSubtotal();
    const deliveryFee = subtotal >= 500000 ? 0 : 3000;
    const total = getTotalWithDelivery();

    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}- ${item.name} × ${item.quantity} = ${
            item.price * item.quantity
          } ج.س`
      )
      .join("\n");

    const message = `
👤 الاسم: ${name}
📞 الهاتف: ${phone}
📞 هاتف آخر: ${altPhone || "لا يوجد"}
📍 العنوان: ${address}
📝 ملاحظات: ${notes || "لا يوجد"}

🛒 الطلب:
${itemsList}

💰 المجموع الفرعي: ${subtotal} ج.س
🚚 رسوم التوصيل: ${deliveryFee} ج.س
✅ الإجمالي الكلي: ${total} ج.س
    `;

    const encodedMessage = encodeURIComponent(message.trim());
    const waNumber = "249916424528";
    const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    successSound.play();
    window.open(waLink, "_blank");
    forceClearCart();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 4000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800 dark:text-gray-100">
      {/* شريط التقدم */}
      <div className="mb-6">
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200 dark:bg-green-900">
            <div
              style={{ width: "100%" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
          </div>
          <p className="text-center text-sm mt-2 text-green-600 dark:text-green-400 font-semibold">
            الخطوة الأخيرة: تأكيد الطلب
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">إتمام الطلب</h2>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="الاسم الكامل *"
            className="w-full p-3 pr-10 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span className="absolute right-3 top-3 text-gray-400">👤</span>
        </div>

        <div className="relative">
          <input
            type="tel"
            placeholder="رقم الهاتف *"
            className="w-full p-3 pr-10 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <span className="absolute right-3 top-3 text-gray-400">📞</span>
        </div>

        <div className="relative">
          <input
            type="tel"
            placeholder="رقم هاتف آخر (اختياري)"
            className="w-full p-3 pr-10 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
            value={altPhone}
            onChange={(e) => setAltPhone(e.target.value)}
          />
          <span className="absolute right-3 top-3 text-gray-400">📱</span>
        </div>

        <textarea
          placeholder="العنوان بالتفصيل *"
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea>

        <textarea
          placeholder="ملاحظات إضافية (اختياري)"
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
          rows="2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">المنتجات:</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">السلة فارغة.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600"
              >
                {item.name} × {item.quantity} = {item.price * item.quantity} ج.س
              </li>
            ))}
          </ul>
        )}

        <div className="bg-gray-100 dark:bg-gray-700 p-4 mt-4 rounded-lg shadow-sm">
          <h4 className="text-md font-bold mb-2">💳 ملخص الفاتورة</h4>
          <p>💰 الإجمالي: {calculateSubtotal()} ج.س</p>
          {calculateSubtotal() < 500000 && <p>🚚 رسوم التوصيل: 3000 ج.س</p>}
          <p className="font-bold text-green-700 dark:text-green-300 mt-2">
            ✅ الإجمالي الكلي: {getTotalWithDelivery()} ج.س
          </p>
        </div>
      </div>

      {submitted && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#16a34a",
            color: "white",
            padding: "1rem 1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            transition: "all 0.5s ease-in-out",
            zIndex: 9999,
          }}
        >
          ✅ تم إرسال الطلب بنجاح!
        </div>
      )}

      <button
        onClick={handleSendWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white w-full py-3 mt-6 rounded text-lg"
      >
        إرسال الطلب عبر واتساب
      </button>
    </div>
  );
};

export default Checkout;
