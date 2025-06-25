/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SuccessAddStoreModal from "./SuccessAddStoreModal";
import axios from "axios";

export default function AddStoreModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    storeName: "",
    storePhone: "",
    country: "",
    city: "",
    address: "",
    district:'',
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [country,setCountry]=useState([]);
  const filtered = 
  search === ''?
  ''
  :  
  cities.filter((c) =>
    c.nameAr.toLowerCase().includes(search.toLowerCase())
  );
  
  const selectCity = (c) => {
    setFormData((prev) => ({ ...prev, city: c.id }));
    setSearch(c.nameAr);
    setOpen(false);
  };

  // جلب المدن من السيرفر
  const token = localStorage.getItem("token");

  // useEffect(() => {
    // if (!token) return;
    // const apiBase = "https://troxo.runasp.net";
    // axios
      // .get(`${apiBase}/api/Cities/GetAll`, {
        // headers: { Authorization: `Bearer ${token}` },
      // })
      // .then((res) => {
        // setCities(res.data.data || []), console.log(res.data);
      // })
      // .catch((err) => console.error("Failed to load cities:", err));
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ١. تأكد من وجود توكن
    const token = localStorage.getItem("token");
    if (!token) {
      setError("تأكد أنك مسجل دخول أولاً");
      return;
    }

    // ٢. تحقق من ملء جميع الحقول
    const { storeName, phone, city, address } = formData;
    if (!storeName || !phone || !city || !address) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    // let userid;
    // try{
    //   const res = axios.get('https://troxo.runasp.net')
    // }
    // ٣. تجهيز الحمولة بالحقول المطلوبة
    const payload = {
      CityId: city, // معرف الـ GUID للمدينة
      StoreName: storeName, // اسم المتجر
      StorePhone: phone, // رقم الهاتف
      District: "elsalam district",
      Address: address, // العنوان التفصيلي
      // country, // الدولة
    };
    console.log(payload);

    try {
      setLoading(true);
      const apiBase = "https://troxo.runasp.net";
      const res = await axios.post(`${apiBase}/api/Stores/Add`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ٤. تحقق من نتيجة الطلب
      if (res.data.statusCode === 200 && res.data.errors === null) {
        setShowSuccessModal(true);
        onSuccess?.();
      } else {
        const msg = Array.isArray(res.data.errors)
          ? res.data.errors.join(", ")
          : res.data.errors || "خطأ غير معروف";
        setError(`فشل إضافة المتجر: ${msg}`);
      }
    } catch (err) {
      console.error(err);
      const serverMsg = err.response?.data?.message;
      setError(serverMsg || "حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  const GetCitiesByCountryId = async (id) => {
    try {
      const res = await axios.get(
        `https://troxo.runasp.net/api/Cities/GetAllByCountryId/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        setCities(res.data.data)
    } catch (err) {
      console.log(err);
    }
  };

  const getCountry=async()=>{
    try{
      const res=await axios.get(`https://troxo.runasp.net/api/Countries/GetAll`,{
          headers: { Authorization: `Bearer ${token}` },
      })
      console.log(res);
      setCountry(res.data.data);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    getCountry();
    return () => {
    };
  }, []);
  useEffect(() => {
    GetCitiesByCountryId('72bea452-ee24-4843-597b-08dd96d2002a');
    return () => {
    };
  },[]);
  return (
    <div
      className="fixed inset-0 flex justify-center items-center p-4 z-[1000]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 flex justify-between items-center px-6 py-4 bg-red-50 border-b border-gray-200 z-10">
          <h2 id="modal-title" className="text-xl font-bold text-pink-900">
            إضافة متجر جديد
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="إغلاق"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        {/* Content */}
        <div className="p-4">
          <form onSubmit={onSubmit}>
            {/* بيانات المتجر */}
            <section className="p-5 mb-4 bg-gray-50 rounded-xl">
              <h3 className="mb-4 text-lg font-semibold text-[#FC746C]">
                بطاقة بيانات المتجر
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* اسم المتجر */}
                <div>
                  <label
                    htmlFor="storeName"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    اسم المتجر <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="storeName"
                    name="storeName"
                    type="text"
                    placeholder="أدخل اسم المتجر"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                    value={formData.storeName}
                    onChange={handleChange}
                  />
                </div>
                {/* رقم الهاتف */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    رقم الهاتف <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+966"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* العنوان */}
            <section className="p-5 mb-4 bg-gray-50 rounded-xl">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                تفاصيل العنوان
              </h3>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* الدولة */}
                <div>
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    الدولة <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">اختر الدولة</option>
                        <option value={"72bea452-ee24-4843-597b-08dd96d2002a"}>{"السعودية"}</option>
                  </select>
                </div>
                {/* المدينة */}
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    المدينة <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setOpen(true);
                    }}
                    onBlur={() => setOpen(false)}
                    autoComplete="off"
                  />

                  {open && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-auto">
                      {filtered.length > 0 ? (
                        filtered.map((c) => (
                          <li
                            key={c.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onMouseDown={() => selectCity(c)} // onMouseDown to avoid blur race
                          >
                            {c.nameAr}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">
                          لا توجد نتائج
                        </li>
                      )}
                    </ul>
                  )}
                </div>
                {/* الحي */}
                <div>
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    الحي <span className="text-red-600">*</span>
                  </label>
                  <input
                  type="text"
                    id="district"
                    name="district"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                    value={formData.district}
                    onChange={handleChange}
                  />
                </div>
                {/* العنوان الكامل */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    عنوان المتجر <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="أدخل العنوان بالتفصيل"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* رسالة الخطأ */}
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

            {/* أزرار الإجراء */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 font-semibold bg-red-100 text-pink-950 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
              >
                {loading ? "جاري الإضافة..." : "إضافة متجر"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 font-semibold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>

          {/* مودال النجاح */}
          {showSuccessModal && (
            <SuccessAddStoreModal
              onClose={() => {
                setShowSuccessModal(false);
                onClose();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
