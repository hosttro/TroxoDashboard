import { useState, useEffect, useRef } from "react";

import AddProductModal from "./Modal/AddProductModal";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export const ProductSelector = ({ storeId, getProductId, setProduct  , fetchCalcCost}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubDropdown, setShowSubDropdown] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);
  console.log({ selectedProducts });
  console.log({ products });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowSubDropdown(null); // إغلاق قائمة العناصر الفرعية أيضًا
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectSubItem = (product, subItem, e) => {
    e.stopPropagation();
    // overwrite with the product + chosen subItem
    setProduct([{ ...product, selectedSubItem: subItem }]);
    setSelectedProducts([{ ...product, selectedSubItem: subItem }]);
    console.log([{ ...product, selectedSubItem: subItem }]);

    getProductId(product.id);
    // close everything
    setIsOpen(false);
    setShowSubDropdown(null);
  };

  const handleAddNew = () => {
    setIsOpen(false);
    setIsProductModalOpen(true);
  };

  const toggleProduct = (product, e) => {
    e.stopPropagation();
    // overwrite previous selection
    setSelectedProducts([{ ...product }]);
    setProduct([{ ...product }]);
    getProductId(product.id);
    // close menus
    setIsOpen(false);
    setShowSubDropdown(null);
  };

  const toggleSubDropdown = (productId, e) => {
    e.stopPropagation();
    setShowSubDropdown(showSubDropdown === productId ? null : productId);
  };

  const isSubItemActive = (product, subItem) => {
    return selectedProducts.some(
      (p) => p.id === product.id && p.selectedSubItem?.id === subItem.id
    );
  };

  const token = localStorage.getItem("token");
  const getAllProducts = async () => {
    if (!token) {
      console.log("Token is required to fetch products");
      return;
    }
    try {
      const res = await axios.get(
        `https://troxo.runasp.net/api/Products/GetAll?storeId=${storeId || localStorage.getItem("storeId")}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // إذا نجح الاستدعاء، خزّن البيانات في state
      if (res.data.statusCode === 200 && !res.data.errors) {
        setProducts(res.data.data || []);
      } else {
        console.error("API returned errors:", res.data.errors);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  /* أعِدّ تحميل المنتجات عند تغيير storeId */
  useEffect(() => {
    if (!storeId) {
      console.log("storeId is required");
      return;
    }
    getAllProducts();
  }, [storeId]);

  return (
    <div className="relative w-full">
      <button
        className="flex justify-between items-center w-full  text-sm sm:text-base font-semibold "
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <img src="/Icones/box.svg" alt="Box" className="w-6 h-6" />
          <span className="text-zinc-400">
            {selectedProducts.length > 0
              ? `${selectedProducts.map((c) => c.productName)}`
              : "يرجى اختيار المنتج"}
          </span>
        </div>

        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <img
                src="/Icones/search.svg"
                alt="search icone"
                className="w-5 h-5"
              />
            </div>
            <input
              type="text"
              placeholder={`ابحث عن منتج...`}
              className="w-full py-2 pl-4 pr-10 text-sm text-right   "
            />
          </div>
          {products.map((product) => (
            <div key={product.id} className="relative">
              <div
                className="flex items-center p-3 hover:bg-slate-50 cursor-pointer"
                onClick={(e) => {
                  toggleProduct(product, e);
                  getProductId(product.id);
                  fetchCalcCost(1)
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedProducts.some((p) => p.id === product.id)}
                  readOnly
                  className="mr-3 h-4 w-4 text-indigo-600 rounded border-gray-300"
                />
                <span className="text-slate-950">{product.productName}</span>

                {product.subItems && (
                  <button
                    className="ml-auto p-1 text-gray-500 hover:text-gray-700"
                    onClick={(e) => toggleSubDropdown(product.id, e)}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showSubDropdown === product.id ? "rotate-90" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {showSubDropdown === product.id && product.subItems && (
                <div className="ml-4 bg-gray-50 rounded-lg border-t border-gray-100">
                  {product.subItems.map((subItem) => {
                    const active = isSubItemActive(product, subItem);
                    return (
                      <div
                        key={subItem.id}
                        className={`flex gap-3 justify-between items-center p-3 cursor-pointer transition-colors ${
                          active
                            ? "bg-blue-50 border-r-4 border-blue-500 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={(e) => selectSubItem(product, subItem, e)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {subItem.name}
                          </span>
                          {active && (
                            <svg
                              className="w-4 h-4 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            active ? "bg-blue-100 text-blue-800" : "bg-gray-200"
                          }`}
                        >
                          {subItem.quantity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 w-full p-3 bg-red-100 hover:bg-red-200 border-t border-gray-200 transition-colors"
          >
            <img src="/Icones/AddIcone.svg" alt="Add icone" className="w-6" />
            <span className="text-red-800">إضافة منتج جديد</span>
          </button>
        </div>
      )}

      {isProductModalOpen && (
        <AddProductModal
          onClose={() => setIsProductModalOpen(false)}
          storeId={storeId}
          onAdd={getAllProducts}
        />
      )}
    </div>
  );
};

export default ProductSelector;
