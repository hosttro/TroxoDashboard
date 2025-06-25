


import { useState, useEffect } from "react";
import axios from "axios";
import DropDownMenu from "../DropDownMenu";
import { ProductSelector } from "./../ProductSelector";
import QuantityShipment from "./QuantityShimpent";
import QuantityBox from "./QuantityBox";
import AlertMessage from "./../Alert/AlertMessage";
import { useAppContext } from "../../context/AppContext";





const FormSection = ({ label, children, required }) => (
  <div
    className={`flex mt-4 flex-col ${
      label === "عدد البوكسات" || label === "الكمية" ? "items-start gap-2" : ""
    }`}
  >
    <div className="flex gap-2 self-start">
      <label className="text-sm md:text-base font-semibold text-slate-950">
        {label}
      </label>
      {required && <span className="text-sm text-red-600">*</span>}
    </div>
    {children}
  </div>
);

const SelectSection = ({ label, children, required }) => (
  <div
    className={`flex mt-4 flex-col ${
      label === "عدد البوكسات" || label === "الكمية" ? "items-start gap-2" : ""
    }`}
  >
    <div className="flex gap-2 self-start">
      <label className="text-sm md:text-base font-semibold text-slate-950">
        {label}
      </label>
      {required && <span className="text-sm text-red-600">*</span>}
    </div>
    {children}
  </div>
);

// export default function ShipmentForm({
//   onCallA,
//   onChangeValue,
//   setreCall,
//   reCall,
// }) {
//   const {
//     state: { storeId },
//     dispatch,
//   } = useAppContext();
//   console.log("storeId from context is ", storeId);

//   const [stores, setStores] = useState([]);
//   const [selectedStore, setSelectedStore] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomers, setSelectedCustomers] = useState([]);
//   const [activeDetails, setActiveDetails] = useState(null);
//   const [calcCost, setCalcCost] = useState(0);
//   const [compuny, setCompuny] = useState([]);
//   const [selectedproduct, setSelected_Product] = useState([]);
//   const [errors, setErrors] = useState({
//     storeId: false,
//     customerId: false,
//     ProductsId: false,
//     Height: false,
//     Width: false,
//     Length: false,
//     NumberOfBoxes: false,
//     ChargeableWeight: false
//   });

//   console.log({selectedStore});
  

//   // api payload data
//   const [formData, setFormData] = useState({
//     storeId: "",
//     customerId: "",
//     ProductsId: "",
//     CompanyId: "0196C6D2-6623-49B8-8F7A-4DF4B00864F7",
//     ShipmentType: "DOM",
//     shipmentTackingCode: "123",
//     serviceType: "",
//     Height: 0,
//     Width: 0,
//     Length: 0,
//     NumberOfBoxes: 0,
//     PickupRequired: false,
//     ShipmentCost: 0,
//     ChargeableWeight: 0,
//   });

//   // جلب قائمة المتاجر
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     axios
//       .get("https://troxo.runasp.net/api/Stores/GetAll", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setStores(res.data.data || []);
//         if (res.data.data.length === 1) {
//           const singleStore = res.data.data[0];
//           localStorage.setItem("storeId", singleStore.id);
//           setSelectedStore([singleStore]);
//           setFormData(prev => ({
//             ...prev,
//             storeId: singleStore.id
//           }));
//           dispatch({ type: "SET_STORE_ID", payload: singleStore.id });
//         }
//       })
//       .catch((err) => console.error("Failed to load stores:", err));
//   }, []);

//   // جلب قائمة العملاء
//   useEffect(() => {
//     const getallPRoducts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const currentStoreId = stores.length === 1 ? stores[0].id : storeId;
//         console.log({currentStoreId});
        
//         if (!currentStoreId) return;
        
//         const res = await axios.get(
//           `https://troxo.runasp.net/api/Customers/GetAll?StoreId=${currentStoreId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCustomers(res.data.data || []);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getallPRoducts();
//   }, [storeId, stores]);

//   const validateForm = () => {
//     const newErrors = {
//       storeId: !formData.storeId,
//       customerId: !formData.customerId,
//       ProductsId: !formData.ProductsId,
//       Height: !formData.Height || formData.Height <= 0,
//       Width: !formData.Width || formData.Width <= 0,
//       Length: !formData.Length || formData.Length <= 0,
//       NumberOfBoxes: !formData.NumberOfBoxes || formData.NumberOfBoxes <= 0,
//       ChargeableWeight: !formData.ChargeableWeight || formData.ChargeableWeight <= 0
//     };
    
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(error => error);
//   };

//   const handleStoreSelect = (storeName) => {
//     const store = stores.find((s) => s.storeName === storeName);
//     if (!store) return;
//     console.log({store});
    
//     localStorage.setItem("storeId",store.id )
//     setSelectedStore([store]);
//     setFormData((prev) => ({
//       ...prev,
//       storeId: store.id,
//     }));
//     setErrors(prev => ({...prev, storeId: false}));
//     onChangeValue(store.id);
//     dispatch({ type: "SET_STORE_ID", payload: store.id });
//   };

//   const handleRemoveStore = () => {
//     setSelectedStore([]);
//     setSelectedCustomers([]);
//   };

//   const handleRemoveCustomer = () => setSelectedCustomers([]);
  
//   // تصفية العملاء بناءً على المتجر المحدد أو المتجر الوحيد
//   const filteredCustomers = selectedStore.length
//     ? customers.filter((c) => c.storeId === selectedStore[0].id)
//     : stores.length === 1
//     ? customers.filter((c) => c.storeId === stores[0].id)
//     : [];

//   // اختيار عميل واحد فقط
//  const handleSelectCustomer = (customerName, customerId) => {
//   const cust = filteredCustomers.find((c) => c.customerName === customerName);
//   if (!cust) return;
  
//   // For multi-selection
//   setSelectedCustomers(prev => {
//     // Check if customer is already selected
//     const isSelected = prev.some(c => c.id === cust.id);
    
//     if (isSelected) {
//       // Remove if already selected
//       return prev.filter(c => c.id !== cust.id);
//     } else {
//       // Add if not selected
//       return [...prev, cust];
//     }
//   });
  
//   setFormData(prev => ({
//     ...prev,
//     customerId: cust.id, // Or adjust this if you need multiple IDs
//   }));
  
//   setErrors(prev => ({...prev, customerId: false}));
// };


//   const handleGetProductId = async (id) => {
    
//     setFormData((prev) => ({
//       ...prev,
//       ProductsId: id,
//     }));
//     setErrors(prev => ({...prev, ProductsId: false}));

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.log("token is required");
//         return;
//       }
//       const res = await axios.get(
//         `https://troxo.runasp.net/api/Products/GetById/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log(id);

//       setFormData((prev) => ({
//         ...prev,
//         Length: res.data.data.length,
//         Height: res.data.data.height,
//         Width: res.data.data.width,
//         ChargeableWeight: res.data.data.weight,
//       }));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleGetQuantity = (num) => {
//     if (formData.ProductsId === "") {
//       return;
//     }
    
//     setFormData((prev) => ({
//       ...prev,
//       NumberOfBoxes: num,
//     }));
//     setErrors(prev => ({...prev, NumberOfBoxes: false}));
//     //  fetchCalcCost()
//   };

//   const toggleDetails = (type) =>
//     setActiveDetails(activeDetails === type ? null : type);

//   const fetchCalcCost = async (quantity) => {
//     // alert("جاري حساب التكلفة...");
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     const valid =
//       selectedStore.length > 0 &&
//       selectedproduct.length > 0 &&
//       selectedCustomers.length > 0;
//     if (!valid) return;
//     try {
//       const ratePayload = {
//         Sender: {
//           Id: selectedStore[0].id,
//           Name: selectedStore[0].storeName,
//           FullAddress: selectedStore[0].address,
//           City: selectedStore[0].cityId,
//           CountryCode: selectedStore[0].countryName,
//           PhoneNumber: selectedStore[0].storePhone,
//         },
//         Recipient: {
//           Id: selectedCustomers[0].id,
//           name: selectedCustomers[0].customerName,
//           fullAddress: selectedCustomers[0].address,
//           city: selectedCustomers[0].cityId,
//           countryCode: selectedCustomers[0].countryName,
//           phoneNumber: selectedCustomers[0].customerPhone,
//         },
//         Items: [
//           {
//             ItemId: selectedproduct[0].id,
//             Name: selectedproduct[0].productNumber,
//             Price: {
//               Value: selectedproduct[0].price || 0,
//               CurrencyCode: "SAR",
//             },
//             Dimensions: {
//               Length: selectedproduct[0].length,
//               Width: selectedproduct[0].width,
//               Height: selectedproduct[0].height,
//               Unit: "CM",
//             },
//             Weight: selectedproduct[0].weight,
//             ProductType: "Fragile",
//           },
//         ],
//         PickupFromSender: false,
//         NumberOfPieces: quantity||formData.NumberOfBoxes,
//         Length: formData.Length,
//         Width: formData.Width,
//         Height: formData.Height,
//         TotalWeight: formData.ChargeableWeight,
//         CompanyId: formData.CompanyId
//       };

//       const res = await axios.post(
//         "https://troxo.runasp.net/api/Shipping/calculate-rate",
//         ratePayload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const cost = res.data[0].rate.value;
//       setCalcCost(cost);
//       return cost;
//     } catch (e) {
//       console.error("Failed to calculate rate:", e);
//     }
//   };

//   const handleAddShipment = async () => {
//     if (!validateForm()) {
//       return;
//     } 

//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("token is required"); 
//       return; 
//     }
//     const cost = await fetchCalcCost();

//     const payload = {
//       storeId: formData.storeId,
//       customerId: formData.customerId,
//       ProductId: formData.ProductsId,
//       CompanyId: formData.CompanyId,
//       Height: formData.Height,
//       Width: formData.Width,
//       Length: formData.Length,
//       NumberOfBoxes: formData.NumberOfBoxes,
//       PickupRequired: false,
//       previewRate: cost,
//       ChargeableWeight: formData.ChargeableWeight,
//     };

