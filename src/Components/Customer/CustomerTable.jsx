// import CustomerTableRow from "./CustomerTableRow";
// import { useEffect, useState } from "react";
// import AddClientModal from "../Modal/AddClientModal";
// import axios from "axios";

// function CustomerTable() {
//   const [activeModal, setActiveModal] = useState(null);
//   const [isDataViewActive, setIsDataViewActive] = useState(false);
//   const [customers, setCustomers] = useState([]);


//   const toggleDataView = () => {
//     setIsDataViewActive(!isDataViewActive);
//   };

//   const getAllCustomers = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("token is requierd");
//       return;
//     }
//     try {
//       const res = await axios.get(
//         `https://troxo.runasp.net/api/Customers/GetAll/?storeId=${localStorage.getItem("storeId")}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log(res);
//       setCustomers(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     getAllCustomers();
//     return () => {};
//   }, []);

//   return (
//     <article className="flex flex-col w-full p-4 mt-6 bg-white rounded-2xl md:p-6">
//       {/* ✅ Header */}
//       <div className="flex flex-col w-full gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
//         <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
//           العملاء
//         </h2>

//         <div className="flex flex-col w-full gap-6 lg:flex-row lg:items-center lg:w-auto">
//           {/* 🔍 بحث */}
//           <div className="relative w-full lg:w-64">
//             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//               <img src="/Icones/search.svg" className="w-4 h-4" alt="بحث" />
//             </div>
//             <input
//               type="text"
//               className="w-full pr-10 text-sm border border-gray-300 rounded-full py-3 px-5 text-right focus:border-black focus:outline-none"
//               placeholder="ابحث عن العميل..."
//             />
//           </div>
//         </div>
//       </div>

//       {activeModal === "client" && (
//         <AddClientModal onClose={() => setActiveModal(null)} />
//       )}

//       {/* 🧠 تنبيه للمستخدم */}
//       <div className="w-full mb-6 text-sm text-neutral-700">
//         <p className="text-red-400">
//           نستخدم بيانات العملاء لمعرفة عناوينهم وطرق التواصل معهم لتسهيل تسليم
//           الطلبات. يرجى التحقق من التفاصيل التالية قبل إضافة العملاء:
//         </p>
//         <div className="flex items-start gap-2 mt-3 text-neutral-500">
//           <div className="w-2 h-2 mt-1.5 bg-red-400 rounded-full" />
//           <p>
//             في حال عدم وجود مدينة أو منطقة، يمكنك إضافة سجلات جديدة ويجب أن يكون
//             الاسم باللغة الإنجليزية.
//           </p>
//         </div>
//       </div>

//       {/* ✅ جدول البيانات */}
//       <div className="w-full overflow-x-auto">
//         <div className="min-w-full">
//           <div className="grid grid-cols-12 gap-2 px-4 py-3 text-sm font-semibold bg-[#FED5D2] rounded-lg text-zinc-800 sm:gap-4 sm:px-6 sm:py-4">
//             <div className="col-span-2  md:col-span-4 text-center">
//               رقم العميل
//             </div>
//             <div className=" col-span-2  text-center">
//               اسم العميل
//             </div>
//             <div className="col-span-2  text-center">
//               رقم الهاتف
//             </div>
//             <div className="col-span-3  text-center">
//               عنوان العميل
//             </div>
//           </div>
//           <div className="bg-slate-50 rounded-lg">
//             {customers?.map((customer, index) => (
//               <div key={index}>
//                 <CustomerTableRow customer={customer} />
//                 {index < customers.length - 1 && (
//                   <div className="h-px mx-4 bg-neutral-300" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 📄 Pagination */}
//       <div className="flex flex-col items-center w-full gap-4 mt-6 sm:flex-row sm:justify-between">
//         <div className="flex items-center gap-2 text-sm text-black whitespace-nowrap">
//           <span>عدد الصفوف في كل صفحة:</span>
//           <select className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-black">
//             <option value="10">10</option>
//             <option value="20">20</option>
//             <option value="30">30</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <button className="p-2 rounded text-gray-700 transition-colors">
//             <img src="/Icones/ArrowRight.svg" alt="السابق" className="w-4" />
//           </button>
//           <button className="px-3 py-1 rounded bg-gray-100 font-medium hover:bg-red-200 transition-colors">
//             1
//           </button>
//           <button className="p-2 rounded text-gray-700 transition-colors">
//             <img src="/Icones/ArrowLeft.svg" alt="التالي" className="w-4" />
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// export default CustomerTable;

