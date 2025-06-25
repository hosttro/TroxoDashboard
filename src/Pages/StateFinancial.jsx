import StatCardAdmin from "./../Components/StatCardAdmin";
import { useState , useEffect } from "react";
import PrintReportModal from "./../Components/Modal/PrintReportModal";
import axios from "axios";
const StateFinancial = () => {
  // تنسيق التاريخ باللغة العربية
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const arabicDate = new Date().toLocaleDateString("ar-SA", options);
  const [showPrintModal, setShowPrintModal] = useState(false);


  let [statistics, setStatistics] = useState({});
console.log("Statistics:", statistics);

  let getStatics = async()=>{
    await axios.get(`https://troxo.runasp.net/api/statistics/user/financial?onlyDelivered=false`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },}).then((res)=>{
        console.log(res.data.data);
        setStatistics(res.data.data);
      }).catch((err)=>{
        console.error("Error fetching statistics:", err);
      });

  }

  useEffect(() => {
    getStatics(); },[]);

  const onSubmit = (e) => {
    e.preventDefault(); // لمنع إعادة تحميل الصفحة
    // هنا ضع منطق إضافة المتجر (API call أو أي شيء آخر)

    // بعد نجاح الإضافة، عرض modal النجاح
    setShowPrintModal(true);
  };

  return (
    <section className="px-4 md:px-6 w-full" dir="rtl">
      <div className="w-full max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-medium text-gray-700">
              إحصائيات المالية
            </h2>
            <time className="text-sm text-gray-500 mt-1 block">
              {arabicDate}
            </time>
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

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white p-6 gap-4 mb-8">
          <StatCardAdmin
            title="مبالغ الشحن المحلي"
            value={statistics?.totalLocalShippingAmount}
            change="+5%"
            period="مقارنة باليوم السابق"
            iconSrc="/images/ShippingMonth.svg"
            borderColor="border-indigo-500"
            textColor="text-indigo-500"
            currency="/Icones/Currency.svg"
          />
          <StatCardAdmin
            title="مبالغ الشحن الدولي"
            value={statistics?.totalInternationalShippingAmount}
            change="+5%"
            period="مقارنة باليوم السابق"
            iconSrc="/images/ShippingMonth.svg"
            borderColor="border-indigo-500"
            textColor="text-indigo-500"
            currency="/Icones/Currency.svg"
          />
                  </div>
      </div>
    </section>
  );
};

export default StateFinancial;
