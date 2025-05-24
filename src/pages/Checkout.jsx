import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalWithDelivery = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 500000 ? subtotal : subtotal + 3000;
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    navigate("/");
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

    window.open(waLink, "_blank");
    clearCart();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">إتمام الطلب</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="الاسم الكامل *"
          className="w-full p-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="رقم الهاتف *"
          className="w-full p-3 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="رقم هاتف آخر (اختياري)"
          className="w-full p-3 border rounded"
          value={altPhone}
          onChange={(e) => setAltPhone(e.target.value)}
        />
        <textarea
          placeholder="العنوان بالتفصيل *"
          className="w-full p-3 border rounded"
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea>
        <textarea
          placeholder="ملاحظات إضافية (اختياري)"
          className="w-full p-3 border rounded"
          rows="2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">المنتجات:</h3>
        {cart.length === 0 ? (
          <p>السلة فارغة.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item, idx) => (
              <li key={idx} className="border p-2 rounded">
                {item.name} × {item.quantity} = {item.price * item.quantity} ج.س
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 text-right">
          <p>💰 الإجمالي: {calculateSubtotal()} ج.س</p>
          {calculateSubtotal() < 500000 && <p>🚚 رسوم الترحيل: 3000 ج.س</p>}
          <p className="font-bold">
            ✅ الإجمالي الكلي: {getTotalWithDelivery()} ج.س
          </p>
        </div>
      </div>

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
