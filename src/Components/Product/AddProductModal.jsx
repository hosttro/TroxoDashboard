import { useState } from "react";
import PropTypes from "prop-types"; // ✅ التحقق من الخصائص
import { createProduct } from "../../api/productService";

export default function AddProductModal({ onClose }) {
  const [formState, setFormState] = useState({
    name: "",
    type: "",
    price: "",
    quantity: "",
    width: "",
    height: "",
    length: "",
    safety: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    for (const key in formState) {
      formData.append(key, formState[key]);
    }

    try {
      await createProduct(formData);
      setMessage("✅ تم إضافة المنتج بنجاح");
      setFormState({
        name: "",
        type: "",
        price: "",
        quantity: "",
        width: "",
        height: "",
        length: "",
        safety: "",
        image: null,
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message || "❌ فشل في إرسال المنتج، حاول لاحقًا";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 bg-opacity-40 z-[1000] p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg text-right">
        <h2 className="text-xl font-bold mb-4">إضافة منتج جديد</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formState.name} onChange={handleChange} placeholder="اسم المنتج" className="w-full border p-2 rounded" />
          <input name="type" value={formState.type} onChange={handleChange} placeholder="نوع المنتج" className="w-full border p-2 rounded" />
          <input name="price" type="number" value={formState.price} onChange={handleChange} placeholder="السعر" className="w-full border p-2 rounded" />
          <input name="quantity" type="number" value={formState.quantity} onChange={handleChange} placeholder="الكمية" className="w-full border p-2 rounded" />
          <input name="width" type="number" value={formState.width} onChange={handleChange} placeholder="العرض (سم)" className="w-full border p-2 rounded" />
          <input name="height" type="number" value={formState.height} onChange={handleChange} placeholder="الارتفاع (سم)" className="w-full border p-2 rounded" />
          <input name="length" type="number" value={formState.length} onChange={handleChange} placeholder="الطول (سم)" className="w-full border p-2 rounded" />
          <input name="safety" value={formState.safety} onChange={handleChange} placeholder="معايير السلامة" className="w-full border p-2 rounded" />
          <input name="image" type="file" onChange={handleChange} className="w-full border p-2 rounded" />

          {message && (
            <p className={`text-sm ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#4D1A2D] text-white px-4 py-2 rounded"
            >
              {loading ? "جارٍ الإرسال..." : "إضافة المنتج"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ✅ التحقق من الخصائص المطلوبة للمكون
AddProductModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