//     try {
//       const res = await axios.post(
//         "https://troxo.runasp.net/api/Shipments/Create",
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (res.data.statusCode === 201 && res.data.errors === null) {
//         console.log("add successfully", res);
//         setreCall(!reCall);
//         onCallA();
//         setFormData({
//           storeId: stores.length === 1 ? stores[0].id :storeId,
//           customerId: "",
//           ProductsId: "",
//           CompanyId: "0196C6D2-6623-49B8-8F7A-4DF4B00864F7",
//           ShipmentType: "DOM",
//           shipmentTackingCode: "123",
//           serviceType: "",
//           Height: 0,
//           Width: 0,
//           Length: 0,
//           NumberOfBoxes: 0,
//           PickupRequired: false,
//           ShipmentCost: 0,
//           ChargeableWeight: 0,
//         });
//         setSelectedStore(stores.length === 1 ? [stores[0]] : [selectedStore]);
//         setSelectedCustomers([]);
//         setActiveDetails(null);
//         setCalcCost(0);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getComuny = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await axios.get(
//         `https://troxo.runasp.net/api/Companies/GetAll`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCompuny(res.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getComuny();
//   }, []);

//   return (
//     <section
//       className="flex flex-col p-4 md:p-5 w-full rounded-xl bg-slate-50"
//       dir="rtl"
//     >
//       {/* Header */}
//       <div className="flex flex-wrap justify-between items-center gap-4">
//         <h2 className="text-base md:text-lg text-zinc-800">
//           شحنتك معنا تصل بأمان إلى كل مكان..!!
//         </h2>
//       </div>

//       {/* Store Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
//         <div className="space-y-2">
//           <label className="text-sm md:text-base text-zinc-400">المتجر</label>
//           {stores.length === 1 ? (
//             <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border ${
//               errors.storeId ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//             } transition-colors`}>
//               <div className="flex gap-2 items-center">
//                 <img src="/Icones/store.svg" alt="store" />
//                 <span className="text-blue-950">
//                   {stores[0].storeName}
//                 </span>
//               </div>
//             </div>
//           ) : stores.length > 0 ? (
//             <DropDownMenu
//               options={stores.map((s) => s.storeName)}
//               placeholder={
//                 selectedStore.length
//                   ? selectedStore[0].storeName
//                   : "يرجى اختيار المتجر"
//               }
//               icon="/Icones/store.svg"
//               title="المتجر"
//               selected={selectedStore[0]?.storeName ?? null}
//               storeId={selectedStore[0]?.id ?? null}
//               onSelect={handleStoreSelect}
//               isone
//               modalToOpen="store"
//               onStoreAdded={() => {
//                 const token = localStorage.getItem("token");
//                 if (!token) return;
//                 axios
//                   .get("https://troxo.runasp.net/api/Stores/GetAll", {
//                     headers: { Authorization: `Bearer ${token}` },
//                   })
//                   .then((res) => setStores(res.data.data || []))
//                   .catch((err) =>
//                     console.error("Failed to reload stores:", err)
//                   );
//               }}
//             />
//           ) : (
//             <AlertMessage
//               icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bf562eadfe2d8f765faa1b34a91a054e801906ac?placeholderIfAbsent=true&apiKey=33cf6ee4ee4e4cdd8b24ad2c5832d456"
//               title="رسالة تلميح"
//               description="لا توجد متاجر متاحة، يرجى إضافة متجر جديد!"
//             />
//           )}
//           {errors.storeId && (
//             <p className="text-red-500 text-xs mt-1">يجب اختيار المتجر</p>
//           )}
//         </div>

//         {(selectedStore.length > 0 || stores.length === 1) ? (
//           activeDetails === "store" ? (
//             <div className="mt-4 bg-red-50 rounded-2xl p-4">
//               <div className="flex justify-between items-start">
//                 <h3 className="text-sm md:text-base font-semibold text-slate-950">
//                   {selectedStore.length > 0 ? selectedStore[0].storeName : stores[0].storeName}
//                 </h3>
//                 {stores.length > 1 && (
//                   <button
//                     onClick={handleRemoveStore}
//                     className="text-red-500 text-xs hover:text-red-700"
//                   >
//                     إزالة
//                   </button>
//                 )}
//               </div>
//               <div className="grid grid-cols-2 gap-3 mt-2">
//                 <div className="flex items-center gap-2">
//                   <img
//                     src="/Icones/phone.svg"
//                     alt="phone"
//                     className="w-4 h-4"
//                   />
//                   <span className="text-xs md:text-sm">الهاتف</span>
//                 </div>
//                 <p className="text-xs md:text-sm text-gray-500">
//                   {selectedStore.length > 0 ? selectedStore[0].storePhone : stores[0].storePhone}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <img
//                     src="/Icones/Location.svg"
//                     alt="location"
//                     className="w-4 h-4"
//                   />
//                   <span className="text-xs md:text-sm">العنوان</span>
//                 </div>
//                 <p className="text-xs md:text-sm text-gray-500">
//                   {selectedStore.length > 0 ? selectedStore[0].address : stores[0].address}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <img
//                     src="/Icones/Location.svg"
//                     alt="phone"
//                     className="w-4 h-4"
//                   />
//                   <span className="text-xs md:text-sm">البلد</span>
//                 </div>
//                 <p className="text-xs md:text-sm text-gray-500">
//                   {selectedStore.length > 0 ? selectedStore[0].countryName : stores[0].countryName}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <img
//                     src="/Icones/Location.svg"
//                     alt="phone"
//                     className="w-4 h-4"
//                   />
//                   <span className="text-xs md:text-sm">المدينة</span>
//                 </div>
//                 <p className="text-xs md:text-sm text-gray-500">
//                   {selectedStore.length > 0 ? selectedStore[0].cityName : stores[0].cityName}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <img
//                     src="/Icones/Location.svg"
//                     alt="phone"
//                     className="w-4 h-4"
//                   />
//                   <span className="text-xs md:text-sm">الحي</span>
//                 </div>
//                 <p className="text-xs md:text-sm text-gray-500">
//                   {selectedStore.length > 0 ? selectedStore[0].district : stores[0].district}
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <div className="mt-6 flex justify-between items-center">
//               <h4 className="text-sm md:text-base font-semibold text-slate-950 mb-2">
//                 تفاصيل المتجر
//               </h4>
//               <button
//                 onClick={() => toggleDetails("store")}
//                 className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
//               >
//                 <img
//                   src="/Icones/ArrowRight.svg"
//                   alt="arrow right"
//                   className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
//                     activeDetails === "store" ? "rotate-90" : ""
//                   }`}
//                 />
//               </button>
//             </div>
//           )
//         ) : (
//           <AlertMessage
//             icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bf562eadfe2d8f765faa1b34a91a054e801906ac?placeholderIfAbsent=true&apiKey=33cf6ee4ee4e4cdd8b24ad2c5832d456"
//             title="رسالة تلميح"
//             description="أضف متجرك الآن لعرض تفاصيله الكاملة!"
//           />
//         )}
//       </div>

//       {/* Customer Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
//         <div className="space-y-2">
//           <label className="text-sm md:text-base text-zinc-400">العميل</label>
//         <DropDownMenu
//   options={filteredCustomers.map((c) => c.customerName)}
//   placeholder={
//     selectedCustomers.length
//       ? selectedCustomers.map((c) => c.customerName).join(", ")
//       : "يرجى اختيار العميل"
//   }
//   icon="/Icones/Profile.svg"
//   title="العميل"
//   storeId={selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : []}
//   selectedItems={selectedCustomers.map((c) => c.customerName)}
//   onSelectMulti={(optionName) => {
//     // Find the full customer data to get both name and ID
//     const customer = filteredCustomers.find(c => c.customerName === optionName);
//     if (customer) {
//       handleSelectCustomer(customer.customerName, customer.id);
//     }
//   }}
//   isMulti
//   modalToOpen="client"
//   onClientAdded={() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     const currentStoreId = selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : storeId;
//     axios
//       .get(
//         `https://troxo.runasp.net/api/Customers/GetAll?StoreId=${currentStoreId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => setCustomers(res.data.data || []))
//       .catch((err) => console.error("Failed to reload customers:", err));
//   }}
// />
//           {errors.customerId && (
//             <p className="text-red-500 text-xs mt-1">يجب اختيار العميل</p>
//           )}
//         </div>
//         {selectedCustomers.length ? (
//           activeDetails === "client" ? (
//             <div className="mt-4">
//               {selectedCustomers.map((cust, index) => (
//                 <div
//                   key={index}
//                   className="bg-red-50 rounded-2xl mt-4 p-4 transition-all"
//                 >
//                   <div className="flex justify-between items-start">
//                     <h3 className="text-sm md:text-base font-semibold text-slate-950">
//                       {cust.customerName}
//                     </h3>
//                     <button
//                       onClick={handleRemoveCustomer}
//                       className="text-red-500 text-xs"
//                     >
//                       إزالة
//                     </button>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3 mt-2">
//                     <div className="flex items-center gap-2">
//                       <img
//                         src="/Icones/phone.svg"
//                         alt="phone"
//                         className="w-4 h-4"
//                       />
//                       <span className="text-xs md:text-sm">الهاتف</span>
//                     </div>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {cust.customerPhone}
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <img
//                         src="/Icones/Location.svg"
//                         alt="location"
//                         className="w-4 h-4"
//                       />
//                       <span className="text-xs md:text-sm">العنوان</span>
//                     </div>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {cust.address}
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <img
//                         src="/Icones/Location.svg"
//                         alt="location"
//                         className="w-4 h-4"
//                       />
//                       <span className="text-xs md:text-sm">البلد</span>
//                     </div>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {cust.address}
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <img
//                         src="/Icones/Location.svg"
//                         alt="location"
//                         className="w-4 h-4"
//                       />
//                       <span className="text-xs md:text-sm">المدينة</span>
//                     </div>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {cust.address}
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <img
//                         src="/Icones/Location.svg"
//                         alt="location"
//                         className="w-4 h-4"
//                       />
//                       <span className="text-xs md:text-sm">الحي</span>
//                     </div>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {cust.address}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="mt-6 flex justify-between items-center">
//               <h4 className="text-sm md:text-base font-semibold text-slate-950 mb-2">
//                 تفاصيل العميل
//               </h4>
//               <button
//                 onClick={() => toggleDetails("client")}
//                 className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
//               >
//                 <img
//                   src="/Icones/ArrowRight.svg"
//                   alt="arrow right"
//                   className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
//                     activeDetails === "client" ? "rotate-90" : ""
//                   }`}
//                 />
//               </button>
//             </div>
//           )
//         ) : (
//           <div className="w-full p-4 md:p-6 text-center text-sm md:text-base font-semibold bg-gray-100 rounded-2xl text-neutral-400">
//             لا توجد تفاصيل عميل لعرضها
//           </div>
//         )}
//       </div>

//       {/* Product Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
//         <FormSection label="المنتج" required>
//           <div className={`flex justify-between items-center p-3 bg-white rounded-lg border ${
//             errors.ProductsId ? "border-red-500" : "border-neutral-400"
//           }`}>
//             <ProductSelector
//               modalToOpen="product"
//               storeId={selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : localStorage.getItem("storeId")}
//               getProductId={handleGetProductId}
//               setProduct={setSelected_Product}
//             />
//           </div>
//           {errors.ProductsId && (
//             <p className="text-red-500 text-xs mt-1">يجب اختيار المنتج</p>
//           )}
//         </FormSection>
//         <FormSection label="التقاط">
//           <div className="flex items-center gap-2 mt-6">
//             <input
//               type="checkbox"
//               id="pickup"
//               className="w-5 h-5 bg-white rounded border border-neutral-400"
//             />
//             <label
//               htmlFor="pickup"
//               className="text-sm md:text-base text-gray-500"
//             >
//               استلام الشحنة من المرسل
//             </label>
//           </div>
//         </FormSection>
//       </div>

     
//       <div className="flex justify-between items-center">
//         <h3 className="mt-6 md:mt-8 text-base md:text-lg text-zinc-800">
//           تفاصيل الشحنة (الطول، الارتفاع، العرض)
//         </h3>
//         <button
//           onClick={() => toggleDetails("shipment")}
//           className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
//         >
//           <img
//             src="/Icones/ArrowRight.svg"
//             alt="arrow right"
//             className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
//               activeDetails === "shipment" ? "rotate-90" : ""
//             }`}
//           />
//         </button>
//       </div>
//       {activeDetails === "shipment" && (
//         <div className="space-y-6">
//           {/* أبعاد الشحنة */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {/* الطول */}
//             <FormSection label="الطول (سم)" required>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.Length ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img
//                   src="/Icones/length.svg"
//                   alt="length"
//                   className="w-5 h-5 opacity-70"
//                 />
//                 <input
//                   type="number"
//                   placeholder="ادخل الطول"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="1"
//                   value={formData.Length}
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       Length: parseFloat(e.target.value),
//                     }));
//                     setErrors(prev => ({...prev, Length: false}));
//                   }}
//                 />
//               </div>
//               {errors.Length && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال الطول</p>
//               )}
//             </FormSection>
//             {/* الارتفاع */}
//             <FormSection label="الارتفاع (سم)" required>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.Height ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img
//                   src="/Icones/height.svg"
//                   alt="height"
//                   className="w-5 h-5 opacity-70"
//                 />
//                 <input
//                   type="number"
//                   placeholder="ادخل الارتفاع"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="1"
//                   value={formData.Height}
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       Height: parseFloat(e.target.value),
//                     }));
//                     setErrors(prev => ({...prev, Height: false}));
//                   }}
//                 />
//               </div>
//               {errors.Height && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال الارتفاع</p>
//               )}
//             </FormSection>
//             {/* العرض */}
//             <FormSection label="العرض (سم)" required>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.Width ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img
//                   src="/Icones/width.svg"
//                   alt="width"
//                   className="w-5 h-5 opacity-70"
//                 />
//                 <input
//                   type="number"
//                   placeholder="ادخل العرض"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="1"
//                   value={formData.Width}
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       Width: parseFloat(e.target.value),
//                     }));
//                     setErrors(prev => ({...prev, Width: false}));
//                   }}
//                 />
//               </div>
//               {errors.Width && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال العرض</p>
//               )}
//             </FormSection>
//             {/* الوزن */}
//             <FormSection label="الوزن (كجم)" required>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.ChargeableWeight ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img
//                   src="/Icones/weight.svg"
//                   alt="weight"
//                   className="w-5 h-5 opacity-70"
//                 />
//                 <input
//                   type="number"
//                   placeholder="ادخل الوزن"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="0.1"
//                   step="0.1"
//                   value={formData.ChargeableWeight}
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       ChargeableWeight: parseFloat(e.target.value),
//                     }));
//                     setErrors(prev => ({...prev, ChargeableWeight: false}));
//                   }}
//                 />
//               </div>
//               {errors.ChargeableWeight && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال الوزن</p>
//               )}
//             </FormSection>

//                <FormSection label="عدد البوكسات">
//         <QuantityBox 
//           getQuantity={handleGetQuantity}
//           hasError={errors.NumberOfBoxes}
//          fetchCalcCost={fetchCalcCost}
//           value={formData.NumberOfBoxes}
//         />
//         {errors.NumberOfBoxes && (
//           <p className="text-red-500 text-xs mt-1">يجب إدخال عدد البوكسات</p>
//         )}
//       </FormSection>
//                        {/* نوع الشحنة */}
// <SelectSection label="نوع الشحنة" required>
//   <div className="relative w-full">
//     <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 transition-colors`}>
//       <div className="flex gap-2 items-center">
//         <img src="/Icones/ShipmentsIcone.svg" alt="shipment type" />
//         <span className="text-blue-950">جاف</span>
//       </div>
  
//     </div>
//     <input type="hidden" name="ShipmentType" value="DOM" />
//   </div>
// </SelectSection>
//             {/* شركة الشحن */}
// <SelectSection label="شركة الشحن" required>
//   <div className="relative w-full">
//     {compuny.length === 1 ? (
//       <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 transition-colors`}>
//         <div className="flex gap-2 items-center">
//           <img src="/Icones/ShipmentsIcone.svg" alt="shipment" />
//           <span className="text-blue-950">
//             {compuny[0].companyName}
//           </span>
//         </div>
//             <p dir="ltr" className="">     <span className="text-red-500"> {calcCost}</span>   <span className="text-black">SAR</span>  </p>
//       </div>
//     ) : (
//       <>
//         {/* الأيقونة الثابتة */}
//         <img
//           src="/Icones/ShipmentsIcone.svg"
//           alt="shipment icon"
//           className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
//         />
//         {/* عنصر الـ select الأصلي مع تعديلات بسيطة */}
//         <select 
//           className="w-full p-3 pl-10 pr-8 bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 appearance-none cursor-pointer"
//           onChange={(e) =>
//             setFormData((prev) => ({
//               ...prev,
//               CompanyId: e.target.value,
//             }))
//           }
//           value={formData.CompanyId}
//         >
//           <option value="" className="text-neutral-400">
//             اختر الشركة
//           </option>
//           {compuny?.map((item, index) => (
//             <option key={index} value={item.id}>
//               {item.companyName}
//             </option>
//           ))}
//         </select>
//         <img
//           src="/images/AarrowDown.svg"
//           alt="arrow"
//           className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
//         />
//       </>
//     )}
//   </div>
// </SelectSection>
//           </div>
//         </div>
//       )}
//       <button
//         onClick={handleAddShipment}
//         className="px-4 py-2 self-center mt-4 cursor-pointer md:px-6 md:py-4 text-sm md:text-base font-extrabold bg-red-100 text-pink-950 rounded-xl w-full sm:w-auto min-w-[200px]"
//       >
//         إضافة شحنة
//       </button>
//     </section>
//   );
// }





export default function ShipmentForm({
  onCallA,
  onChangeValue,
  setreCall,
  reCall,
}) {
  const {
    state: { storeId },
    dispatch,
  } = useAppContext();

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [activeDetails, setActiveDetails] = useState(null);
  const [calcCost, setCalcCost] = useState(0);
  const [compuny, setCompuny] = useState([]);
  const [selectedproduct, setSelected_Product] = useState([]);
  const [errors, setErrors] = useState({
    storeId: false,
    customerId: false,
    ProductsId: false,
    Height: false,
    Width: false,
    Length: false,
    NumberOfBoxes: false,
    ChargeableWeight: false
  });

  const [formData, setFormData] = useState({
    storeId: "",
    customerId: "",
    ProductsId: "",
    CompanyId: "0196C6D2-6623-49B8-8F7A-4DF4B00864F7",
    ShipmentType: "DOM",
    shipmentTackingCode: "123",
    serviceType: "",
    Height: 0,
    Width: 0,
    Length: 0,
    NumberOfBoxes: 1,
    PickupRequired: false,
    ShipmentCost: 0,
    ChargeableWeight: 0,
  });

  // Fetch stores
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get("https://troxo.runasp.net/api/Stores/GetAll", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStores(res.data.data || []);
        if (res.data.data.length === 1) {
          const singleStore = res.data.data[0];
          localStorage.setItem("storeId", singleStore.id);
          setSelectedStore([singleStore]);
          setFormData(prev => ({
            ...prev,
            storeId: singleStore.id
          }));
          dispatch({ type: "SET_STORE_ID", payload: singleStore.id });
        }
      })
      .catch((err) => console.error("Failed to load stores:", err));
  }, []);

  // Fetch customers
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const currentStoreId = stores.length === 1 ? stores[0].id : storeId;
        if (!currentStoreId) return;
        
        const res = await axios.get(
          `https://troxo.runasp.net/api/Customers/GetAll?StoreId=${currentStoreId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCustomers(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    getCustomers();
  }, [storeId, stores]);

  // Fetch companies
  useEffect(() => {
    const getCompanies = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `https://troxo.runasp.net/api/Companies/GetAll`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCompuny(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCompanies();
  }, []);

  console.log({compuny});
  

  useEffect(() => {
    if(selectedproduct.length > 0 && formData.ProductsId) {
      fetchCalcCost(formData.NumberOfBoxes);
    }
  }, [selectedproduct, formData.ProductsId, formData.NumberOfBoxes]);

  const validateForm = () => {
    const newErrors = {
      storeId: !formData.storeId,
      customerId: selectedCustomers.length === 0,
      ProductsId: !formData.ProductsId,
      Height: !formData.Height || formData.Height <= 0,
      Width: !formData.Width || formData.Width <= 0,
      Length: !formData.Length || formData.Length <= 0,
      NumberOfBoxes: !formData.NumberOfBoxes || formData.NumberOfBoxes <= 0,
      ChargeableWeight: !formData.ChargeableWeight || formData.ChargeableWeight <= 0
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleStoreSelect = (storeName) => {
    const store = stores.find((s) => s.storeName === storeName);
    if (!store) return;
    
    localStorage.setItem("storeId", store.id);
    setSelectedStore([store]);
    setFormData((prev) => ({
      ...prev,
      storeId: store.id,
    }));
    setErrors(prev => ({...prev, storeId: false}));
    onChangeValue(store.id);
    dispatch({ type: "SET_STORE_ID", payload: store.id });
  };

  const handleRemoveStore = () => {
    setSelectedStore([]);
    setSelectedCustomers([]);
  };

  const handleRemoveCustomer = () => setSelectedCustomers([]);
  
  const filteredCustomers = selectedStore.length
    ? customers.filter((c) => c.storeId === selectedStore[0].id)
    : stores.length === 1
    ? customers.filter((c) => c.storeId === stores[0].id)
    : [];

  const handleSelectCustomer = (customerName) => {
    const cust = filteredCustomers.find((c) => c.customerName === customerName);
    if (!cust) return;
    
    setSelectedCustomers(prev => {
      const isSelected = prev.some(c => c.id === cust.id);
      const updatedCustomers = isSelected 
        ? prev.filter(c => c.id !== cust.id) 
        : [...prev, cust];
      
      fetchCalcCost(formData.NumberOfBoxes);
      return updatedCustomers;
    });
    
    setFormData(prev => ({
      ...prev,
      customerId: cust.id,
    }));
    
    setErrors(prev => ({...prev, customerId: false}));
  };

  const handleGetProductId = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const res = await axios.get(
        `https://troxo.runasp.net/api/Products/GetById/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFormData(prev => ({
        ...prev,
        ProductsId: id,
        Length: res.data.data.length,
        Height: res.data.data.height,
        Width: res.data.data.width,
        ChargeableWeight: res.data.data.weight,
      }));
      
      setErrors(prev => ({...prev, ProductsId: false}));
      setSelected_Product([res.data.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetQuantity = (num) => {
    if (formData.ProductsId === "") return;
    // alert(num)
    fetchCalcCostquantity(num);
    const quantity = Math.max(1, num);
    
    setFormData(prev => ({
      ...prev,
      NumberOfBoxes: quantity,
    }));
    
    setErrors(prev => ({...prev, NumberOfBoxes: false}));
    fetchCalcCost(quantity);
  };

  const toggleDetails = (type) =>
    setActiveDetails(activeDetails === type ? null : type);

  const fetchCalcCost = async (quantity) => {
 
    const token = localStorage.getItem("token");
    if (!token) return;
    
    if (
      !selectedStore.length || 
      !selectedproduct.length || 
      !selectedCustomers.length ||
      !formData.ProductsId
    ) {
      return;
    }

    try {
      const ratePayload = {
        Sender: {
          Id: selectedStore[0].id,
          Name: selectedStore[0].storeName,
          FullAddress: selectedStore[0].address,
          City: selectedStore[0].cityId,
          CountryCode: selectedStore[0].countryName,
          PhoneNumber: selectedStore[0].storePhone,
        },
        Recipient: {
          Id: selectedCustomers[0].id,
          name: selectedCustomers[0].customerName,
          fullAddress: selectedCustomers[0].address,
          city: selectedCustomers[0].cityId,
          countryCode: selectedCustomers[0].countryName,
          phoneNumber: selectedCustomers[0].customerPhone,
        },
        Items: [
          {
            ItemId: selectedproduct[0].id,
            Name: selectedproduct[0].productNumber,
            Price: {
              Value: selectedproduct[0].price || 0,
              CurrencyCode: "SAR",
            },
            Dimensions: {
              Length: formData.Length,
              Width: formData.Width,
              Height: formData.Height,
              Unit: "CM",
            },
            Weight: selectedproduct[0].weight,
            ProductType: "Fragile",
          },
        ],
        PickupFromSender: formData.PickupRequired,
        NumberOfPieces:  formData.NumberOfBoxes || 1,
        Length: formData.Length,
        Width: formData.Width,
        Height: formData.Height,
        TotalWeight: formData.ChargeableWeight,
        CompanyId: formData.CompanyId
      };

      const res = await axios.post(
        "https://troxo.runasp.net/api/Shipping/calculate-rate",
        ratePayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const cost = res.data[0]?.rate?.value || 0;
      setCalcCost(cost);
      return cost;
    } catch (e) {
      console.error("Failed to calculate rate:", e);
      return 0;
    }
  };
  const fetchCalcCostquantity = async (quantity) => {
 
    const token = localStorage.getItem("token");
    if (!token) return;
    
    if (
      !selectedStore.length || 
      !selectedproduct.length || 
      !selectedCustomers.length ||
      !formData.ProductsId
    ) {
      return;
    }

    try {
      const ratePayload = {
        Sender: {
          Id: selectedStore[0].id,
          Name: selectedStore[0].storeName,
          FullAddress: selectedStore[0].address,
          City: selectedStore[0].cityId,
          CountryCode: selectedStore[0].countryName,
          PhoneNumber: selectedStore[0].storePhone,
        },
        Recipient: {
          Id: selectedCustomers[0].id,
          name: selectedCustomers[0].customerName,
          fullAddress: selectedCustomers[0].address,
          city: selectedCustomers[0].cityId,
          countryCode: selectedCustomers[0].countryName,
          phoneNumber: selectedCustomers[0].customerPhone,
        },
        Items: [
          {
            ItemId: selectedproduct[0].id,
            Name: selectedproduct[0].productNumber,
            Price: {
              Value: selectedproduct[0].price || 0,
              CurrencyCode: "SAR",
            },
            Dimensions: {
              Length: formData.Length,
              Width: formData.Width,
              Height: formData.Height,
              Unit: "CM",
            },
            Weight: selectedproduct[0].weight,
            ProductType: "Fragile",
          },
        ],
        PickupFromSender: formData.PickupRequired,
        NumberOfPieces: quantity || formData.NumberOfBoxes || 1,
        Length: formData.Length,
        Width: formData.Width,
        Height: formData.Height,
        TotalWeight: formData.ChargeableWeight,
        CompanyId: formData.CompanyId
      };

      const res = await axios.post(
        "https://troxo.runasp.net/api/Shipping/calculate-rate",
        ratePayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const cost = res.data[0]?.rate?.value || 0;
      setCalcCost(cost);
      return cost;
    } catch (e) {
      console.error("Failed to calculate rate:", e);
      return 0;
    }
  };

  const handleAddShipment = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token is required");
      return;
    }

    try {
      const cost = await fetchCalcCost(formData.NumberOfBoxes);

      if (selectedCustomers.length > 1) {
        const payload = selectedCustomers.map(customer => ({
          storeId: formData.storeId,
          customerId: customer.id,
          ProductId: formData.ProductsId,
          CompanyId: formData.CompanyId,
          Height: formData.Height,
          Width: formData.Width,
          Length: formData.Length,
          NumberOfBoxes: formData.NumberOfBoxes,
          PickupRequired: formData.PickupRequired,
          previewRate: cost,
          ChargeableWeight: formData.ChargeableWeight,
        }));

        const res = await axios.post(
          "https://troxo.runasp.net/api/Shipments/CreateMany",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.statusCode === 201 || res.data.statusCode === 200) {
          console.log("Shipments added successfully", res);
          handleSuccess();
        }
      } else {
        const payload = {
          storeId: formData.storeId,
          customerId: formData.customerId,
          ProductId: formData.ProductsId,
          CompanyId: formData.CompanyId,
          Height: formData.Height,
          Width: formData.Width,
          Length: formData.Length,
          NumberOfBoxes: formData.NumberOfBoxes,
          PickupRequired: formData.PickupRequired,
          previewRate: cost,
          ChargeableWeight: formData.ChargeableWeight,
        };

        const res = await axios.post(
          "https://troxo.runasp.net/api/Shipments/Create",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.statusCode === 201 || res.data.statusCode === 200) {
          console.log("Shipment added successfully", res);
          handleSuccess();
        }
      }
    } catch (err) {
      console.error("Failed to add shipment(s):", err);
    }
  };

  const handleSuccess = () => {
    setreCall(!reCall);
    onCallA();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      storeId: stores.length === 1 ? stores[0].id : storeId,
      customerId: "",
      ProductsId: "",
      CompanyId: "0196C6D2-6623-49B8-8F7A-4DF4B00864F7",
      ShipmentType: "DOM",
      shipmentTackingCode: "123",
      serviceType: "",
      Height: 0,
      Width: 0,
      Length: 0,
      NumberOfBoxes: 1,
      PickupRequired: false,
      ShipmentCost: 0,
      ChargeableWeight: 0,
    });
    setSelectedStore(stores.length === 1 ? [stores[0]] : []);
    setSelectedCustomers([]);
    setActiveDetails(null);
    setCalcCost(0);
  };

//   const handleDimensionChange = (field, value) => {
//     console.log(`Updating ${field} to ${value}`);
 
//     const numValue = value;
    
//     setFormData(prev => ({
//       ...prev,
//       [field]: numValue,
//     }));

//     if(field === "ChargeableWeight" && value > 0) {
//     fetchCalcCost();
// }   
    
//     setErrors(prev => ({...prev, [field]: false}));
//     if (field === "NumberOfBoxes"){

//       fetchCalcCost(formData.NumberOfBoxes);
//     }
//     fetchCalcCost();
    
//   };


const handleDimensionChange = (field, value) => {
    const numValue =value  // Ensure number
    
    setFormData(prev => {
      const newData = { ...prev, [field]: numValue };
      console.log(formData);
      
      // Trigger API only for ChargeableWeight
      if (field === 'ChargeableWeight') {
        fetchCalcCost();
      }
      
      return newData;
    });
    
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  // Option 2: Or use useEffect (recommended for multiple fields)
  useEffect(() => {
    if (formData.ChargeableWeight >= 0) { // Minimum weight validation
      fetchCalcCost(formData);
    }
  }, [formData.ChargeableWeight]);
  return (
    <section className="flex flex-col p-4 md:p-5 w-full rounded-xl bg-slate-50" dir="rtl">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-base md:text-lg text-zinc-800">
          شحنتك معنا تصل بأمان إلى كل مكان..!!
        </h2>
      </div>

      {/* Store Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
        <div className="space-y-2">
          <label className="text-sm md:text-base text-zinc-400">المتجر</label>
          {stores.length === 1 ? (
            <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border ${
              errors.storeId ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
            } transition-colors`}>
              <div className="flex gap-2 items-center">
                <img src="/Icones/store.svg" alt="store" />
                <span className="text-blue-950">
                  {stores[0].storeName}
                </span>
              </div>
            </div>
          ) : stores.length > 0 ? (
            <DropDownMenu
              options={stores.map((s) => s.storeName)}
              placeholder={
                selectedStore.length
                  ? selectedStore[0].storeName
                  : "يرجى اختيار المتجر"
              }
              icon="/Icones/store.svg"
              title="المتجر"
              selected={selectedStore[0]?.storeName ?? null}
              storeId={selectedStore[0]?.id ?? null}
              onSelect={handleStoreSelect}
              isone
              modalToOpen="store"
              onStoreAdded={() => {
                const token = localStorage.getItem("token");
                if (!token) return;
                axios
                  .get("https://troxo.runasp.net/api/Stores/GetAll", {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((res) => setStores(res.data.data || []))
                  .catch((err) => console.error("Failed to reload stores:", err));
              }}
            />
          ) : (
            <AlertMessage
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bf562eadfe2d8f765faa1b34a91a054e801906ac?placeholderIfAbsent=true&apiKey=33cf6ee4ee4e4cdd8b24ad2c5832d456"
              title="رسالة تلميح"
              description="لا توجد متاجر متاحة، يرجى إضافة متجر جديد!"
            />
          )}
          {errors.storeId && (
            <p className="text-red-500 text-xs mt-1">يجب اختيار المتجر</p>
          )}
        </div>

        {(selectedStore.length > 0 || stores.length === 1) ? (
          activeDetails === "store" ? (
            <div className="mt-4 bg-red-50 rounded-2xl p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-sm md:text-base font-semibold text-slate-950">
                  {selectedStore.length > 0 ? selectedStore[0].storeName : stores[0].storeName}
                </h3>
                {stores.length > 1 && (
                  <button
                    onClick={handleRemoveStore}
                    className="text-red-500 text-xs hover:text-red-700"
                  >
                    إزالة
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="flex items-center gap-2">
                  <img src="/Icones/phone.svg" alt="phone" className="w-4 h-4" />
                  <span className="text-xs md:text-sm">الهاتف</span>
                </div>
                <p className="text-xs md:text-sm text-gray-500">
                  {selectedStore.length > 0 ? selectedStore[0].storePhone : stores[0].storePhone}
                </p>
                <div className="flex items-center gap-2">
                  <img src="/Icones/Location.svg" alt="location" className="w-4 h-4" />
                  <span className="text-xs md:text-sm">العنوان</span>
                </div>
                <p className="text-xs md:text-sm text-gray-500">
                  {selectedStore.length > 0 ? selectedStore[0].address : stores[0].address}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex justify-between items-center">
              <h4 className="text-sm md:text-base font-semibold text-slate-950 mb-2">
                تفاصيل المتجر
              </h4>
              <button
                onClick={() => toggleDetails("store")}
                className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
              >
                <img
                  src="/Icones/ArrowRight.svg"
                  alt="arrow right"
                  className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
                    activeDetails === "store" ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>
          )
        ) : (
          <AlertMessage
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bf562eadfe2d8f765faa1b34a91a054e801906ac?placeholderIfAbsent=true&apiKey=33cf6ee4ee4e4cdd8b24ad2c5832d456"
            title="رسالة تلميح"
            description="أضف متجرك الآن لعرض تفاصيله الكاملة!"
          />
        )}
      </div>

      {/* Customer Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
        <div className="space-y-2">
          <label className="text-sm md:text-base text-zinc-400">العميل</label>
          <DropDownMenu
            options={filteredCustomers.map((c) => c.customerName)}
            placeholder={
              selectedCustomers.length
                ? selectedCustomers.map((c) => c.customerName).join(", ")
                : "يرجى اختيار العميل"
            }
            icon="/Icones/Profile.svg"
            title="العميل"
            storeId={selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : []}
            selectedItems={selectedCustomers.map((c) => c.customerName)}
            onSelectMulti={handleSelectCustomer}
            isMulti
            modalToOpen="client"
            onClientAdded={() => {
              const token = localStorage.getItem("token");
              if (!token) return;
              const currentStoreId = selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : storeId;
              axios
                .get(
                  `https://troxo.runasp.net/api/Customers/GetAll?StoreId=${currentStoreId}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => setCustomers(res.data.data || []))
                .catch((err) => console.error("Failed to reload customers:", err));
            }}
          />
          {errors.customerId && (
            <p className="text-red-500 text-xs mt-1">يجب اختيار العميل</p>
          )}
        </div>
        {selectedCustomers.length ? (
          activeDetails === "client" ? (
            <div className="mt-4">
              {selectedCustomers.map((cust, index) => (
                <div
                  key={index}
                  className="bg-red-50 rounded-2xl mt-4 p-4 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm md:text-base font-semibold text-slate-950">
                      {cust.customerName}
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedCustomers(prev => prev.filter(c => c.id !== cust.id));
                        if (selectedCustomers.length === 1) {
                          setFormData(prev => ({...prev, customerId: ""}));
                        }
                      }}
                      className="text-red-500 text-xs"
                    >
                      إزالة
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="flex items-center gap-2">
                      <img src="/Icones/phone.svg" alt="phone" className="w-4 h-4" />
                      <span className="text-xs md:text-sm">الهاتف</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500">
                      {cust.customerPhone}
                    </p>
                    <div className="flex items-center gap-2">
                      <img src="/Icones/Location.svg" alt="location" className="w-4 h-4" />
                      <span className="text-xs md:text-sm">العنوان</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500">
                      {cust.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 flex justify-between items-center">
              <h4 className="text-sm md:text-base font-semibold text-slate-950 mb-2">
                تفاصيل العملاء
              </h4>
              <button
                onClick={() => toggleDetails("client")}
                className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
              >
                <img
                  src="/Icones/ArrowRight.svg"
                  alt="arrow right"
                  className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
                    activeDetails === "client" ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>
          )
        ) : (
          <div className="w-full p-4 md:p-6 text-center text-sm md:text-base font-semibold bg-gray-100 rounded-2xl text-neutral-400">
            لا توجد تفاصيل عميل لعرضها
          </div>
        )}
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
        <div className="space-y-2">
          <label className="text-sm md:text-base text-zinc-400">المنتج</label>
          <div className={`flex justify-between items-center p-3 bg-white rounded-lg border ${
            errors.ProductsId ? "border-red-500" : "border-neutral-400"
          }`}>
            <ProductSelector
              modalToOpen="product"
              storeId={selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : null}
              getProductId={handleGetProductId}
              setProduct={setSelected_Product}
            />
          </div>
          {errors.ProductsId && (
            <p className="text-red-500 text-xs mt-1">يجب اختيار المنتج</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm md:text-base text-zinc-400">التقاط</label>
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              id="pickup"
              className="w-5 h-5 bg-white rounded border border-neutral-400"
              checked={formData.PickupRequired}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  PickupRequired: e.target.checked
                }));
                fetchCalcCost(formData.NumberOfBoxes);
              }}
            />
            <label htmlFor="pickup" className="text-sm md:text-base text-gray-500">
              استلام الشحنة من المرسل
            </label>
          </div>
        </div>
      </div>

      {/* Shipment Details */}
      <div className="flex justify-between items-center">
        <h3 className="mt-6 md:mt-8 text-base md:text-lg text-zinc-800">
          تفاصيل الشحنة (الطول، الارتفاع، العرض)
        </h3>
        <button
          onClick={() => toggleDetails("shipment")}
          className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
        >
          <img
            src="/Icones/ArrowRight.svg"
            alt="arrow right"
            className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
              activeDetails === "shipment" ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>
      
      {activeDetails === "shipment" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Length */}
            <div className="space-y-2">
              <label className="text-sm md:text-base text-zinc-400">الطول (سم)</label>
              <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
                errors.Length ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
              } transition-colors`}>
                <img src="/Icones/length.svg" alt="length" className="w-5 h-5 opacity-70" />
                <input
                  type="number"
                  placeholder="ادخل الطول"
                  className="w-full bg-transparent outline-none placeholder:text-neutral-400"
                  min="1"
                  value={formData.Length}
                  onChange={(e) => handleDimensionChange('Length', e.target.value)}
                />
              </div>
              {errors.Length && (
                <p className="text-red-500 text-xs mt-1">يجب إدخال الطول</p>
              )}
            </div>

            {/* Height */}
            <div className="space-y-2">
              <label className="text-sm md:text-base text-zinc-400">الارتفاع (سم)</label>
              <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
                errors.Height ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
              } transition-colors`}>
                <img src="/Icones/height.svg" alt="height" className="w-5 h-5 opacity-70" />
                <input
                  type="number"
                  placeholder="ادخل الارتفاع"
                  className="w-full bg-transparent outline-none placeholder:text-neutral-400"
                  min="1"
                  value={formData.Height}
                  onChange={(e) => handleDimensionChange('Height', e.target.value)}
                />
              </div>
              {errors.Height && (
                <p className="text-red-500 text-xs mt-1">يجب إدخال الارتفاع</p>
              )}
            </div>

            {/* Width */}
            <div className="space-y-2">
              <label className="text-sm md:text-base text-zinc-400">العرض (سم)</label>
              <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
                errors.Width ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
              } transition-colors`}>
                <img src="/Icones/width.svg" alt="width" className="w-5 h-5 opacity-70" />
                <input
                  type="number"
                  placeholder="ادخل العرض"
                  className="w-full bg-transparent outline-none placeholder:text-neutral-400"
                  min="1"
                  value={formData.Width}
                  onChange={(e) => handleDimensionChange('Width', e.target.value)}
                />
              </div>
              {errors.Width && (
                <p className="text-red-500 text-xs mt-1">يجب إدخال العرض</p>
              )}
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label className="text-sm md:text-base text-zinc-400">الوزن (كجم)</label>
              <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
                errors.ChargeableWeight ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
              } transition-colors`}>
                <img src="/Icones/weight.svg" alt="weight" className="w-5 h-5 opacity-70" />
                <input
                  type="number"
                  placeholder="ادخل الوزن"
                  className="w-full bg-transparent outline-none placeholder:text-neutral-400"
                  min="0.1"
                  step="0.1"
                  value={formData.ChargeableWeight}
                  onChange={(e) => handleDimensionChange('ChargeableWeight', e.target.value)}
                />
              </div>
              {errors.ChargeableWeight && (
                <p className="text-red-500 text-xs mt-1">يجب إدخال الوزن</p>
              )}
            </div>

            {/* Number of Boxes */}
            <div className="space-y-2">
              <label className="text-sm md:text-base text-zinc-400">عدد البوكسات</label>
              <QuantityBox 
                getQuantity={handleGetQuantity}
                hasError={errors.NumberOfBoxes}
                fetchCalcCost={fetchCalcCostquantity}
                value={formData.NumberOfBoxes}
              />
              {errors.NumberOfBoxes && (
                <p className="text-red-500 text-xs mt-1">يجب إدخال عدد البوكسات</p>
              )}
            </div>

            {/* Shipment Type */}
            <div className="space-y-2">
              <label className="text-sm md:text-base text-zinc-400">نوع الشحنة</label>
              <div className="relative w-full">
                <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 transition-colors`}>
                  <div className="flex gap-2 items-center">
                    <img src="/Icones/ShipmentsIcone.svg" alt="shipment type" />
                    <span className="text-blue-950">جاف</span>
                  </div>
                </div>
                <input type="hidden" name="ShipmentType" value="DOM" />
              </div>
            </div>

            {/* Shipping Company */}
            <div className="space-y-2">
              <label className="text-sm md:text-base text-zinc-400">شركة الشحن</label>
              <div className="relative w-full">
                {compuny.length === 1 ? (
                  <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 transition-colors`}>
                    <div className="flex gap-2 items-center">
                      <img src="/Icones/ShipmentsIcone.svg" alt="shipment" />
                      <span className="text-blue-950">
                        {compuny[0].companyName}
                      </span>
                    </div>
                    <p dir="ltr" className="">
                      <span className="text-red-500"> {calcCost}</span>
                      <span className="text-black">SAR</span>
                    </p>
                  </div>
                ) : (
                  <>
                    <img
                      src="/Icones/ShipmentsIcone.svg"
                      alt="shipment icon"
                      className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    />
                    <select 
                      className="w-full p-3 pl-10 pr-8 bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 appearance-none cursor-pointer"
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          CompanyId: e.target.value,
                        }));
                        fetchCalcCost(formData.NumberOfBoxes);
                      }}
                      value={formData.CompanyId}
                    >
                      <option value="" className="text-neutral-400">
                        اختر الشركة
                      </option>
                      {compuny?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.companyName}
                        </option>
                      ))}
                    </select>
                    <img
                      src="/images/AarrowDown.svg"
                      alt="arrow"
                      className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleAddShipment}
        className="px-4 py-2 self-center mt-4 cursor-pointer md:px-6 md:py-4 text-sm md:text-base font-extrabold bg-red-100 text-pink-950 rounded-xl w-full sm:w-auto min-w-[200px]"
      >
        إضافة شحنة
      </button>
    </section>
  );
 }





