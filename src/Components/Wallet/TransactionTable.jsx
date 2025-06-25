// import axios from "axios";

// import { useEffect, useState } from "react";



// export default function TransactionTable() {

//   const [transactions, setTransactions] = useState([]);
//   console.log("Transactions:", transactions);
  
//   // const walletid = "aaabe50d-5de7-4ec9-608f-08dda8150359";
//   // const getTransaction = () => {
//   //   const token = localStorage.getItem("token");

   
//   //    axios.get(
//   //       `https://troxo.runasp.net/api/wallet/${walletid}/transactions`,
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     ).then((res) => {
//   //       console.log("Transactions fetched successfully:", res.data);
        

//   //       console.log(res);
        
//   //         if (res.data.statusCodes === 200 && res.data.erorrs !== null) {
//   //           console.log(res.data.data);
//   //           setTransactions(res.data.data);
//   //         }
//   //     }).catch((err) => {
//   //       console.error("Error fetching transactions:", err);
//   //     });
    
//   // };

//     const getTransaction = () => {
//     const token = localStorage.getItem("token");

   
//      axios.get(
//         `https://troxo.runasp.net/api/wallet/transactions?userId=${localStorage.getItem("userId")}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       ).then((res) => {
//         console.log("Transactions fetched successfully:", res.data);
        

//         console.log(res);
//         setTransactions(res.data.data);
        
//           if (res.data.statusCodes === 200 && res.data.erorrs !== null) {
//             console.log(res.data.data);
            
//           }
//       }).catch((err) => {
//         console.error("Error fetching transactions:", err);
//       });
    
//   };
  


 
 
//   useEffect(() => {
//     getTransaction();
//     return () => {};
//   }, []);

//   return (
//     <section className="mt-8 lg:mt-10 px-4 lg:px-0">
//       <h2 className="mb-4 lg:mb-5 text-lg md:text-xl font-semibold text-pink-950 text-right">
//         عمليات المحفظة
//       </h2>

//       <div className="rounded-xl lg:rounded-2xl border border-red-100 bg-slate-50 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full ">
//             <thead>
//               <tr className="bg-red-100">
//                 <th className="p-3 md:p-4 text-sm md:text-base font-semibold text-zinc-800 text-center">
//                   رقم المعاملة
//                 </th>
//                 <th className="p-3 md:p-4 text-sm md:text-base font-semibold text-zinc-800 text-center">
//                   بيان العملية
//                 </th>
//                 <th className="p-3 md:p-4 text-sm md:text-base font-semibold text-zinc-800 text-center">
//                   تاريخ العمليات
//                 </th>
//                 <th className="p-3 md:p-4 text-sm md:text-base font-semibold text-zinc-800 text-center">
//                   رصيد الحركة
//                 </th>
//                 <th className="p-3 md:p-4 text-sm md:text-base font-semibold text-zinc-800 text-center">
//                   رصيد المحفظة
//                 </th>
//               </tr>
//             </thead>
//           <tbody className="divide-y divide-neutral-300">
//   {transactions?.length > 0 ? (
//     transactions.map((transaction, index) => (
//       <tr key={index} className="hover:bg-gray-50 transition-colors">
//         <td className="p-3 md:p-4 text-sm text-blue-950 text-center">
//           {transaction.id}
//         </td>
//         <td className={`p-3 md:p-4 text-sm text-center`}
//         >
//           <div className="flex items-center justify-center gap-1"> 
      

        
//             {transaction.transactionType== 1 ? (
//               <span className="flex items-center gap-1"  >
//                 شحن المحفظة
//                   <img
//               src={
               
//                    "/Icones/Charging.svg"
//               }
//               alt="عملة"
//               className="w-4 h-4"
//             />
//                 </span> 
//                         ) : transaction.transactionType == 2 ? (  
                                       
//                           <span className="flex items-center gap-1">   
                          
//                           انشاء شحنة 
//                           <img
//               src={
               
//                    "/Icones/request.svg"
//               }
//               alt="عملة"
//               className="w-4 h-4"
//             /> 
            
//             </span>
//                                                                  ) : ""}
          
//           </div>
//         </td>
//         <td className="p-3 md:p-4 text-sm text-blue-950 text-center">
//           {transaction.transactionDate.split("T")[0]} -
//           {transaction.transactionDate.split("T")[1].split(".")[0]}
//         </td>

//  <td
//           className={`p-3 md:p-4 text-sm text-center `}
//         >
//           <div className="flex items-center justify-center gap-1">
        
//               {transaction.transactionType== 1 ? (
//               <span className="flex items-center gap-1"  >
//                  {transaction.transactionAmount}
//                   <img
//               src={
               
//                    "/Icones/CurrencyGreen.svg"
//               }
//               alt="عملة"
//               className="w-4 h-4"
//             />
//                 </span> 
//                         ) : transaction.transactionType == 2 ? (  
                                       
//                           <span className="flex items-center gap-1">   
                          
//                         {transaction.transactionAmount}
//                           <img
//               src={
               
//                    "/Icones/CurrencyRed.svg"
//               }
//               alt="عملة"
//               className="w-4 h-4"
//             /> 
            
//             </span>
//                                                                  ) : ""}
//           </div>
//         </td>


//         <td className="p-3 md:p-4 text-sm text-blue-950 text-center">
//           <div className="flex items-center justify-center gap-1">
//             <span>{transaction.balance}</span>
//             <img
//               src="/Icones/Currency.svg"
//               alt="عملة"
//               className="w-4 h-4"
//             />
//           </div>
//         </td>
       
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan="5" className="p-4 text-center text-gray-500">
//         <div className="flex flex-col items-center justify-center py-8">
         
//           <span className="text-sm md:text-base">لا توجد بيانات لعرضها</span>
//         </div>
//       </td>
//     </tr>
//   )}
// </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// }


import axios from "axios";
import { useEffect, useState } from "react";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  console.log("Transactions:", transactions);

  const getTransaction = () => {
    const token = localStorage.getItem("token");

    axios.get(
      `https://troxo.runasp.net/api/wallet/transactions?userId=${localStorage.getItem("userId")}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((res) => {
      console.log("Transactions fetched successfully:", res.data);
      console.log(res);
      setTransactions(res.data.data);
      
      if (res.data.statusCodes === 200 && res.data.erorrs !== null) {
        console.log(res.data.data);
      }
    }).catch((err) => {
      console.error("Error fetching transactions:", err);
    });
  };

  useEffect(() => {
    getTransaction();
    return () => {};
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <section className="mt-8 lg:mt-10 px-4 lg:px-0">
      <h2 className="mb-4 lg:mb-5 text-lg md:text-xl font-semibold text-pink-950 text-right">
        عمليات المحفظة
      </h2>

      <div className="rounded-xl lg:rounded-2xl border border-red-100 bg-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-red-100">
                <th className="p-3 md:p-4 text-sm md:text-base font-semibold text-zinc-800 text-center">
                  رقم المعاملة
                </th>
                <th className="p-3 md:p-4 text-sm md:text-base font-semibold text-zinc-800 text-center">
                  بيان العملية
                </th>
                <th className="p-3 md:p-4 text-sm md:text-base font-semibold text-zinc-800 text-center">
                  تاريخ العمليات
                </th>
                <th className="p-3 md:p-4 text-sm md:text-base font-semibold text-zinc-800 text-center">
                  رصيد الحركة
                </th>
                <th className="p-3 md:p-4 text-sm md:text-base font-semibold text-zinc-800 text-center">
                  رصيد المحفظة
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-300">
              {currentTransactions?.length > 0 ? (
                currentTransactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 md:p-4 text-sm text-blue-950 text-center">
                      p-{transaction.publicId}
                    </td>
                    <td className={`p-3 md:p-4 text-sm text-center`}>
                      <div className="flex items-center justify-center gap-1">
                        {transaction.transactionType == 1 ? (
                          <span className="flex items-center gap-1">
                            شحن المحفظة
                            <img
                              src={"/Icones/Charging.svg"}
                              alt="عملة"
                              className="w-4 h-4"
                            />
                          </span>
                        ) : transaction.transactionType == 2 ? (
                          <span className="flex items-center gap-1">
                            انشاء شحنة
                            <img
                              src={"/Icones/request.svg"}
                              alt="عملة"
                              className="w-4 h-4"
                            />
                          </span>
                        ) : ""}
                      </div>
                    </td>
                    <td className="p-3 md:p-4 text-sm text-blue-950 text-center">
                      {transaction.transactionDate.split("T")[0]} -
                      {transaction.transactionDate.split("T")[1].split(".")[0]}
                    </td>

                    <td className={`p-3 md:p-4 text-sm text-center`}>
                      <div className="flex items-center justify-center gap-1">
                        {transaction.transactionType == 1 ? (
                          <span className="flex items-center text-green-600 gap-1">
                            {transaction.transactionAmount}
                            <img
                              src={"/Icones/CurrencyGreen.svg"}
                              alt="عملة"
                              className="w-4 h-4"
                            />
                          </span>
                        ) : transaction.transactionType == 2 ? (
                          <span className="flex items-center gap-1 text-red-500">
                            {transaction.transactionAmount}
                            <img
                              src={"/Icones/CurrencyRed.svg"}
                              alt="عملة"
                              className="w-4 h-4"
                            />
                          </span>
                        ) : ""}
                      </div>
                    </td>

                    <td className="p-3 md:p-4 text-sm text-blue-950 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span>{transaction.balance}</span>
                        <img
                          src="/Icones/Currency.svg"
                          alt="عملة"
                          className="w-4 h-4"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center py-8">
                      <span className="text-sm md:text-base">لا توجد بيانات لعرضها</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center w-full gap-4 mt-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-black whitespace-nowrap">
          <span>عدد الصفوف في كل صفحة:</span>
          <select 
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-black"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        
        {/* Pagination Info */}
        <div className="text-sm text-gray-600">
          عرض {startIndex + 1}-{Math.min(endIndex, transactions.length)} من أصل {transactions.length}
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
    </section>
  );
}