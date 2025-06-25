/* eslint-disable react/prop-types */
import MenuCustomer from "../Menu/MenuCustomer";
import { useState, useRef, useEffect } from "react";
function CustomerTableRow({ customer }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectedRow(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = (rowId) => {
    setSelectedRow(selectedRow === rowId ? null : rowId);
  };
  return (
    <div className="grid grid-cols-12   gap-4 items-center  p-4 border-b border-gray-200 w-full">
      <div className="text-sm col-span-2  md:col-span-4  text-center text-gray-800">
        {customer.id}
      </div>
      <div className="text-sm col-span-2  text-center text-gray-800">
        {customer.customerName}
      </div>
      <div dir="ltr" className="text-sm col-span-2   text-center text-gray-800">
      
        {customer.customerPhone}
      </div>
      <div className="text-sm col-span-3   text-center text-gray-800  ">
        {customer.district} ,  {customer.cityName}, {customer.countryName}
      </div>
      <div
        className="text-center col-span-1  relative "
        ref={dropdownRef}
      >
        <button
          onClick={() => handleMenuToggle(customer.id)}
          className="text-gray-400 hover:text-red-900"
        >
          <svg
            className="w-6 h-6 rotate-90 bg-red-100 rounded-lg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        {selectedRow === customer.id && (
          <div className="absolute left-2 top-full mt-1 z-50">
            <MenuCustomer customerId={customer.id} onClose={() => setSelectedRow(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerTableRow;