// export default function ShipmentForm({
//   onCallA,
//   onChangeValue,
//   setreCall,
//   reCall,
// }) {
//   const {
//     state: { storeId },
//     dispatch,
//   } = useAppContext();

//   const [stores, setStores] = useState([]);
//   const [selectedStore, setSelectedStore] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomers, setSelectedCustomers] = useState([]);
//   const [activeDetails, setActiveDetails] = useState(null);
//   const [calcCost, setCalcCost] = useState(0);
//   const [compuny, setCompuny] = useState([]);
//   const [selectedproduct, setSelected_Product] = useState([]);
//   const [errors, setErrors] = useState({
//     storeId: false,
//     customerId: false,
//     ProductsId: false,
//     Height: false,
//     Width: false,
//     Length: false,
//     NumberOfBoxes: false,
//     ChargeableWeight: false
//   });

//   const [formData, setFormData] = useState({
//     storeId: "",
//     customerId: "",
//     ProductsId: "",
//     CompanyId: "0196C6D2-6623-49B8-8F7A-4DF4B00864F7",
//     ShipmentType: "DOM",
//     shipmentTackingCode: "123",
//     serviceType: "",
//     Height: 0,
//     Width: 0,
//     Length: 0,
//     NumberOfBoxes: 1,
//     PickupRequired: false,
//     ShipmentCost: 0,
//     ChargeableWeight: 0,
//   });

