/* eslint-disable react/prop-types */
import { useState } from "react";
import SuccessAddProductModal from "./SuccessAddProductModal";
import axios from "axios";

const AddProductModal = ({ onClose, storeId, onAdd }) => {
  // حالة بيانات النموذج
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    price: "",
    productNumber: "", // <-- رقمي المنتج
    length: "",
    height: "",
    width: "",
    weight: "",
    isFragile: false,
    hasLiquid: false,
    isHazardous: false,
    mainImage: null,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showSafetyDetails, setShowSafetyDetails] = useState(false);
  // (Optional) to surface API validation errors:
  const [apiErrors, setApiErrors] = useState({});

  const toggleDetails = () => setShowDetails((p) => !p);
  const toggleSafetyDetails = () => setShowSafetyDetails((p) => !p);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e, field) => {
    setFormData((p) => ({
      ...p,
      [field]: e.target.files[0],
    }));
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiErrors({});

    if (!token) {
      console.error("token is required");
      return;
    }
    console.log(storeId);

    // payload exactly as backend expects
    const payload = {
      storeId: storeId, //"5b5cd692-3dc3-4fae-9b6f-44d7cf000f9b" // or replace with actual dynamic storeId
      productName: formData.productName,
      price: parseFloat(formData.price) || 0,
      productNumber: formData.productNumber,
      productImage: formData.mainImage?.name || "",
      productType: formData.productType,
      Width: parseFloat(formData.width) || 0,
      Height: parseFloat(formData.height) || 0,
      Length: parseFloat(formData.length) || 0,
      weight: parseFloat(formData.weight) || 0,
    };
    console.log(payload);
     try {
      const res = await axios.post(
        "https://troxo.runasp.net/api/Products/Add",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.statusCode === 200 && !res.data.errors) {
        setShowSuccessModal(true);
        onAdd();
      } else if (res.data.errors) {
        console.error("Server validation errors:", res.data.errors);
        setApiErrors(res.data.errors);
      }
      setFormData((prev) => ({
        ...prev,
        productName: "",
        productType: "",
        price: "",
        productNumber: "", // <-- رقمي المنتج
        length: "",
        height: "",
        width: "",
        weight: "",
        isFragile: false,
        hasLiquid: false,
        isHazardous: false,
        mainImage: null,
      }));
    } catch (err) {
      if (err.response?.data?.errors) {
        setApiErrors(err.response.data.errors);
      }
      console.error("API error:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 flex justify-between items-center px-6 py-4 bg-red-50 border-b border-gray-200 z-10">
          <h2 className="text-xl font-bold text-pink-900">إضافة منتج جديد</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            {/* × icon */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-2">
          <div className="mx-auto p-2 font-sans arabic-font" dir="ltr">
            <div className="p-5 rounded-xl bg-gray-50 relative">
              {/* بطاقة بيانات المنتج */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDetails();
                  }}
                  aria-expanded={showDetails}
                  aria-label={showDetails ? "إخفاء التفاصيل" : "إظهار التفاصيل"}
                >
                  <img
                    src="/Icones/ButtonArrowRight.svg"
                    className={`w-6 h-6 md:w-7 md:h-7 transition-transform duration-200 ${
                      showDetails ? "rotate-90" : ""
                    }`}
                    alt=""
                  />
                </button>
                <h3 className="text-lg font-semibold text-[#FC746C] text-right">
                  بطاقة بيانات المنتج
                </h3>
              </div>

              {showDetails && (
                <>
                  <div className="mt-4 flex flex-col-reverse md:flex-row gap-6">
                    {/* Left side: image + quantity */}
                    <div className="md:w-1/2 flex flex-col items-end space-y-4">
                      {/* Image upload */}
                      <div className="relative flex flex-col items-center justify-center bg-white rounded-lg p-6 text-center w-full">
                        <img
                          src="/Icones/imagePlus.png"
                          className="w-10 h-10 absolute left-3 top-3"
                          alt=""
                        />
                        <img
                          src="/Icones/AddImage.png"
                          className="w-10 h-10"
                          alt="add image icon"
                        />
                        <label className="block text-sm font-medium mb-1">
                          أضف صورة رئيسية للمنتج
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                          أسحب الصورة هنا أو انقر للاختيار يدويًا
                        </p>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, "mainImage")}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm cursor-pointer"
                        >
                          اختر ملف
                        </label>
                      </div>
                    </div>

                    {/* Right side: the rest */}
                    <div className="md:w-2/3 space-y-4">
                      {/* Product Name */}
                      <div>
                        <label className="block text-sm mb-2 text-right">
                          اسم المنتج
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <img
                              src="/Icones/box.svg"
                              className="w-5 h-5 text-gray-400"
                              alt="أيقونة منتج"
                            />
                          </div>
                          <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            placeholder="أدخل اسم المنتج"
                            className="w-full px-4 py-2 pr-10 border rounded-lg text-right"
                          />
                        </div>
                      </div>

                      {/* Product Type */}
                      <div className="space-y-2" dir="rtl">
                        <label className="block text-sm mb-2 text-right">
                          نوع المنتج
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <img
                              src="/Icones/MainCategory.svg"
                              className="w-5 h-5 text-gray-400"
                              alt="أيقونة نوع المنتج"
                            />
                          </div>
                          <select
                            name="productType"
                            value={formData.productType}
                            onChange={handleChange}
                            className="w-full px-4 pr-10 py-2 border rounded-lg text-right"
                          >
                            <option value="">نوع المنتج</option>
                            <option value="غذائية">غذائية</option>
                            <option value="معدات">معدات</option>
                          </select>
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-sm mb-2 text-right">
                          السعر
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <img
                              src="/Icones/price.svg"
                              className="w-5 h-5 text-gray-400"
                              alt="أيقونة السعر"
                            />
                          </div>
                          <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="أدخل السعر"
                            className="w-full px-4 py-2 pr-10 border rounded-lg text-right"
                          />
                        </div>
                      </div>

                      {/* Product Number */}
                      <div>
                        <label className="block text-sm mb-2 text-right">
                          رقم المنتج
                        </label>
                        <input
                          type="text"
                          name="productNumber"
                          value={formData.productNumber}
                          onChange={handleChange}
                          placeholder="123456"
                          className="w-full px-4 py-2 border rounded-lg text-right"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dimensions + Weight */}
                  <div className="rounded-xl bg-gray-50 mt-6 mb-2" dir="rtl">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-6">
                      بيانات تخزين المنتج
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Length */}
                      <div>
                        <label className="block text-sm mb-2 text-right">
                          الطول (سم) <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <img
                            src="/Icones/length.svg"
                            className="w-5 h-5 text-gray-400 absolute inset-y-0 right-0 pr-3 pointer-events-none"
                            alt="أيقونة الطول"
                          />
                          <input
                            type="text"
                            name="length"
                            value={formData.length}
                            onChange={handleChange}
                            placeholder="أدخل الطول"
                            className="w-full px-4 py-2 pr-10 border rounded-lg text-right"
                            required
                          />
                        </div>
                      </div>
                      {/* Height */}
                      <div>
                        <label className="block text-sm mb-2 text-right">
                          الارتفاع (سم) <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <img
                            src="/Icones/height.svg"
                            className="w-5 h-5 text-gray-400 absolute inset-y-0 right-0 pr-3 pointer-events-none"
                            alt="أيقونة الارتفاع"
                          />
                          <input
                            type="text"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            placeholder="أدخل الارتفاع"
                            className="w-full px-4 py-2 pr-10 border rounded-lg text-right"
                            required
                          />
                        </div>
                      </div>
                      {/* Width */}
                      <div>
                        <label className="block text-sm mb-2 text-right">
                          العرض (سم) <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <img
                            src="/Icones/width.svg"
                            className="w-5 h-5 text-gray-400 absolute inset-y-0 right-0 pr-3 pointer-events-none"
                            alt="أيقونة العرض"
                          />
                          <input
                            type="text"
                            name="width"
                            value={formData.width}
                            onChange={handleChange}
                            placeholder="أدخل العرض"
                            className="w-full px-4 py-2 pr-10 border rounded-lg text-right"
                            required
                          />
                        </div>
                      </div>
                      {/* Weight */}
                      <div>
                        <label className="block text-sm mb-2 text-right">
                          الوزن (كجم) <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <img
                            src="/Icones/weight.svg"
                            className="w-5 h-5 text-gray-400 absolute inset-y-0 right-0 pr-3 pointer-events-none"
                            alt="أيقونة الوزن"
                          />
                          <input
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder="أدخل الوزن"
                            className="w-full px-4 py-2 pr-10 border rounded-lg text-right"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* بيانات الأمان */}
            <div className="mt-4" dir="rtl">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#FC746C] pb-2">
                  بيانات السلامة والأمان
                </h3>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSafetyDetails();
                  }}
                  aria-expanded={showSafetyDetails}
                  aria-label={
                    showSafetyDetails ? "إخفاء التفاصيل" : "إظهار التفاصيل"
                  }
                >
                  <img
                    src="/Icones/ButtonArrowRight.svg"
                    className={`w-6 h-6 md:w-7 md:h-7 ml-4 transition-transform duration-200 ${
                      showSafetyDetails ? "rotate-90" : ""
                    }`}
                    alt="arrow right icone"
                  />
                </button>
              </div>
              {showSafetyDetails && (
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isFragile"
                      checked={formData.isFragile}
                      onChange={handleChange}
                      className="rounded"
                    />
                    <span>منتج هش (منتجات حساسة)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="hasLiquid"
                      checked={formData.hasLiquid}
                      onChange={handleChange}
                      className="rounded"
                    />
                    <span>المنتج يحتوي على مواد سائلة</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isHazardous"
                      checked={formData.isHazardous}
                      onChange={handleChange}
                      className="rounded"
                    />
                    <span>المنتج يحتوي على مواد خطرة</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              إلغاء الطلب
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-100 text-pink-950 rounded-lg hover:bg-blue-700 transition-colors"
            >
              إضافة منتج
            </button>
          </div>
        </form>

        {/* Success Modal */}
        {showSuccessModal && (
          <SuccessAddProductModal onClose={() => setShowSuccessModal(false)} />
        )}
      </div>
    </div>
  );
};

export default AddProductModal;
