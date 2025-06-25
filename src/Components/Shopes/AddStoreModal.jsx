import { useState } from "react";
import PropTypes from "prop-types"; // ✅ استدعاء PropTypes
import { createStore } from "../../api/storeService";
import SuccessAddStoreModal from "./SuccessAddStoreModal";

export default function AddStoreModal({ onClose }) {
  const [formData, setFormData] = useState({
    storeName: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      storeName,
      phone,
      country,
      city,
      postalCode,
      address
    } = formData;

    if (!storeName || !phone || !country || !city || !postalCode || !address) {
      setError("جميع الحقول مطلوبة");
      return;
    }

    setLoading(true);

    try {
      await createStore(formData);
      setShowSuccessModal(true);
    } catch (err) {
      const msg = err?.response?.data?.message || "فشل إضافة المتجر";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center p-4 z-[1000]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="bg-white rounded-lg shadow-lg z-[1001] w-full max-w-md p-6 text-right">
        <h2 className="text-xl font-bold mb-4">إضافة متجر جديد</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="storeName"
            placeholder="اسم المتجر"
            value={formData.storeName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="رقم الهاتف"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="country"
            placeholder="الدولة"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="المدينة"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="الرمز البريدي"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="العنوان"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-between gap-2">
            <button
              type="button"
              className="w-full bg-gray-300 py-2 rounded"
              onClick={onClose}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className={`w-full py-2 rounded ${loading ? "bg-gray-400" : "bg-[#FFDDDD] hover:bg-gray-200"}`}
              disabled={loading}
            >
              {loading ? "جارٍ الإرسال..." : "إضافة المتجر"}
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <SuccessAddStoreModal onClose={handleCloseSuccess} />
      )}
    </div>
  );
}

// ✅ تعريف PropTypes لتفادي تحذير ESLint
AddStoreModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