//   // Fetch stores
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     axios
//       .get("https://troxo.runasp.net/api/Stores/GetAll", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setStores(res.data.data || []);
//         if (res.data.data.length === 1) {
//           const singleStore = res.data.data[0];
//           localStorage.setItem("storeId", singleStore.id);
//           setSelectedStore([singleStore]);
//           setFormData(prev => ({
//             ...prev,
//             storeId: singleStore.id
//           }));
//           dispatch({ type: "SET_STORE_ID", payload: singleStore.id });
//         }
//       })
//       .catch((err) => console.error("Failed to load stores:", err));
//   }, []);

//   // Fetch customers
//   useEffect(() => {
//     const getCustomers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const currentStoreId = stores.length === 1 ? stores[0].id : storeId;
//         if (!currentStoreId) return;
        
//         const res = await axios.get(
//           `https://troxo.runasp.net/api/Customers/GetAll?StoreId=${currentStoreId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setCustomers(res.data.data || []);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getCustomers();
//   }, [storeId, stores]);

//   // Fetch companies
//   useEffect(() => {
//     const getCompanies = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const res = await axios.get(
//           `https://troxo.runasp.net/api/Companies/GetAll`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setCompuny(res.data.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getCompanies();
//   }, []);

//   useEffect(() => {
//     if(selectedproduct.length > 0) {
//       fetchCalcCost(formData.NumberOfBoxes);  
//     }
//   }, [selectedproduct, formData.NumberOfBoxes]);

