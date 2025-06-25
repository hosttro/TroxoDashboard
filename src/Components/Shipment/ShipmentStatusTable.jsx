// src/Components/Shipment/ShipmentStatusTable.jsx

import ShipmentRow from "./ShipmentRow";
import PropTypes from "prop-types";

function ShipmentStatusTable({ data = [], activeTab = "status" }) {
  console.log({data});
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full">
        {/* ✅ رأس الجدول */}
        <div className="grid grid-cols-12 gap-2 px-4 py-3 text-sm font-semibold bg-[#FED5D2] rounded-lg text-zinc-800 sm:gap-4 sm:px-6 sm:py-4">
          <div className="col-span-2   text-center">رقم الشحنة</div>
          <div className="col-span-2  text-center"> اسم العميل </div>
          <div className="col-span-2   text-center">شركة الشحن</div>
          <div className="col-span-3  text-center">عنوان العميل</div>
         <div className="col-span-2  text-center">حالة الشحنة</div> 
          <div className="col-span-1   text-center">الإجراءات</div>
        </div>

        {/* ✅ بيانات الشحنات */}
        <div className="bg-slate-50 rounded-lg">
          {data.length > 0 ? (
            data.map((shipment, index) => (
              <div key={shipment.id}>
                <ShipmentRow shipment={shipment} activeTab={activeTab} />
                {index < data.length - 1 && (
                  <div className="h-px mx-4 bg-neutral-300" />
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">لا توجد شحنات</div>
          )}
        </div>
      </div>

      {/* ✅ Pagination ثابتة (اختياري) */}
      <div className="flex flex-col items-center w-full gap-4 mt-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-black whitespace-nowrap">
          <span>عدد الصفوف في كل صفحة:</span>
          <select className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-black">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded text-gray-700 transition-colors">
            <img src="/Icones/ArrowRight.svg" alt="السابق" className="w-4" />
          </button>
          <button className="px-3 py-1 rounded bg-gray-100 font-medium hover:bg-red-200 transition-colors">
            1
          </button>
          <button className="p-2 rounded text-gray-700 transition-colors">
            <img src="/Icones/ArrowLeft.svg" alt="التالي" className="w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

ShipmentStatusTable.propTypes = {
  data: PropTypes.array.isRequired,
  activeTab: PropTypes.string,
};

export default ShipmentStatusTable;












