import { useState, useEffect, useMemo } from "react";
import ShipmentStatusTable from "../Components/Shipment/ShipmentStatusTable";
import ShipmentReturn from "../Components/Shipment/ShipmentReturn";
import ShipmentCanceled from "../Components/Shipment/ShipmentCanceled";
import axios from "axios";

export const Shipments = () => {
  const [activeTab, setActiveTab] = useState("status"); // status | return | canceled
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("token is required");
        return;
      }
      try {
        const res = await axios.get(
          `https://troxo.runasp.net/api/Shipments/GetAll?storeId=${localStorage.getItem("storeId")}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setShipments(res.data.data);
      } catch (err) {
        console.error("خطأ أثناء تحميل الشحنات:", err);
        setError("فشل تحميل بيانات الشحنات");
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);
console.log(shipments);

  // Filter shipments based on search term
  const filteredShipments = useMemo(() => {
    if (!searchTerm) return shipments;
    
    const lowercasedSearch = searchTerm.toLowerCase();
    
    return shipments.filter(shipment => {
      // Search in multiple fields
      return (
        (shipment.trackingNumber?.toLowerCase().includes(lowercasedSearch)) ||
        (shipment.customerName?.toLowerCase().includes(lowercasedSearch)) ||
        (shipment.customerPhone?.toLowerCase().includes(lowercasedSearch)) ||
        (shipment.address?.toLowerCase().includes(lowercasedSearch)) ||
        (shipment.status?.toLowerCase().includes(lowercasedSearch)) ||
        (shipment?.shipmentTackingCode?.toString().includes(lowercasedSearch))
        // Add more fields as needed
      );
    });
  }, [shipments, searchTerm]);

  return (
    <div className="w-full px-4 mb-6 md:px-6" dir="rtl">
      <div className="flex flex-col items-start mt-6 lg:mt-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-800">
          الشحنات
        </h2>

        {/* Breadcrumb */}
        <nav
          className="mt-2 md:mt-3 text-sm md:text-base text-neutral-500"
          aria-label="breadcrumb"
        >
          <ol className="flex items-center gap-2">
            <li>الرئيسية</li>
            <li aria-hidden="true">&gt;</li>
            <li className="text-gray-700">
              {activeTab === "status"
                ? "الشحنات"
                : activeTab === "canceled"
                ? "الشحنات الملغاة"
                : "شحنات المرتجعة"}
            </li>
          </ol>
        </nav>

        {/* UI content */}
        <article className="flex flex-col w-full p-4 mt-6 bg-white rounded-2xl md:p-6">
          {/* Tabs, search, filter */}
          <div className="flex flex-col w-full gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col w-full justify-between lg:flex-row items-start gap-3 lg:items-center">
              <div className="flex bg-slate-50 rounded-full p-1 mt-4">
                <button
                  onClick={() => setActiveTab("status")}
                  className={`px-4 py-2 text-sm font-medium rounded-full ${
                    activeTab === "status"
                      ? "bg-white shadow-md text-pink-950"
                      : "text-neutral-600"
                  }`}
                >
                  الشحنات
                </button>
                {/* Other tabs commented out as in original */}
              </div>

              <div className="relative lg:w-64">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <img
                    src="/Icones/search.svg"
                    className="w-4 h-4"
                    alt="Search icon"
                  />
                </div>
                <input
                  type="text"
                  className="w-full pr-10 text-sm border border-gray-300 rounded-full py-3 px-5 text-right focus:border-black focus:outline-none"
                  placeholder="ابحث عن الشحنة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-full mt-4 md:mt-6 overflow-x-auto">
            <div className="min-w-[600px] md:min-w-full">
              {loading && <p>جاري تحميل الشحنات...</p>}
              {error && <p className="text-red-500">{error}</p>}

              {!loading && !error && (
                <>
                  {activeTab === "status" && (
                    <ShipmentStatusTable 
                      data={filteredShipments} 
                      activeTab="status" 
                    />
                  )}
                  {activeTab === "canceled" && (
                    <ShipmentCanceled 
                      data={filteredShipments} 
                      activeTab="canceled" 
                    />
                  )}
                  {activeTab === "return" && (
                    <ShipmentReturn 
                      data={filteredShipments} 
                      activeTab="return" 
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </article> 

      </div>
    </div>
  );
};

export default Shipments;