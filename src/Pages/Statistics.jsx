// /* eslint-disable react/prop-types */
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { NavLink } from "react-router";

// export default function Statistics() {
//   const [selectedStore, setSelectedStore] = useState(null);
//   const [stores, setStores] = useState([]);
//   console.log("Selected Store:", selectedStore);
//     useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     axios
//       .get("https://troxo.runasp.net/api/Stores/GetAll", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setStores(res.data.data || []);

//         if (res.data.data && res.data.data.length > 0) {
//           setSelectedStore(res.data.data[0].name); // Set the first store as default  
//         }
//         console.log("Stores loaded:", res.data.data);
//       })
//       .catch((err) => console.error("Failed to load stores:", err));
//   }, []);
  

//   const handleStoreSelect = (name) => {
//     setSelectedStore(name);
//   };

//   return (
//     <main className="p-4 md:p-8" dir="rtl">
//       <div className="flex flex-col  justify-end gap-2  mb-6">
//         <h2 className="text-2xl text-right font-black text-gray-800">
//           الاحصائيات
//         </h2>
//         <span className="text-sm text-neutral-500">
//           الرئيسية &gt; إحصائيات متجر
//         </span>
//       </div>

//       <section className="p-4 md:p-8 bg-white rounded-2xl">
//         <div className="mb-8">
//           <h3 className="text-right mb-4 text-2xl md:text-3xl font-bold text-gray-800">
//             إحصائيات المتجر
//           </h3>
//           <p className="text-base text-right text-neutral-500">
//             نحتاج منك اختيار المتجر الذي ترغب في عرض الإحصائيات له. من خلال
//             اختيار المتجر المناسب، سنتمكن من تزويدك بأحدث التحليلات والبيانات
//             التي تعكس أداء الشحن الخاص بك.
//           </p>
//         </div>
//         <div className="w-full flex flex-col md:flex-row gap-5 justify-around items-center">
//           <div className="flex flex-col  gap-5 w-full md:w-[400px]">
//             <h4 className="text-xl text-right font-semibold text-slate-900">
//               اختر المتجر لعرض إحصائيات الشحن
//             </h4>

//             <div className="flex flex-col gap-4">
//               {stores.map((store) => (
//                 <StoreOption
//                   key={store.id}
//                   name={store.storeName}
//                   selected={selectedStore === store.storeName}
//                   onClick={() => handleStoreSelect(store.id)}
//                 />
//               ))}
//               {/* Static options for demonstration */}
//               {/* <StoreOption
//                 name="متجر رياضي"
//                 selected={selectedStore === "متجر رياضي"}
//                 onClick={() => handleStoreSelect("متجر رياضي")}
//               /> 
//                <StoreOption
//                 name="متجر ملابس"
//                 selected={selectedStore === "متجر ملابس"}
//                 onClick={() => handleStoreSelect("متجر ملابس")}
//               />
//               <StoreOption
//                 name="متجر ساعات"
//                 selected={selectedStore === "متجر ساعات"}
//                 onClick={() => handleStoreSelect("متجر ساعات")}
//               /> */}
//             </div>
//           </div>
//           <div className="w-full md:w-[400px] self-center">
//             <img
//               src="/Icones/stats.png"
//               alt="Stats image"
//               className="w-full max-w-[300px] mx-auto"
//             />
//           </div>
//         </div>
//         <NavLink
//           to="/home/statistics/statstore"
//           className="flex justify-center items-center mt-6"
//         >
//           <button className="mt-5 h-12 text-lg cursor-pointer  font-semibold bg-red-100 rounded-xl text-pink-950 w-full md:w-[290px]">
//             الخطوة التالية
//           </button>
//         </NavLink>
//       </section>
//     </main>
//   );
// }

