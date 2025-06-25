// src/Pages/Shopes.jsx
import { useEffect, useState } from "react";
import StoreDetails from "../Components/Shopes/StoreDetails"; // ✅ مسار مصحح
import AddStoreModal from "../Components/Shopes/AddStoreModal"; // ✅
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

const Shopes = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ تحميل المتاجر
  const fetchStores = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://troxo.runasp.net/api/Stores/GetAll",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.data);      
      setStores(response.data.data);
    } catch (err) {
      const msg = err?.response?.data?.message || "فشل تحميل المتاجر";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="mx-4 lg:mx-8">
      <div className="mb-6 flex flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">المتاجر</h2>
          <p className="text-sm text-gray-600">
            يمكنك هنا عرض وتحرير المتاجر المرتبطة بحسابك.
          </p>
        </div>
        <button
          className="flex items-center bg-[#FFDDDD] text-black px-4 py-2 rounded hover:bg-gray-200 transition"
          onClick={() => setIsAddModalOpen(true)}
        >
          <IoIosAddCircleOutline className="ml-2 text-lg" />
          إضافة متجر
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">جاري التحميل...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && stores.length === 0 && (
        <p className="text-center text-gray-500">لا توجد متاجر حالياً</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <StoreDetails key={store.id} store={store} onDeleted={fetchStores} />
        ))}
      </div>

      {isAddModalOpen && (
        <AddStoreModal
          onClose={() => {
            setIsAddModalOpen(false);
            fetchStores();
          }}
        />
      )}
    </div>
  );
};

export default Shopes;