//   const validateForm = () => {
//     const newErrors = {
//       storeId: !formData.storeId,
//       customerId: selectedCustomers.length === 0,
//       ProductsId: !formData.ProductsId,
//       Height: !formData.Height || formData.Height <= 0,
//       Width: !formData.Width || formData.Width <= 0,
//       Length: !formData.Length || formData.Length <= 0,
//       NumberOfBoxes: !formData.NumberOfBoxes || formData.NumberOfBoxes <= 0,
//       ChargeableWeight: !formData.ChargeableWeight || formData.ChargeableWeight <= 0
//     };
    
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(error => error);
//   };

//   const handleStoreSelect = (storeName) => {
//     const store = stores.find((s) => s.storeName === storeName);
//     if (!store) return;
    
//     localStorage.setItem("storeId", store.id);
//     setSelectedStore([store]);
//     setFormData((prev) => ({
//       ...prev,
//       storeId: store.id,
//     }));
//     setErrors(prev => ({...prev, storeId: false}));
//     onChangeValue(store.id);
//     dispatch({ type: "SET_STORE_ID", payload: store.id });
//   };

//   const handleRemoveStore = () => {
//     setSelectedStore([]);
//     setSelectedCustomers([]);
//   };

//   const handleRemoveCustomer = () => setSelectedCustomers([]);
  
//   const filteredCustomers = selectedStore.length
//     ? customers.filter((c) => c.storeId === selectedStore[0].id)
//     : stores.length === 1
//     ? customers.filter((c) => c.storeId === stores[0].id)
//     : [];

//   const handleSelectCustomer = (customerName) => {
//     const cust = filteredCustomers.find((c) => c.customerName === customerName);
//     if (!cust) return;
    
//     setSelectedCustomers(prev => {
//       const isSelected = prev.some(c => c.id === cust.id);
//       const updatedCustomers = isSelected 
//         ? prev.filter(c => c.id !== cust.id) 
//         : [...prev, cust];
      
//       // Call fetchCalcCost after customer selection changes
//       fetchCalcCost(formData.NumberOfBoxes);
//       return updatedCustomers;
//     });
    
//     setFormData(prev => ({
//       ...prev,
//       customerId: cust.id,
//     }));
    
//     setErrors(prev => ({...prev, customerId: false}));
//   };

//   const handleGetProductId = async (id) => {
//     setFormData((prev) => ({
//       ...prev,
//       ProductsId: id,
//     }));
//     setErrors(prev => ({...prev, ProductsId: false}));

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;
      
//       const res = await axios.get(
//         `https://troxo.runasp.net/api/Products/GetById/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setFormData((prev) => ({
//         ...prev,
//         Length: res.data.data.length,
//         Height: res.data.data.height,
//         Width: res.data.data.width,
//         ChargeableWeight: res.data.data.weight,
//       }));

//       // Call fetchCalcCost after product data is set
//       fetchCalcCost(formData.NumberOfBoxes);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleGetQuantity = (num) => {
//     if (formData.ProductsId === "") return;
    
//     setFormData((prev) => ({
//       ...prev,
//       NumberOfBoxes: num,
//     }));
//     setErrors(prev => ({...prev, NumberOfBoxes: false}));
    
//     // Call fetchCalcCost with the new quantity
//     fetchCalcCost(num);
//   };

//   const toggleDetails = (type) =>
//     setActiveDetails(activeDetails === type ? null : type);

//   const fetchCalcCost = async (quantity) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
    
//     // Check if we have all required data
//     if (
//       !selectedStore.length || 
//       !selectedproduct.length || 
//       !selectedCustomers.length ||
//       !formData.ProductsId
//     ) {
//       return;
//     }

//     try {
//       const ratePayload = {
//         Sender: {
//           Id: selectedStore[0].id,
//           Name: selectedStore[0].storeName,
//           FullAddress: selectedStore[0].address,
//           City: selectedStore[0].cityId,
//           CountryCode: selectedStore[0].countryName,
//           PhoneNumber: selectedStore[0].storePhone,
//         },
//         Recipient: {
//           Id: selectedCustomers[0].id,
//           name: selectedCustomers[0].customerName,
//           fullAddress: selectedCustomers[0].address,
//           city: selectedCustomers[0].cityId,
//           countryCode: selectedCustomers[0].countryName,
//           phoneNumber: selectedCustomers[0].customerPhone,
//         },
//         Items: [
//           {
//             ItemId: selectedproduct[0].id,
//             Name: selectedproduct[0].productNumber,
//             Price: {
//               Value: selectedproduct[0].price || 0,
//               CurrencyCode: "SAR",
//             },
//             Dimensions: {
//               Length: formData.Length,
//               Width: formData.Width,
//               Height: formData.Height,
//               Unit: "CM",
//             },
//             Weight: formData.ChargeableWeight,
//             ProductType: "Fragile",
//           },
//         ],
//         PickupFromSender: formData.PickupRequired,
//         NumberOfPieces: quantity || formData.NumberOfBoxes || 1,
//         Length: formData.Length,
//         Width: formData.Width,
//         Height: formData.Height,
//         TotalWeight: formData.ChargeableWeight,
//         CompanyId: formData.CompanyId
//       };

//       const res = await axios.post(
//         "https://troxo.runasp.net/api/Shipping/calculate-rate",
//         ratePayload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const cost = res.data[0]?.rate?.value || 0;
//       setCalcCost(cost);
//       return cost;
//     } catch (e) {
//       console.error("Failed to calculate rate:", e);
//       return 0;
//     }
//   };

//   const handleAddShipment = async () => {
//     if (!validateForm()) return;

//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("token is required");
//       return;
//     }

//     try {
//       const cost = await fetchCalcCost(formData.NumberOfBoxes);

//       if (selectedCustomers.length > 1) {
//         // Multiple customers - use CreateMany endpoint
//         const payload = selectedCustomers.map(customer => ({
//           storeId: formData.storeId,
//           customerId: customer.id,
//           ProductId: formData.ProductsId,
//           CompanyId: formData.CompanyId,
//           Height: formData.Height,
//           Width: formData.Width,
//           Length: formData.Length,
//           NumberOfBoxes: formData.NumberOfBoxes,
//           PickupRequired: formData.PickupRequired,
//           previewRate: cost,
//           ChargeableWeight: formData.ChargeableWeight,
//         }));

