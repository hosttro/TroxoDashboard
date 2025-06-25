import StatGrid from "./../Components/StatGrid";
// import ProductTable from "./../Components/ProductTable";
// import CityChart from "./../Components/CityChart";
import PrintReportModal from './../Components/Modal/PrintReportModal';
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from "axios";

export default function StatStore() {
  const [showPrintModal, setShowPrintModal] = useState(false);
  let [statistics, setStatistics] = useState({
    localShipmentsCount: 0, 
    internationalShipmentsCount: 0})

let {storeId}=useParams();
  console.log({storeId});

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get(`https://troxo.runasp.net/api/statistics/store/${storeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setStatistics(res.data.data );

        
      })
      .catch((err) => console.error("Failed to load stores:", err));
  }, []);
  

  const onSubmit = (e) => {
    e.preventDefault(); // لمنع إعادة تحميل الصفحة
    // هنا ضع منطق إضافة المتجر (API call أو أي شيء آخر)

    // بعد نجاح الإضافة، عرض modal النجاح
    setShowPrintModal(true);
  };
  return (
    <section className="w-full mb-6 px-4 md:px-6">
      <div className="w-full max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between mt-6 w-full max-w-[1111px] max-md:mr-2.5 max-md:max-w-full">
          <div className="flex flex-col gap-2 items-center mr-10">
            <h1 className="text-2xl font-black leading-tight text-gray-800">
              الاحصائيات
            </h1>
            <nav
              className="mt-2  text-sm text-neutral-500"
              aria-label="Breadcrumb"
            >
              الرئيسية &gt; إحصائيات متجر
            </nav>
          </div>
          <button
                  onClick={onSubmit}
                  className="flex items-center gap-2 px-4 py-3 text-base font-medium rounded-2xl border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <span>طباعة التقرير</span>
                  <img
                    src="/Icones/PrintReport.svg"
                    alt="أيقونة الطباعة"
                    className="w-5 h-5"
                  />
                </button>
                {showPrintModal && (
                  <PrintReportModal onClose={() => setShowPrintModal(false)} />
                )}
        </div>
        <section className="flex flex-col pb-10 pr-10 pt-5 mx-5 mt-6 bg-white rounded-2xl max-md:px-5 max-md:mr-2.5 w-full">
          <h2 className="self-start text-2xl font-bold tracking-tighter leading-relaxed text-gray-800">
            إحصائيات المتجر
          </h2>
          <StatGrid  statistics={statistics} />
        </section>
      </div>
    </section>
  );
}
