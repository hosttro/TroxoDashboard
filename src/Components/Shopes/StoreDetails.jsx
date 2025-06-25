import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StoreDetails({ store, onDeleted }) {
  const { id, storeName, storePhone, country, cityId, district, address } =
    store;
    const [cityName, setCityName] = useState("");
    const token = localStorage.getItem("token");
  const handleDelete = async () => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذا المتجر؟");
    if (!confirmed) return;
    try {
      await axios.delete(
        `https://troxo.runasp.net/api/Stores/Delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("تم حذف المتجر بنجاح");
      if (onDeleted) onDeleted(); // إعلام الأب لإعادة التحميل
    } catch (err) {
      const msg = err?.response?.data?.message || "فشل حذف المتجر";
      alert(msg);
    }
  };
  useEffect(() => {
    // Fetch city name once
    const fetchCity = async () => {
      try {
        const res = await axios.get(
          `https://troxo.runasp.net/api/Cities/GetById/${cityId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.statusCode === 200 && !res.data.errors) {
          setCityName(res.data.data.nameAr);
        }
      } catch (err) {
        console.error("Failed to load city:", err);
      }
    };
    if (cityId) fetchCity();
  }, [cityId, token]);

  return (
    <div className="border p-4 rounded shadow-sm text-right">
      <h3 className="font-bold text-lg mb-2">{storeName}</h3>
      <p>📞 {storePhone}</p>
      <p>
        📍 {country} - {cityName || "جاري التحميل..."}
      </p>
      <p>🏠 {address}</p>
      <p>📮 الحي : {district}</p>

      <div className="flex justify-end mt-4 gap-2">
        <button
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          حذف
        </button>
        <button
          className="bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300"
          disabled
        >
          تعديل (قريباً)
        </button>
      </div>
    </div>
  );
}

// ✅ تعريف prop types
StoreDetails.propTypes = {
  store: PropTypes.object.isRequired,
  onDeleted: PropTypes.func, // ❓ يستدعي إعادة تحميل المتاجر
};
