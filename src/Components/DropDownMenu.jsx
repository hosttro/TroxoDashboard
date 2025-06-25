/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useMemo } from "react";
import AddStoreModal from "./Modal/AddStoreModal";
import AddClientModal from "./Modal/AddClientModal";
import CheckBox from "./CheckBox";

export default function DropdownMenu({
  options,
  placeholder,
  storeId,
  title,
  icon,
  selected,
  isone = false,
  isMulti = false,
  selectedItems = [],
  onSelect,
  onSelectMulti,
  modalToOpen = "store",
  onStoreAdded,
  onClientAdded,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

let [openModal , setOpenModal]=useState(false);
  console.log(storeId);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((o) =>
      o.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const handleSelect = (opt) => {
    if (isMulti) {
      onSelectMulti?.(opt);
    } else {
      onSelect?.(opt);
      setIsOpen(false);
    }
    setSearchTerm("");
  };

  const handleAddNew = () => {
    setIsOpen(false);
    setActiveModal(modalToOpen);

  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchTerm("");
        }}
        className="flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <img
              src={icon}
              alt=""
              className="w-5 h-5 object-contain"
              aria-hidden="true"
            />
          )}
          <span className={!selected ? "text-zinc-400" : "text-blue-950"}>
            {placeholder}
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {/* Search input */}
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
              placeholder={`ابحث عن ${title}...`}
              className="w-full py-2 pl-4 pr-10 text-sm text-right"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Options */}
          {filtered.map((option, index) => (
            <div
              key={index}
              className={`flex items-center px-4 py-2.5 hover:bg-gray-50 cursor-pointer ${
                isMulti && selectedItems.includes(option) ? "bg-blue-50" : ""
              } ${
                isone &&
                (Array.isArray(selected)
                  ? selected.includes(option)
                  : selected === option)
                  ? "bg-blue-50"
                  : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {title === "العميل" && isMulti && (
                <div className="mr-2 " onClick={(e) => e.stopPropagation()}>
                  <CheckBox
                    checked={selectedItems.includes(option)}
                    onChange={() => handleSelect(option)}
                  />
                </div>
              )}
              <span className="flex-1 text-right">{option}</span>
            </div>
          ))}

          {/* Add new */}
          <button
            className="flex items-center gap-2 w-full px-4 py-2.5 border-t border-gray-200 bg-red-100 hover:bg-gray-100 text-neutral-600"
            onClick={()=>{
              console.log({storeId });
              
        if(!storeId || storeId.length ==0 && modalToOpen === "client") {
          setOpenModal(true);
          return;
        }

            handleAddNew()
          
          }}
          >
            <img
              src="/Icones/AddIcone.svg"
              alt="add icon"
              className="w-5 h-5"
            />
            <span>إضافة {title} جديد</span>
          </button>
        </div>
      )}

      {/* Modals */}
      {activeModal === "store" && (
        <AddStoreModal
          onClose={() => setActiveModal(null)}
          onSuccess={() => {
            setActiveModal(null);
            onStoreAdded?.();
          }}
        />
      )}
      {activeModal === "client" && (
        <AddClientModal
          onClose={() => setActiveModal(null)}
          storeId={storeId}
          onSuccess={() => {
            setActiveModal(null);
            onClientAdded?.();
          }}
        />
      )}
    {openModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              خطأ في المتجر
            </h3>
            <p className="text-gray-700 mb-4">
              يرجي التأكد من أنك قمت بإنشاءاو اختيار   متجر أولاً قبل إضافة عميل جديد.
            </p>
            <button
              onClick={() => setOpenModal(false)}
              className="px-4 py-2 bg-red-100 text-pink-950 rounded-lg hover:bg-red-200"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
  
    </div>
  );
}