import CustomerTableRow from "./CustomerTableRow";
import { useEffect, useState } from "react";
import AddClientModal from "../Modal/AddClientModal";
import axios from "axios";

function CustomerTable() {
  const [activeModal, setActiveModal] = useState(null);
  const [isDataViewActive, setIsDataViewActive] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const toggleDataView = () => {
    setIsDataViewActive(!isDataViewActive);
  };

  const getAllCustomers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token is requierd");
      return;
    }
    try {
      const res = await axios.get(
        `https://troxo.runasp.net/api/Customers/GetAll/?storeId=${localStorage.getItem("storeId")}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      setCustomers(res.data.data);
      setFilteredCustomers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Search functionality
  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerPhone.includes(searchTerm) ||
      customer.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toString().includes(searchTerm)
    );
    setFilteredCustomers(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, customers]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    getAllCustomers();
    return () => {};
  }, []);

  return (
    <article className="flex flex-col w-full p-4 mt-6 bg-white rounded-2xl md:p-6">
      {/* ✅ Header */}
      <div className="flex flex-col w-full gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
          العملاء
        </h2>

        <div className="flex flex-col w-full gap-6 lg:flex-row lg:items-center lg:w-auto">
          {/* 🔍 بحث */}
          <div className="relative w-full lg:w-64">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <img src="/Icones/search.svg" className="w-4 h-4" alt="بحث" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pr-10 text-sm border border-gray-300 rounded-full py-3 px-5 text-right focus:border-black focus:outline-none"
              placeholder="ابحث عن العميل..."
            />
          </div>
        </div>
      </div>

      {activeModal === "client" && (
        <AddClientModal onClose={() => setActiveModal(null)} />
      )}

      {/* 🧠 تنبيه للمستخدم */}
      <div className="w-full mb-6 text-sm text-neutral-700">
        <p className="text-red-400">
          نستخدم بيانات العملاء لمعرفة عناوينهم وطرق التواصل معهم لتسهيل تسليم
          الطلبات. يرجى التحقق من التفاصيل التالية قبل إضافة العملاء:
        </p>
        <div className="flex items-start gap-2 mt-3 text-neutral-500">
          <div className="w-2 h-2 mt-1.5 bg-red-400 rounded-full" />
          <p>
            في حال عدم وجود مدينة أو منطقة، يمكنك إضافة سجلات جديدة ويجب أن يكون
            الاسم باللغة الإنجليزية.
          </p>
        </div>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="w-full mb-4 text-sm text-gray-600">
          <p>
            عرض {filteredCustomers.length} من أصل {customers.length} عميل
            {searchTerm && ` للبحث: "${searchTerm}"`}
          </p>
        </div>
      )}

      {/* ✅ جدول البيانات */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-12 gap-2 px-4 py-3 text-sm font-semibold bg-[#FED5D2] rounded-lg text-zinc-800 sm:gap-4 sm:px-6 sm:py-4">
            <div className="col-span-2  md:col-span-4 text-center">
              رقم العميل
            </div>
            <div className=" col-span-2  text-center">
              اسم العميل
            </div>
            <div className="col-span-2  text-center">
              رقم الهاتف
            </div>
            <div className="col-span-3  text-center">
              عنوان العميل
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg">
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer, index) => (
                <div key={customer.id}>
                  <CustomerTableRow customer={customer} />
                  {index < currentCustomers.length - 1 && (
                    <div className="h-px mx-4 bg-neutral-300" />
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد عملاء"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📄 Pagination */}
      <div className="flex flex-col items-center w-full gap-4 mt-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-black whitespace-nowrap">
          <span>عدد الصفوف في كل صفحة:</span>
          <select 
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-black"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        {/* Pagination Info */}
        <div className="text-sm text-gray-600">
          عرض {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} من أصل {filteredCustomers.length}
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded transition-colors ${
              currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <img src="/Icones/ArrowRight.svg" alt="السابق" className="w-4" />
          </button>
          
          {/* Page Numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  currentPage === pageNum
                    ? 'bg-red-200 text-red-800'
                    : 'bg-gray-100 hover:bg-red-200'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded transition-colors ${
              currentPage === totalPages 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <img src="/Icones/ArrowLeft.svg" alt="التالي" className="w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default CustomerTable;