//         const res = await axios.post(
//           "https://troxo.runasp.net/api/Shipments/CreateMany",
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (res.data.statusCode === 201 || res.data.statusCode === 200) {
//           console.log("Shipments added successfully", res);
//           handleSuccess();
//         }
//       } else {
//         // Single customer - use original Create endpoint
//         const payload = {
//           storeId: formData.storeId,
//           customerId: formData.customerId,
//           ProductId: formData.ProductsId,
//           CompanyId: formData.CompanyId,
//           Height: formData.Height,
//           Width: formData.Width,
//           Length: formData.Length,
//           NumberOfBoxes: formData.NumberOfBoxes,
//           PickupRequired: formData.PickupRequired,
//           previewRate: cost,
//           ChargeableWeight: formData.ChargeableWeight,
//         };

//         const res = await axios.post(
//           "https://troxo.runasp.net/api/Shipments/Create",
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (res.data.statusCode === 201 || res.data.statusCode === 200) {
//           console.log("Shipment added successfully", res);
//           handleSuccess();
//         }
//       }
//     } catch (err) {
//       console.error("Failed to add shipment(s):", err);
//     }
//   };

//   const handleSuccess = () => {
//     setreCall(!reCall);
//     onCallA();
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       storeId: stores.length === 1 ? stores[0].id : storeId,
//       customerId: "",
//       ProductsId: "",
//       CompanyId: "0196C6D2-6623-49B8-8F7A-4DF4B00864F7",
//       ShipmentType: "DOM",
//       shipmentTackingCode: "123",
//       serviceType: "",
//       Height: 0,
//       Width: 0,
//       Length: 0,
//       NumberOfBoxes: 1,
//       PickupRequired: false,
//       ShipmentCost: 0,
//       ChargeableWeight: 0,
//     });
//     setSelectedStore(stores.length === 1 ? [stores[0]] : []);
//     setSelectedCustomers([]);
//     setActiveDetails(null);
//     setCalcCost(0);
//   };

//   return (
//     <section className="flex flex-col p-4 md:p-5 w-full rounded-xl bg-slate-50" dir="rtl">
//       {/* Header */}
//       <div className="flex flex-wrap justify-between items-center gap-4">
//         <h2 className="text-base md:text-lg text-zinc-800">
//           شحنتك معنا تصل بأمان إلى كل مكان..!!
//         </h2>
//       </div>

//       {/* Store Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
//         <div className="space-y-2">
//           <label className="text-sm md:text-base text-zinc-400">المتجر</label>
//           {stores.length === 1 ? (
//             <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border ${
//               errors.storeId ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//             } transition-colors`}>
//               <div className="flex gap-2 items-center">
//                 <img src="/Icones/store.svg" alt="store" />
//                 <span className="text-blue-950">
//                   {stores[0].storeName}
//                 </span>
//               </div>
//             </div>
//           ) : stores.length > 0 ? (
//             <DropDownMenu
//               options={stores.map((s) => s.storeName)}
//               placeholder={
//                 selectedStore.length
//                   ? selectedStore[0].storeName
//                   : "يرجى اختيار المتجر"
//               }
//               icon="/Icones/store.svg"
//               title="المتجر"
//               selected={selectedStore[0]?.storeName ?? null}
//               storeId={selectedStore[0]?.id ?? null}
//               onSelect={handleStoreSelect}
//               isone
//               modalToOpen="store"
//               onStoreAdded={() => {
//                 const token = localStorage.getItem("token");
//                 if (!token) return;
//                 axios
//                   .get("https://troxo.runasp.net/api/Stores/GetAll", {
//                     headers: { Authorization: `Bearer ${token}` },
//                   })
//                   .then((res) => setStores(res.data.data || []))
//                   .catch((err) => console.error("Failed to reload stores:", err));
//               }}
//             />
//           ) : (
//             <AlertMessage
//               icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bf562eadfe2d8f765faa1b34a91a054e801906ac?placeholderIfAbsent=true&apiKey=33cf6ee4ee4e4cdd8b24ad2c5832d456"
//               title="رسالة تلميح"
//               description="لا توجد متاجر متاحة، يرجى إضافة متجر جديد!"
//             />
//           )}
//           {errors.storeId && (
//             <p className="text-red-500 text-xs mt-1">يجب اختيار المتجر</p>
//           )}
//         </div>

//         {(selectedStore.length > 0 || stores.length === 1) ? (
//           activeDetails === "store" ? (
//             <div className="mt-4 bg-red-50 rounded-2xl p-4">
//               <div className="flex justify-between items-start">
//                 <h3 className="text-sm md:text-base font-semibold text-slate-950">
//                   {selectedStore.length > 0 ? selectedStore[0].storeName : stores[0].storeName}
//                 </h3>
//                 {stores.length > 1 && (
//                   <button
//                     onClick={handleRemoveStore}
//                     className="text-red-500 text-xs hover:text-red-700"
//                   >
//                     إزالة
//                   </button>
//                 )}
//               </div>
//               <div className="grid grid-cols-2 gap-3 mt-2">
//                 <div className="flex items-center gap-2">
//                   <img src="/Icones/phone.svg" alt="phone" className="w-4 h-4" />
//                   <span className="text-xs md:text-sm">الهاتف</span>
//                 </div>
//                 <p className="text-xs md:text-sm text-gray-500">
//                   {selectedStore.length > 0 ? selectedStore[0].storePhone : stores[0].storePhone}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <img src="/Icones/Location.svg" alt="location" className="w-4 h-4" />
//                   <span className="text-xs md:text-sm">العنوان</span>
//                 </div>
//                 <p className="text-xs md:text-sm text-gray-500">
//                   {selectedStore.length > 0 ? selectedStore[0].address : stores[0].address}
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <div className="mt-6 flex justify-between items-center">
//               <h4 className="text-sm md:text-base font-semibold text-slate-950 mb-2">
//                 تفاصيل المتجر
//               </h4>
//               <button
//                 onClick={() => toggleDetails("store")}
//                 className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
//               >
//                 <img
//                   src="/Icones/ArrowRight.svg"
//                   alt="arrow right"
//                   className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
//                     activeDetails === "store" ? "rotate-90" : ""
//                   }`}
//                 />
//               </button>
//             </div>
//           )
//         ) : (
//           <AlertMessage
//             icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bf562eadfe2d8f765faa1b34a91a054e801906ac?placeholderIfAbsent=true&apiKey=33cf6ee4ee4e4cdd8b24ad2c5832d456"
//             title="رسالة تلميح"
//             description="أضف متجرك الآن لعرض تفاصيله الكاملة!"
//           />
//         )}
//       </div>

//       {/* Customer Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
//         <div className="space-y-2">
//           <label className="text-sm md:text-base text-zinc-400">العميل</label>
//           <DropDownMenu
//             options={filteredCustomers.map((c) => c.customerName)}
//             placeholder={
//               selectedCustomers.length
//                 ? selectedCustomers.map((c) => c.customerName).join(", ")
//                 : "يرجى اختيار العميل"
//             }
//             icon="/Icones/Profile.svg"
//             title="العميل"
//             storeId={selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : []}
//             selectedItems={selectedCustomers.map((c) => c.customerName)}
//             onSelectMulti={handleSelectCustomer}
//             isMulti
//             modalToOpen="client"
//             onClientAdded={() => {
//               const token = localStorage.getItem("token");
//               if (!token) return;
//               const currentStoreId = selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : storeId;
//               axios
//                 .get(
//                   `https://troxo.runasp.net/api/Customers/GetAll?StoreId=${currentStoreId}`,
//                   { headers: { Authorization: `Bearer ${token}` } }
//                 )
//                 .then((res) => setCustomers(res.data.data || []))
//                 .catch((err) => console.error("Failed to reload customers:", err));
//             }}
//           />
//           {errors.customerId && (
//             <p className="text-red-500 text-xs mt-1">يجب اختيار العميل</p>
//           )}
//         </div>
//         {selectedCustomers.length ? (
//           activeDetails === "client" ? (
//             <div className="mt-4">
//               {selectedCustomers.map((cust, index) => (
//                 <div
//                   key={index}
//                   className="bg-red-50 rounded-2xl mt-4 p-4 transition-all"
//                 >
//                   <div className="flex justify-between items-start">
//                     <h3 className="text-sm md:text-base font-semibold text-slate-950">
//                       {cust.customerName}
//                     </h3>
//                     <button
//                       onClick={() => {
//                         setSelectedCustomers(prev => prev.filter(c => c.id !== cust.id));
//                         if (selectedCustomers.length === 1) {
//                           setFormData(prev => ({...prev, customerId: ""}));
//                         }
//                       }}
//                       className="text-red-500 text-xs"
//                     >
//                       إزالة
//                     </button>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3 mt-2">
//                     <div className="flex items-center gap-2">
//                       <img src="/Icones/phone.svg" alt="phone" className="w-4 h-4" />
//                       <span className="text-xs md:text-sm">الهاتف</span>
//                     </div>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {cust.customerPhone}
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <img src="/Icones/Location.svg" alt="location" className="w-4 h-4" />
//                       <span className="text-xs md:text-sm">العنوان</span>
//                     </div>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {cust.address}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="mt-6 flex justify-between items-center">
//               <h4 className="text-sm md:text-base font-semibold text-slate-950 mb-2">
//                 تفاصيل العملاء
//               </h4>
//               <button
//                 onClick={() => toggleDetails("client")}
//                 className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
//               >
//                 <img
//                   src="/Icones/ArrowRight.svg"
//                   alt="arrow right"
//                   className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
//                     activeDetails === "client" ? "rotate-90" : ""
//                   }`}
//                 />
//               </button>
//             </div>
//           )
//         ) : (
//           <div className="w-full p-4 md:p-6 text-center text-sm md:text-base font-semibold bg-gray-100 rounded-2xl text-neutral-400">
//             لا توجد تفاصيل عميل لعرضها
//           </div>
//         )}
//       </div>

//       {/* Product Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
//         <div className="space-y-2">
//           <label className="text-sm md:text-base text-zinc-400">المنتج</label>
//           <div className={`flex justify-between items-center p-3 bg-white rounded-lg border ${
//             errors.ProductsId ? "border-red-500" : "border-neutral-400"
//           }`}>
//             <ProductSelector
//               modalToOpen="product"
//               storeId={selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : null}
//               getProductId={handleGetProductId}
//               setProduct={setSelected_Product}
//             />
//           </div>
//           {errors.ProductsId && (
//             <p className="text-red-500 text-xs mt-1">يجب اختيار المنتج</p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm md:text-base text-zinc-400">التقاط</label>
//           <div className="flex items-center gap-2 mt-6">
//             <input
//               type="checkbox"
//               id="pickup"
//               className="w-5 h-5 bg-white rounded border border-neutral-400"
//               checked={formData.PickupRequired}
//               onChange={(e) => {
//                 setFormData(prev => ({
//                   ...prev,
//                   PickupRequired: e.target.checked
//                 }));
//                 fetchCalcCost(formData.NumberOfBoxes);
//               }}
//             />
//             <label htmlFor="pickup" className="text-sm md:text-base text-gray-500">
//               استلام الشحنة من المرسل
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Shipment Details */}
//       <div className="flex justify-between items-center">
//         <h3 className="mt-6 md:mt-8 text-base md:text-lg text-zinc-800">
//           تفاصيل الشحنة (الطول، الارتفاع، العرض)
//         </h3>
//         <button
//           onClick={() => toggleDetails("shipment")}
//           className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
//         >
//           <img
//             src="/Icones/ArrowRight.svg"
//             alt="arrow right"
//             className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
//               activeDetails === "shipment" ? "rotate-90" : ""
//             }`}
//           />
//         </button>
//       </div>
      
//       {activeDetails === "shipment" && (
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {/* Length */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">الطول (سم)</label>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.Length ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img src="/Icones/length.svg" alt="length" className="w-5 h-5 opacity-70" />
//                 <input
//                   type="number"
//                   placeholder="ادخل الطول"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="1"
//                   value={formData.Length}
//                   onChange={(e) => {
//                     const length = parseFloat(e.target.value);
//                     setFormData(prev => ({
//                       ...prev,
//                       Length: length,
//                     }));
//                     setErrors(prev => ({...prev, Length: false}));
//                     fetchCalcCost(formData.NumberOfBoxes);
//                   }}
//                 />
//               </div>
//               {errors.Length && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال الطول</p>
//               )}
//             </div>

//             {/* Height */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">الارتفاع (سم)</label>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.Height ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img src="/Icones/height.svg" alt="height" className="w-5 h-5 opacity-70" />
//                 <input
//                   type="number"
//                   placeholder="ادخل الارتفاع"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="1"
//                   value={formData.Height}
//                   onChange={(e) => {
//                     const height = parseFloat(e.target.value);
//                     setFormData(prev => ({
//                       ...prev,
//                       Height: height,
//                     }));
//                     setErrors(prev => ({...prev, Height: false}));
//                     fetchCalcCost(formData.NumberOfBoxes);
//                   }}
//                 />
//               </div>
//               {errors.Height && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال الارتفاع</p>
//               )}
//             </div>

//             {/* Width */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">العرض (سم)</label>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.Width ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img src="/Icones/width.svg" alt="width" className="w-5 h-5 opacity-70" />
//                 <input
//                   type="number"
//                   placeholder="ادخل العرض"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="1"
//                   value={formData.Width}
//                   onChange={(e) => {
//                     const width = parseFloat(e.target.value);
//                     setFormData(prev => ({
//                       ...prev,
//                       Width: width,
//                     }));
//                     setErrors(prev => ({...prev, Width: false}));
//                     fetchCalcCost(formData.NumberOfBoxes);
//                   }}
//                 />
//               </div>
//               {errors.Width && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال العرض</p>
//               )}
//             </div>

//             {/* Weight */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">الوزن (كجم)</label>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.ChargeableWeight ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img src="/Icones/weight.svg" alt="weight" className="w-5 h-5 opacity-70" />
//                 <input
//                   type="number"
//                   placeholder="ادخل الوزن"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="0.1"
//                   step="0.1"
//                   value={formData.ChargeableWeight}
//                   onChange={(e) => {
//                     const weight = parseFloat(e.target.value);
//                     setFormData(prev => ({
//                       ...prev,
//                       ChargeableWeight: weight,
//                     }));
//                     setErrors(prev => ({...prev, ChargeableWeight: false}));
//                     fetchCalcCost(formData.NumberOfBoxes);
//                   }}
//                 />
//               </div>
//               {errors.ChargeableWeight && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال الوزن</p>
//               )}
//             </div>

//             {/* Number of Boxes */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">عدد البوكسات</label>
//               <QuantityBox 
//                 getQuantity={handleGetQuantity}
//                 hasError={errors.NumberOfBoxes}
//                 fetchCalcCost={fetchCalcCost}
//                 value={formData.NumberOfBoxes}
//               />
//               {errors.NumberOfBoxes && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال عدد البوكسات</p>
//               )}
//             </div>

//             {/* Shipment Type */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">نوع الشحنة</label>
//               <div className="relative w-full">
//                 <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 transition-colors`}>
//                   <div className="flex gap-2 items-center">
//                     <img src="/Icones/ShipmentsIcone.svg" alt="shipment type" />
//                     <span className="text-blue-950">جاف</span>
//                   </div>
//                 </div>
//                 <input type="hidden" name="ShipmentType" value="DOM" />
//               </div>
//             </div>

//             {/* Shipping Company */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">شركة الشحن</label>
//               <div className="relative w-full">
//                 {compuny.length === 1 ? (
//                   <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 transition-colors`}>
//                     <div className="flex gap-2 items-center">
//                       <img src="/Icones/ShipmentsIcone.svg" alt="shipment" />
//                       <span className="text-blue-950">
//                         {compuny[0].companyName}
//                       </span>
//                     </div>
//                     <p dir="ltr" className="">
//                       <span className="text-red-500"> {calcCost}</span>
//                       <span className="text-black">SAR</span>
//                     </p>
//                   </div>
//                 ) : (
//                   <>
//                     <img
//                       src="/Icones/ShipmentsIcone.svg"
//                       alt="shipment icon"
//                       className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
//                     />
//                     <select 
//                       className="w-full p-3 pl-10 pr-8 bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 appearance-none cursor-pointer"
//                       onChange={(e) => {
//                         setFormData(prev => ({
//                           ...prev,
//                           CompanyId: e.target.value,
//                         }));
//                         fetchCalcCost(formData.NumberOfBoxes);
//                       }}
//                       value={formData.CompanyId}
//                     >
//                       <option value="" className="text-neutral-400">
//                         اختر الشركة
//                       </option>
//                       {compuny?.map((item, index) => (
//                         <option key={index} value={item.id}>
//                           {item.companyName}
//                         </option>
//                       ))}
//                     </select>
//                     <img
//                       src="/images/AarrowDown.svg"
//                       alt="arrow"
//                       className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
//                     />
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Submit Button */}
//       <button
//         onClick={handleAddShipment}
//         className="px-4 py-2 self-center mt-4 cursor-pointer md:px-6 md:py-4 text-sm md:text-base font-extrabold bg-red-100 text-pink-950 rounded-xl w-full sm:w-auto min-w-[200px]"
//       >
//         إضافة شحنة
//       </button>
//     </section>
//   );
// }


// export default function ShipmentForm({
//   onCallA,
//   onChangeValue,
//   setreCall,
//   reCall,
// }) {
//   const {
//     state: { storeId },
//     dispatch,
//   } = useAppContext();

//   const [stores, setStores] = useState([]);
//   const [selectedStore, setSelectedStore] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomers, setSelectedCustomers] = useState([]);
//   const [activeDetails, setActiveDetails] = useState(null);
//   const [calcCost, setCalcCost] = useState(0);
//   const [compuny, setCompuny] = useState([]);
//   const [selectedproduct, setSelected_Product] = useState([]);
//   const [errors, setErrors] = useState({
//     storeId: false,
//     customerId: false,
//     ProductsId: false,
//     Height: false,
//     Width: false,
//     Length: false,
//     NumberOfBoxes: false,
//     ChargeableWeight: false
//   });

//   const [formData, setFormData] = useState({
//     storeId: "",
//     customerId: "",
//     ProductsId: "",
//     CompanyId: "0196C6D2-6623-49B8-8F7A-4DF4B00864F7",
//     ShipmentType: "DOM",
//     shipmentTackingCode: "123",
//     serviceType: "",
//     Height: 0,
//     Width: 0,
//     Length: 0,
//     NumberOfBoxes: 0,
//     PickupRequired: false,
//     ShipmentCost: 0,
//     ChargeableWeight: 0,
//   });
// useEffect(() => {
//    if(selectedproduct.length>0){
//       fetchCalcCost(1)

//    }
//   }, [dispatch , selectedproduct]);
//   // Fetch stores
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     axios
//       .get("https://troxo.runasp.net/api/Stores/GetAll", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setStores(res.data.data || []);
//         if (res.data.data.length === 1) {
//           const singleStore = res.data.data[0];
//           localStorage.setItem("storeId", singleStore.id);
//           setSelectedStore([singleStore]);
//           setFormData(prev => ({
//             ...prev,
//             storeId: singleStore.id
//           }));
//           dispatch({ type: "SET_STORE_ID", payload: singleStore.id });
//         }
//       })
//       .catch((err) => console.error("Failed to load stores:", err));
//   }, []);

//   // Fetch customers
//   useEffect(() => {
//     const getCustomers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const currentStoreId = stores.length === 1 ? stores[0].id : storeId;
//         if (!currentStoreId) return;
        
//         const res = await axios.get(
//           `https://troxo.runasp.net/api/Customers/GetAll?StoreId=${currentStoreId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setCustomers(res.data.data || []);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getCustomers();
//   }, [storeId, stores]);

//   // Fetch companies
//   useEffect(() => {
//     const getCompanies = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const res = await axios.get(
//           `https://troxo.runasp.net/api/Companies/GetAll`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setCompuny(res.data.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getCompanies();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {
//       storeId: !formData.storeId,
//       customerId: selectedCustomers.length === 0,
//       ProductsId: !formData.ProductsId,
//       Height: !formData.Height || formData.Height <= 0,
//       Width: !formData.Width || formData.Width <= 0,
//       Length: !formData.Length || formData.Length <= 0,
//       NumberOfBoxes: !formData.NumberOfBoxes || formData.NumberOfBoxes <= 0,
//       ChargeableWeight: !formData.ChargeableWeight || formData.ChargeableWeight <= 0
//     };
    
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(error => error);
//   };

//   const handleStoreSelect = (storeName) => {
//     const store = stores.find((s) => s.storeName === storeName);
//     if (!store) return;
    
//     localStorage.setItem("storeId", store.id);
//     setSelectedStore([store]);
//     setFormData((prev) => ({
//       ...prev,
//       storeId: store.id,
//     }));
//     setErrors(prev => ({...prev, storeId: false}));
//     onChangeValue(store.id);
//     dispatch({ type: "SET_STORE_ID", payload: store.id });
//   };

//   const handleRemoveStore = () => {
//     setSelectedStore([]);
//     setSelectedCustomers([]);
//   };

//   const handleRemoveCustomer = () => setSelectedCustomers([]);
  
//   const filteredCustomers = selectedStore.length
//     ? customers.filter((c) => c.storeId === selectedStore[0].id)
//     : stores.length === 1
//     ? customers.filter((c) => c.storeId === stores[0].id)
//     : [];

//   const handleSelectCustomer = (customerName) => {
//     const cust = filteredCustomers.find((c) => c.customerName === customerName);
//     if (!cust) return;
    
//     setSelectedCustomers(prev => {
//       const isSelected = prev.some(c => c.id === cust.id);
//       return isSelected 
//         ? prev.filter(c => c.id !== cust.id) 
//         : [...prev, cust];
//     });
    
//     setFormData(prev => ({
//       ...prev,
//       customerId: cust.id,
//     }));
    
//     setErrors(prev => ({...prev, customerId: false}));
//   };

//   const handleGetProductId = async (id) => {
//     fetchCalcCost(1)
    
//     setFormData((prev) => ({
//       ...prev,
//       ProductsId: id,
//     }));
//     setErrors(prev => ({...prev, ProductsId: false}));

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;
      
//       const res = await axios.get(
//         `https://troxo.runasp.net/api/Products/GetById/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setFormData((prev) => ({
//         ...prev,
//         Length: res.data.data.length,
//         Height: res.data.data.height,
//         Width: res.data.data.width,
//         ChargeableWeight: res.data.data.weight,
//       }));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleGetQuantity = (num) => {
//     if (formData.ProductsId === "") return;
    
//     setFormData((prev) => ({
//       ...prev,
//       NumberOfBoxes: num,
//     }));
//     setErrors(prev => ({...prev, NumberOfBoxes: false}));
//   };

//   const toggleDetails = (type) =>
//     setActiveDetails(activeDetails === type ? null : type);



//     const fetchCalcCost = async (quantity) => {
//     // alert("جاري حساب التكلفة...");
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     const valid =
//       selectedStore.length > 0 &&
//       selectedproduct.length > 0 &&
//       selectedCustomers.length > 0;
//     if (!valid) return;
//     try {
//       const ratePayload = {
//         Sender: {
//           Id: selectedStore[0].id,
//           Name: selectedStore[0].storeName,
//           FullAddress: selectedStore[0].address,
//           City: selectedStore[0].cityId,
//           CountryCode: selectedStore[0].countryName,
//           PhoneNumber: selectedStore[0].storePhone,
//         },
//         Recipient: {
//           Id: selectedCustomers[0].id,
//           name: selectedCustomers[0].customerName,
//           fullAddress: selectedCustomers[0].address,
//           city: selectedCustomers[0].cityId,
//           countryCode: selectedCustomers[0].countryName,
//           phoneNumber: selectedCustomers[0].customerPhone,
//         },
//         Items: [
//           {
//             ItemId: selectedproduct[0].id,
//             Name: selectedproduct[0].productNumber,
//             Price: {
//               Value: selectedproduct[0].price || 0,
//               CurrencyCode: "SAR",
//             },
//             Dimensions: {
//               Length: selectedproduct[0].length,
//               Width: selectedproduct[0].width,
//               Height: selectedproduct[0].height,
//               Unit: "CM",
//             },
//             Weight: selectedproduct[0].weight,
//             ProductType: "Fragile",
//           },
//         ],
//         PickupFromSender: false,
//         NumberOfPieces: quantity||formData.NumberOfBoxes,
//         Length: formData.Length,
//         Width: formData.Width,
//         Height: formData.Height,
//         TotalWeight: formData.ChargeableWeight,
//         CompanyId: formData.CompanyId
//       };
//       console.log("Rate Payload:", ratePayload);
      
//       const res = await axios.post(
//         "https://troxo.runasp.net/api/Shipping/calculate-rate",
//         ratePayload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const cost = res.data[0].rate.value;
//       setCalcCost(cost);
//       return cost;
//     } catch (e) {
//       console.error("Failed to calculate rate:", e);
//     }
//   };
//   const handleAddShipment = async () => {
//     if (!validateForm()) return;

//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("token is required");
//       return;
//     }

//     try {
//       const cost = await fetchCalcCost();

//       if (selectedCustomers.length > 1) {
//         // Multiple customers - use CreateMany endpoint
//         const payload = selectedCustomers.map(customer => ({
//           storeId: formData.storeId,
//           customerId: customer.id,
//           ProductId: formData.ProductsId,
//           CompanyId: formData.CompanyId,
//           Height: formData.Height,
//           Width: formData.Width,
//           Length: formData.Length,
//           NumberOfBoxes: formData.NumberOfBoxes,
//           PickupRequired: formData.PickupRequired,
//           previewRate: cost,
//           ChargeableWeight: formData.ChargeableWeight,
//         }));
// console.log("Payload for CreateMany:", payload);

//         const res = await axios.post(
//           "https://troxo.runasp.net/api/Shipments/CreateMany",
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         console.log("Response from CreateMany:", res);
//         if (res.data.statusCode === 201 || res.data.statusCode === 200) {
//           console.log("Shipments added successfully", res);
//           handleSuccess();
//         }
//       } else {
//         // Single customer - use original Create endpoint
//         const payload = {
//           storeId: formData.storeId,
//           customerId: formData.customerId,
//           ProductId: formData.ProductsId,
//           CompanyId: formData.CompanyId,
//           Height: formData.Height,
//           Width: formData.Width,
//           Length: formData.Length,
//           NumberOfBoxes: formData.NumberOfBoxes,
//           PickupRequired: formData.PickupRequired,
//           previewRate: cost,
//           ChargeableWeight: formData.ChargeableWeight,
//         };

//         const res = await axios.post(
//           "https://troxo.runasp.net/api/Shipments/Create",
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (res.data.statusCode === 201 ||res.data.statusCode === 200) {
//           console.log("Shipment added successfully", res);
//           handleSuccess();
//         }
//       }
//     } catch (err) {
//       console.error("Failed to add shipment(s):", err);
//     }
//   };

//   const handleSuccess = () => {
//     setreCall(!reCall);
//     onCallA();
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       storeId: stores.length === 1 ? stores[0].id : storeId,
//       customerId: "",
//       ProductsId: "",
//       CompanyId: "0196C6D2-6623-49B8-8F7A-4DF4B00864F7",
//       ShipmentType: "DOM",
//       shipmentTackingCode: "123",
//       serviceType: "",
//       Height: 0,
//       Width: 0,
//       Length: 0,
//       NumberOfBoxes: 1,
//       PickupRequired: false,
//       ShipmentCost: 0,
//       ChargeableWeight: 0,
//     });
//     setSelectedStore(stores.length === 1 ? [stores[0]] : []);
//     setSelectedCustomers([]);
//     setActiveDetails(null);
//     setCalcCost(0);
//   };

//   return (
//     <section className="flex flex-col p-4 md:p-5 w-full rounded-xl bg-slate-50" dir="rtl">
//       {/* Header */}
//       <div className="flex flex-wrap justify-between items-center gap-4">
//         <h2 className="text-base md:text-lg text-zinc-800">
//           شحنتك معنا تصل بأمان إلى كل مكان..!!
//         </h2>
//       </div>

//       {/* Store Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
//         <div className="space-y-2">
//           <label className="text-sm md:text-base text-zinc-400">المتجر</label>
//           {stores.length === 1 ? (
//             <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border ${
//               errors.storeId ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//             } transition-colors`}>
//               <div className="flex gap-2 items-center">
//                 <img src="/Icones/store.svg" alt="store" />
//                 <span className="text-blue-950">
//                   {stores[0].storeName}
//                 </span>
//               </div>
//             </div>
//           ) : stores.length > 0 ? (
//             <DropDownMenu
//               options={stores.map((s) => s.storeName)}
//               placeholder={
//                 selectedStore.length
//                   ? selectedStore[0].storeName
//                   : "يرجى اختيار المتجر"
//               }
//               icon="/Icones/store.svg"
//               title="المتجر"
//               selected={selectedStore[0]?.storeName ?? null}
//               storeId={selectedStore[0]?.id ?? null}
//               onSelect={handleStoreSelect}
//               isone
//               modalToOpen="store"
//               onStoreAdded={() => {
//                 const token = localStorage.getItem("token");
//                 if (!token) return;
//                 axios
//                   .get("https://troxo.runasp.net/api/Stores/GetAll", {
//                     headers: { Authorization: `Bearer ${token}` },
//                   })
//                   .then((res) => setStores(res.data.data || []))
//                   .catch((err) => console.error("Failed to reload stores:", err));
//               }}
//             />
//           ) : (
//             <AlertMessage
//               icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bf562eadfe2d8f765faa1b34a91a054e801906ac?placeholderIfAbsent=true&apiKey=33cf6ee4ee4e4cdd8b24ad2c5832d456"
//               title="رسالة تلميح"
//               description="لا توجد متاجر متاحة، يرجى إضافة متجر جديد!"
//             />
//           )}
//           {errors.storeId && (
//             <p className="text-red-500 text-xs mt-1">يجب اختيار المتجر</p>
//           )}
//         </div>

//         {(selectedStore.length > 0 || stores.length === 1) ? (
//           activeDetails === "store" ? (
//             <div className="mt-4 bg-red-50 rounded-2xl p-4">
//               <div className="flex justify-between items-start">
//                 <h3 className="text-sm md:text-base font-semibold text-slate-950">
//                   {selectedStore.length > 0 ? selectedStore[0].storeName : stores[0].storeName}
//                 </h3>
//                 {stores.length > 1 && (
//                   <button
//                     onClick={handleRemoveStore}
//                     className="text-red-500 text-xs hover:text-red-700"
//                   >
//                     إزالة
//                   </button>
//                 )}
//               </div>
//               <div className="grid grid-cols-2 gap-3 mt-2">
//                 <div className="flex items-center gap-2">
//                   <img src="/Icones/phone.svg" alt="phone" className="w-4 h-4" />
//                   <span className="text-xs md:text-sm">الهاتف</span>
//                 </div>
//                 <p className="text-xs md:text-sm text-gray-500">
//                   {selectedStore.length > 0 ? selectedStore[0].storePhone : stores[0].storePhone}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <img src="/Icones/Location.svg" alt="location" className="w-4 h-4" />
//                   <span className="text-xs md:text-sm">العنوان</span>
//                 </div>
//                 <p className="text-xs md:text-sm text-gray-500">
//                   {selectedStore.length > 0 ? selectedStore[0].address : stores[0].address}
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <div className="mt-6 flex justify-between items-center">
//               <h4 className="text-sm md:text-base font-semibold text-slate-950 mb-2">
//                 تفاصيل المتجر
//               </h4>
//               <button
//                 onClick={() => toggleDetails("store")}
//                 className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
//               >
//                 <img
//                   src="/Icones/ArrowRight.svg"
//                   alt="arrow right"
//                   className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
//                     activeDetails === "store" ? "rotate-90" : ""
//                   }`}
//                 />
//               </button>
//             </div>
//           )
//         ) : (
//           <AlertMessage
//             icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bf562eadfe2d8f765faa1b34a91a054e801906ac?placeholderIfAbsent=true&apiKey=33cf6ee4ee4e4cdd8b24ad2c5832d456"
//             title="رسالة تلميح"
//             description="أضف متجرك الآن لعرض تفاصيله الكاملة!"
//           />
//         )}
//       </div>

//       {/* Customer Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
//         <div className="space-y-2">
//           <label className="text-sm md:text-base text-zinc-400">العميل</label>
//           <DropDownMenu
//             options={filteredCustomers.map((c) => c.customerName)}
//             placeholder={
//               selectedCustomers.length
//                 ? selectedCustomers.map((c) => c.customerName).join(", ")
//                 : "يرجى اختيار العميل"
//             }
//             icon="/Icones/Profile.svg"
//             title="العميل"
//             storeId={selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : []}
//             selectedItems={selectedCustomers.map((c) => c.customerName)}
//             onSelectMulti={handleSelectCustomer}
//             isMulti
//             modalToOpen="client"
//             onClientAdded={() => {
//               const token = localStorage.getItem("token");
//               if (!token) return;
//               const currentStoreId = selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : storeId;
//               axios
//                 .get(
//                   `https://troxo.runasp.net/api/Customers/GetAll?StoreId=${currentStoreId}`,
//                   { headers: { Authorization: `Bearer ${token}` } }
//                 )
//                 .then((res) => setCustomers(res.data.data || []))
//                 .catch((err) => console.error("Failed to reload customers:", err));
//             }}
//           />
//           {errors.customerId && (
//             <p className="text-red-500 text-xs mt-1">يجب اختيار العميل</p>
//           )}
//         </div>
//         {selectedCustomers.length ? (
//           activeDetails === "client" ? (
//             <div className="mt-4">
//               {selectedCustomers.map((cust, index) => (
//                 <div
//                   key={index}
//                   className="bg-red-50 rounded-2xl mt-4 p-4 transition-all"
//                 >
//                   <div className="flex justify-between items-start">
//                     <h3 className="text-sm md:text-base font-semibold text-slate-950">
//                       {cust.customerName}
//                     </h3>
//                     <button
//                       onClick={() => {
//                         setSelectedCustomers(prev => prev.filter(c => c.id !== cust.id));
//                         if (selectedCustomers.length === 1) {
//                           setFormData(prev => ({...prev, customerId: ""}));
//                         }
//                       }}
//                       className="text-red-500 text-xs"
//                     >
//                       إزالة
//                     </button>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3 mt-2">
//                     <div className="flex items-center gap-2">
//                       <img src="/Icones/phone.svg" alt="phone" className="w-4 h-4" />
//                       <span className="text-xs md:text-sm">الهاتف</span>
//                     </div>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {cust.customerPhone}
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <img src="/Icones/Location.svg" alt="location" className="w-4 h-4" />
//                       <span className="text-xs md:text-sm">العنوان</span>
//                     </div>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {cust.address}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="mt-6 flex justify-between items-center">
//               <h4 className="text-sm md:text-base font-semibold text-slate-950 mb-2">
//                 تفاصيل العملاء
//               </h4>
//               <button
//                 onClick={() => toggleDetails("client")}
//                 className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
//               >
//                 <img
//                   src="/Icones/ArrowRight.svg"
//                   alt="arrow right"
//                   className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
//                     activeDetails === "client" ? "rotate-90" : ""
//                   }`}
//                 />
//               </button>
//             </div>
//           )
//         ) : (
//           <div className="w-full p-4 md:p-6 text-center text-sm md:text-base font-semibold bg-gray-100 rounded-2xl text-neutral-400">
//             لا توجد تفاصيل عميل لعرضها
//           </div>
//         )}
//       </div>

//       {/* Product Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
//         <div className="space-y-2">
//           <label className="text-sm md:text-base text-zinc-400">المنتج</label>
//           <div className={`flex justify-between items-center p-3 bg-white rounded-lg border ${
//             errors.ProductsId ? "border-red-500" : "border-neutral-400"
//           }`}>
//             <ProductSelector
//               modalToOpen="product"
//               storeId={selectedStore.length > 0 ? selectedStore[0].id : stores.length === 1 ? stores[0].id : null}
//               getProductId={handleGetProductId}
//               setProduct={setSelected_Product}
//               fetchCalcCost={fetchCalcCost}
//             />
//           </div>
//           {errors.ProductsId && (
//             <p className="text-red-500 text-xs mt-1">يجب اختيار المنتج</p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm md:text-base text-zinc-400">التقاط</label>
//           <div className="flex items-center gap-2 mt-6">
//             <input
//               type="checkbox"
//               id="pickup"
//               className="w-5 h-5 bg-white rounded border border-neutral-400"
//               checked={formData.PickupRequired}
//               onChange={(e) => setFormData(prev => ({
//                 ...prev,
//                 PickupRequired: e.target.checked
//               }))}
//             />
//             <label htmlFor="pickup" className="text-sm md:text-base text-gray-500">
//               استلام الشحنة من المرسل
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Shipment Details */}
//       <div className="flex justify-between items-center">
//         <h3 className="mt-6 md:mt-8 text-base md:text-lg text-zinc-800">
//           تفاصيل الشحنة (الطول، الارتفاع، العرض)
//         </h3>
//         <button
//           onClick={() => toggleDetails("shipment")}
//           className="p-2 w-10 h-10 rounded-lg bg-gray-200/30 hover:bg-gray-200/50 transition-colors"
//         >
//           <img
//             src="/Icones/ArrowRight.svg"
//             alt="arrow right"
//             className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${
//               activeDetails === "shipment" ? "rotate-90" : ""
//             }`}
//           />
//         </button>
//       </div>
      
//       {activeDetails === "shipment" && (
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {/* Length */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">الطول (سم)</label>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.Length ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img src="/Icones/length.svg" alt="length" className="w-5 h-5 opacity-70" />
//                 <input
//                   type="number"
//                   placeholder="ادخل الطول"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="1"
//                   value={formData.Length}
//                   onChange={(e) => {
//                     setFormData(prev => ({
//                       ...prev,
//                       Length: parseFloat(e.target.value),
//                     }));
//                     setErrors(prev => ({...prev, Length: false}));
//                   }}
//                 />
//               </div>
//               {errors.Length && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال الطول</p>
//               )}
//             </div>

//             {/* Height */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">الارتفاع (سم)</label>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.Height ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img src="/Icones/height.svg" alt="height" className="w-5 h-5 opacity-70" />
//                 <input
//                   type="number"
//                   placeholder="ادخل الارتفاع"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="1"
//                   value={formData.Height}
//                   onChange={(e) => {
//                     setFormData(prev => ({
//                       ...prev,
//                       Height: parseFloat(e.target.value),
//                     }));
//                     setErrors(prev => ({...prev, Height: false}));
//                   }}
//                 />
//               </div>
//               {errors.Height && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال الارتفاع</p>
//               )}
//             </div>

//             {/* Width */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">العرض (سم)</label>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.Width ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img src="/Icones/width.svg" alt="width" className="w-5 h-5 opacity-70" />
//                 <input
//                   type="number"
//                   placeholder="ادخل العرض"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="1"
//                   value={formData.Width}
//                   onChange={(e) => {
//                     setFormData(prev => ({
//                       ...prev,
//                       Width: parseFloat(e.target.value),
//                     }));
//                     setErrors(prev => ({...prev, Width: false}));
//                   }}
//                 />
//               </div>
//               {errors.Width && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال العرض</p>
//               )}
//             </div>

//             {/* Weight */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">الوزن (كجم)</label>
//               <div className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
//                 errors.ChargeableWeight ? "border-red-500" : "border-neutral-400 hover:border-neutral-500"
//               } transition-colors`}>
//                 <img src="/Icones/weight.svg" alt="weight" className="w-5 h-5 opacity-70" />
//                 <input
//                   type="number"
//                   placeholder="ادخل الوزن"
//                   className="w-full bg-transparent outline-none placeholder:text-neutral-400"
//                   min="0.1"
//                   step="0.1"
//                   value={formData.ChargeableWeight}
//                   onChange={(e) => {
//                     setFormData(prev => ({
//                       ...prev,
//                       ChargeableWeight: parseFloat(e.target.value),
//                     }));
//                     setErrors(prev => ({...prev, ChargeableWeight: false}));
//                   }}
//                 />
//               </div>
//               {errors.ChargeableWeight && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال الوزن</p>
//               )}
//             </div>

//             {/* Number of Boxes */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">عدد البوكسات</label>
//               <QuantityBox 
//                 getQuantity={handleGetQuantity}
//                 hasError={errors.NumberOfBoxes}
//                 fetchCalcCost={fetchCalcCost}
//                 value={formData.NumberOfBoxes}
//               />
//               {errors.NumberOfBoxes && (
//                 <p className="text-red-500 text-xs mt-1">يجب إدخال عدد البوكسات</p>
//               )}
//             </div>

//             {/* Shipment Type */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">نوع الشحنة</label>
//               <div className="relative w-full">
//                 <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 transition-colors`}>
//                   <div className="flex gap-2 items-center">
//                     <img src="/Icones/ShipmentsIcone.svg" alt="shipment type" />
//                     <span className="text-blue-950">جاف</span>
//                   </div>
//                 </div>
//                 <input type="hidden" name="ShipmentType" value="DOM" />
//               </div>
//             </div>

//             {/* Shipping Company */}
//             <div className="space-y-2">
//               <label className="text-sm md:text-base text-zinc-400">شركة الشحن</label>
//               <div className="relative w-full">
//                 {compuny.length === 1 ? (
//                   <div className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 transition-colors`}>
//                     <div className="flex gap-2 items-center">
//                       <img src="/Icones/ShipmentsIcone.svg" alt="shipment" />
//                       <span className="text-blue-950">
//                         {compuny[0].companyName}
//                       </span>
//                     </div>
//                     <p dir="ltr" className="">
//                       <span className="text-red-500"> {calcCost}</span>
//                       <span className="text-black">SAR</span>
//                     </p>
//                   </div>
//                 ) : (
//                   <>
//                     <img
//                       src="/Icones/ShipmentsIcone.svg"
//                       alt="shipment icon"
//                       className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
//                     />
//                     <select 
//                       className="w-full p-3 pl-10 pr-8 bg-white rounded-lg border border-neutral-400 hover:border-neutral-500 appearance-none cursor-pointer"
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           CompanyId: e.target.value,
//                         }))
//                       }
//                       value={formData.CompanyId}
//                     >
//                       <option value="" className="text-neutral-400">
//                         اختر الشركة
//                       </option>
//                       {compuny?.map((item, index) => (
//                         <option key={index} value={item.id}>
//                           {item.companyName}
//                         </option>
//                       ))}
//                     </select>
//                     <img
//                       src="/images/AarrowDown.svg"
//                       alt="arrow"
//                       className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
//                     />
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Submit Button */}
//       <button
//         onClick={handleAddShipment}
//         className="px-4 py-2 self-center mt-4 cursor-pointer md:px-6 md:py-4 text-sm md:text-base font-extrabold bg-red-100 text-pink-950 rounded-xl w-full sm:w-auto min-w-[200px]"
//       >
//         إضافة شحنة
//       </button>
//     </section>
//   );
// }