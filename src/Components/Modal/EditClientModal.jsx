import axios from "axios";
import { useEffect, useState } from "react";



export default function EditClientModal({ onClose, customerId }) {
  const [formData, setFormData] = useState({
    clientName: "",
    countryCode: "+966",
    phoneNumber: "",
    country: "",
    city: "",
    postalCode: "",
    district: "",
    address: "",
  });
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [country, setCountry] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);
console.log({country});

  const token = localStorage.getItem("token");

  // const filtered =
  //   search === ""
  //     ? ""
  //     : cities.filter((c) =>
  //         c.nameAr.toLowerCase().includes(search.toLowerCase())
  //       );

  const selectCity = (c) => {
    alert(`تم اختيار المدينة: ${c.nameAr}`);
    console.log({c});
    
    setFormData((prev) => ({ ...prev, city: c.id }));
    setSearch(c.nameAr);
    setOpen(false);
  };
  console.log({formData , customer});
  

  const getCustomerById = async () => {
    try {
      const response = await axios.get(
        `https://troxo.runasp.net/api/Customers/GetById/${customerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const customerData = response.data.data;
      setCustomer(customerData);
      
      // Initialize form data with customer data
      setFormData({
        clientName: customerData.customerName || "",
        countryCode: "+966", // Default value
        phoneNumber: customerData.customerPhone?.replace("+966", "") || "",
        country: customerData.countryId || "",
        city: customerData.cityId || "",
        district: customerData.district || "",
        address: customerData.address || "",
        postalCode: "", // Not used in API but kept for form
      });

      // Set the city search text if cityId exists
      if (customerData.cityId) {
        const cityRes = await axios.get(
          `https://troxo.runasp.net/api/Cities/GetById/${customerData.cityId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (cityRes.data.data) {
          setSearch(cityRes.data.data.nameAr);
        }
      }
    } catch (err) {
      console.error("Error fetching customer:", err);
    }
  };

  useEffect(() => {
    getCustomerById();
  }, [customerId]);

  const GetCitiesByCountryId = async (id) => {
    try {
      const res = await axios.get(
        `https://troxo.runasp.net/api/Cities/GetAllByCountryId/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCities(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCountry = async () => {
    try {
      const res = await axios.get(
        `https://troxo.runasp.net/api/Countries/GetAll`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCountry(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountry();
  }, []);


  useEffect(() => {
    if (formData.country) {
      GetCitiesByCountryId(formData.country);
    }
  }, [formData.country]);

  const handleChange = (e) => {
    console.log("Form data change:", e.target.name, e.target.value);
    
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("تأكد أنك مسجل دخول أولاً");
      return;
    }

    const { clientName, countryCode, phoneNumber, city, district, address } = formData;

    if (!clientName || !phoneNumber || !city || !address) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    
    const payload = {
      id: customerId, // Include customer ID for update
      storeId: customer?.storeId || "", // Keep original storeId
      cityId: city,
      customerName: clientName,
      customerPhone: `${countryCode}${phoneNumber}`,
      district: district,
      address: address,
    };
    console.log({payload});

    setLoading(true);
    try {
      const res = await axios.put(
        "https://troxo.runasp.net/api/Customers/Update",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.statusCode === 200 && !res.data.errors) {
        setShowSuccessModal(true);
      } else {
        const msg = Array.isArray(res.data.errors)
          ? res.data.errors.join(", ")
          : res.data.errors || res.data.message || "فشل تعديل بيانات العميل";
        setError(msg);
      }
    } catch (err) {
      console.error("API error details:", err.response?.data);
      setError(
        err.response?.data?.errors?.join(", ") ||
          err.response?.data?.message ||
          "حدث خطأ أثناء الاتصال بالخادم"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center p-4 z-[1000]"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <header className="sticky top-0 flex justify-between items-center px-6 py-4 bg-red-50 border-b border-gray-200 z-10">
          <h2 className="text-xl font-bold text-pink-900">تعديل بيانات العميل</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="إغلاق النافذة"
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

        <div className="p-4">
          <form onSubmit={handleSubmit}>
            {/* بيانات العميل */}
            <section className="p-5 mb-4 bg-gray-50 rounded-xl">
              <h3 className="mb-4 text-lg font-semibold text-[#FC746C]">
                بطاقة بيانات العميل
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="clientName"
                    className="block mb-2 text-sm font-medium text-gray-700 text-start"
                  >
                    اسم العميل <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="clientName"
                    name="clientName"
                    type="text"
                    required
                    placeholder="أدخل اسم العميل"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.clientName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 text-start ">
                    رقم الهاتف <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2 flex-col md:flex-row">
                    <select
                      name="countryCode"
                      required
                      className="px-3 py-2 border rounded-lg"
                      value={formData.countryCode}
                      onChange={handleChange}
                    >
                      <option value="+966">🇸🇦 +966</option>
                    </select>
                    <div className="relative flex items-center">
                      <img src="/Icones/phone.svg" className="w-5 h-5 absolute inset-y-0 right-1 top-[10px] flex items-center pointer-events-none "  alt="" />
                    <input
                      name="phoneNumber"
                      type="tel"
                      required
                      placeholder="50 123 4567"
                      className="flex-1 pr-8 text-right px-4 py-2 border rounded-lg"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      />
                      </div>
                  </div>
                </div>
              </div>
            </section>

            {/* تفاصيل العنوان */}
            <section className="p-5 mb-6 bg-gray-50 rounded-xl">
              <h3 className="mb-4 text-lg font-semibold text-gray-800 text-start">
                تفاصيل عنوان العميل
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-700 text-start"
                  >
                    الدولة <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.country || customer?.countryName}
                    onChange={handleChange}
                  >
                    <option value="">اختر الدولة</option>
                    {country?.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                
                <div>
  <label
    htmlFor="city"
    className="block mb-2 text-sm font-medium text-gray-700 text-start"
  >
    المدينة <span className="text-red-600">*</span>
  </label>
  <div className="relative">
    <input
      id="city"
      name="city"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      required
      value={search}
      onChange={async (e) => {
        setSearch(e.target.value);
        
        if (formData.country !== "") {
          try {
            const res = await axios.get(
              `https://troxo.runasp.net/api/v2/Cities/SearchByName?searchText=${e.target.value}&countryId=${formData.country}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            setFilteredCities(res.data.data);
          } catch (err) {
            console.error("Error fetching cities:", err);
          }
        }
        
        setOpen(e.target.value !== "");
      }}
      onBlur={() => setTimeout(() => setOpen(false), 200)} // Small delay to allow click
      autoComplete="off"
    />
    {open && (
      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-auto">
        {filteredCities.map((city) => (
          <li
            key={city.id}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onMouseDown={(e) => e.preventDefault()} // Prevent blur
            onClick={() => {
              setFormData(prev => ({ ...prev, city: city.id }));
              setSearch(city.nameAr);
              setOpen(false);
            }}
          >
            {city.nameAr}
          </li>
        ))}
        {filteredCities.length === 0 && search !== "" && (
          <li className="px-4 py-2 text-gray-500">لا توجد نتائج</li>
        )}
      </ul>
    )}
  </div>
</div>



                <div>
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-gray-700 text-start"
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
                <div className="md:col-span-2 lg:col-span-3">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-700 text-start"
                  >
                    عنوان العميل <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    placeholder="أدخل العنوان بالتفصيل"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {error && <p className="mb-4 text-red-500">{error}</p>}

            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-red-100 text-pink-950 rounded-lg hover:bg-red-200 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "جاري الحفظ..." : "حفظ البيانات"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                إلغاء
              </button>
            </div>
          </form>

          {showSuccessModal && (
            <SuccessAddClientModal
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