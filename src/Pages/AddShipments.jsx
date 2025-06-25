// استيراد مكون نموذج الشحنة ومكون جدول الشحنات
import { useRef, useState } from "react";
import ShipmentForm from "../Components/Shipment/ShipmentForm";
import ShipmentTable from "../Components/Shipment/ShipmentTable";
// تعريف صفحة "إضافة شحنات"
const AddShipments = () => {
  const aRef = useRef();
  const [storeIdShipment,setStoreIdShipment]=useState('');
  const [reCall,setReCall]=useState(false);
  return (
    // الحاوية الرئيسية للصفحة مع ضبط المسافات الداخلية وتوجيه النص إلى اليمين
    <div className=" px-4 md:px-6 w-full" dir="rtl">
      {/* حاوية المحاذاة والرأس */}
      <div className="flex flex-col items-start mt-6 max-md:items-center">
        {/* قسم العنوان وشريط التنقل */}
        <div className="w-full max-w-6xl">
          {/* عنوان الصفحة */}
          <h1 className="text-2xl font-black text-gray-800 max-md:text-xl">
            الشحنات
          </h1>
          {/* شريط التنقل التسلسلي (Breadcrumb) */}
          <nav aria-label="Breadcrumb" className="mt-2">
            <ol className="flex gap-2 text-sm text-neutral-500">
              {/* رابط الصفحة الرئيسية */}
              <li className="flex items-center">
                <a href="/">الرئيسية</a>
                <span className="mx-2">&gt;</span>
              </li>
              {/* رابط قسم الشحنات */}
              <li className="flex items-center">
                <a href="/">الشحنات</a>
                <span className="mx-2">&gt;</span>
              </li>
              {/* الصفحة الحالية */}
              <li aria-current="page" className="font-medium text-gray-700">
                اضافة شحنة
              </li>
            </ol>
          </nav>
        </div>

        {/* قسم محتوى إضافة الشحنات */}
        <div className="w-full max-w-7xl mt-7 ml-3 mb-2">
          {/* صندوق خلفية بيضاء مع ظل وزوايا دائرية */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* حاوية Padding داخل الصندوق */}
            <div className="p-6 max-md:p-4">
              {/* مكون نموذج إدخال بيانات الشحنة */}
              <ShipmentForm onCallA={() => aRef.current?.handleGetAllShipment()}  onChangeValue={setStoreIdShipment} setreCall={setReCall} reCall={reCall} />
              {/* مسافة فاصلة قبل جدول الشحنات */}
              <div className="mt-6">
                {/* مكون عرض جدول الشحنات المدخلة */}
                <ShipmentTable ref={aRef} value={storeIdShipment} reCall={reCall} setreCall={setReCall} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// تصدير المكون للاستخدام في مسارات التطبيق
export default AddShipments;