// function StoreOption({ name, selected, onClick }) {
//   return (
//     <div
//       className={`flex justify-end gap-4 items-center cursor-pointer p-4 md:p-5 rounded-lg border-2 ${
//         selected ? "bg-red-100 border-pink-950" : "border-zinc-200"
//       }`}
//       onClick={onClick}
//     >
//       <div className="flex gap-3 items-end">
//         <div
//           dangerouslySetInnerHTML={{
//             __html: `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[35px] h-[35px]">...</svg>`,
//           }}
//         />
//         <span className="text-xl md:text-lg font-bold text-slate-900">
//           {name}
//         </span>
//         <img
//           src="/Icones/StoreLogo.png"
//           alt="Store icon"
//           className="w-8 h-8 md:w-10 md:h-10"
//         />
//       </div>
//       <div
//         className={`rounded-full border h-[22px] w-[22px] ${
//           selected ? "bg-pink-950 border-pink-950" : "border-neutral-400"
//         }`}
//       />
//     </div>
//   );
// }


/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Statistics() {
  const [selectedStore, setSelectedStore] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    axios
      .get("https://troxo.runasp.net/api/Stores/GetAll", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const storeData = res.data.data || [];
        setStores(storeData);

        if (storeData.length > 0) {
          // Set the first store as default (using the full store object)
          setSelectedStore(storeData[0].id);
        }
      })
      .catch((err) => console.error("Failed to load stores:", err));
  }, []);

  const handleStoreSelect = (storeId) => {
    setSelectedStore(storeId);
  };

  return (
    <main className="p-4 md:p-8" dir="rtl">
      <div className="flex flex-col justify-end gap-2 mb-6">
        <h2 className="text-2xl text-right font-black text-gray-800">
          الاحصائيات
        </h2>
        <span className="text-sm text-neutral-500">
          الرئيسية &gt; إحصائيات متجر
        </span>
      </div>

      <section className="p-4 md:p-8 bg-white rounded-2xl">
        <div className="mb-8">
          <h3 className="text-right mb-4 text-2xl md:text-3xl font-bold text-gray-800">
            إحصائيات المتجر
          </h3>
          <p className="text-base text-right text-neutral-500">
            نحتاج منك اختيار المتجر الذي ترغب في عرض الإحصائيات له. من خلال
            اختيار المتجر المناسب، سنتمكن من تزويدك بأحدث التحليلات والبيانات
            التي تعكس أداء الشحن الخاص بك.
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5 justify-around items-center">
          <div className="flex flex-col gap-5 w-full md:w-[400px]">
            <h4 className="text-xl text-right font-semibold text-slate-900">
              اختر المتجر لعرض إحصائيات الشحن
            </h4>

            <div className="flex flex-col gap-4">
              {stores.map((store) => (
                <StoreOption
                  key={store.id}
                  name={store.storeName}
                  selected={selectedStore === store.id}
                  onClick={() => handleStoreSelect(store.id)}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-[400px] self-center">
            <img
              src="/Icones/stats.png"
              alt="Stats image"
              className="w-full max-w-[300px] mx-auto"
            />
          </div>
        </div>
        <NavLink
          to={`/home/statistics/statstore/${selectedStore}`}
          className="flex justify-center items-center mt-6"
        >
          <button 
            className="mt-5 h-12 text-lg cursor-pointer font-semibold bg-red-100 rounded-xl text-pink-950 w-full md:w-[290px]"
            disabled={!selectedStore}
          >
            الخطوة التالية
          </button>
        </NavLink>
      </section>
    </main>
  );
}

function StoreOption({ name, selected, onClick }) {
  return (
    <div
      className={`flex justify-end gap-4 items-center cursor-pointer p-4 md:p-5 rounded-lg border-2 ${
        selected ? "bg-red-100 border-pink-950" : "border-zinc-200"
      }`}
      onClick={onClick}
    >
      <div className="flex gap-3 items-end">
        <div
          dangerouslySetInnerHTML={{
            __html: `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[35px] h-[35px]">...</svg>`,
          }}
        />
        <span className="text-xl md:text-lg font-bold text-slate-900">
          {name}
        </span>
        <img
          src="/Icones/StoreLogo.png"
          alt="Store icon"
          className="w-8 h-8 md:w-10 md:h-10"
        />
      </div>
      <div
        className={`rounded-full border h-[22px] w-[22px] ${
          selected ? "bg-pink-950 border-pink-950" : "border-neutral-400"
        }`}
      />
    </div>
  );
}