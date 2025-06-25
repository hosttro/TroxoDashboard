/* eslint-disable react/prop-types */
import { Fragment, useEffect, useImperativeHandle, useState } from "react";
import { NavLink } from "react-router";
import MenuShipment from "./../Menu/MenuShipment";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

const ShipmentTable = ({ ref, value, reCall }) => {
  const {
    state: { storeId },
  } = useAppContext();
  console.log({ ref, value, reCall });
let [noData, setNoData] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };
  const [selectedRow, setSelectedRow] = useState(false);
  const [shipmentData, setShipmentData] = useState([]);
  console.log("shipmentData", shipmentData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleMenuToggle = () => {
    setSelectedRow(!selectedRow);
  };
console.log({shipmentData});

  const handleGetAllShipment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token is requierd");
      return;
    }
    console.log("store id", value);
    try {
      const res = await axios.get(
        `https://troxo.runasp.net/api/Shipments/GetAll?storeId=${storeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("get all ship", res.data.data);
      console.log("get all ship", res.data);
      setShipmentData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteShipment = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token is required");
      return;
    }
    try {
      const res = await axios.delete(
        `https://troxo.runasp.net/api/Shipments/Delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      await handleGetAllShipment();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    handleDeleteShipment(deleteId);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  useImperativeHandle(ref, () => ({
    handleGetAllShipment,
  }));

  useEffect(() => {
    handleGetAllShipment();
  }, [storeId, reCall]);

  return (
    <>
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        message=" هل أنت متأكد أنك تريد حذف هذه الشحنة ؟"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
      <div className="flex flex-col  gap-2">
        <section
          className="flex flex-col p-4 bg-white rounded-lg border border-gray-200 "
          dir="rtl"
        >
          {/* Header Section - معدل للاستجابة */}
          <div className="flex flex-row justify-between items-start md:items-center gap-3 mb-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-gray-800">
                قائمة طلبات الشحن
              </h2>
              <time className="text-xs text-gray-500">
               <span className="hidden md:inline">تاريخ آخر تحديث:</span> {new Date().toLocaleDateString("ar-EG", {
                 year: "numeric",
                 month: "long",
                 day: "numeric",
               })}
              </time>
            </div>

            <div className="flex justify-center relative">
              <button
                onClick={() => handleMenuToggle(shipmentData.id)}
                className="text-gray-400 hover:text-red-900"
              >
                <svg
                  className="w-6 h-6 rotate-90 bg-red-100 rounded-lg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              {selectedRow && (
                <div className="absolute left-5 top-[75%] mt-1 z-50">
                  <MenuShipment onClose={() => setSelectedRow(true)} />
                </div>
              )}
            </div>
          </div>

          {/* جدول متجاوب مع تمرير أفقي على الجوال فقط */}
          <div className="mt-5 overflow-auto">
            <table className="w-full table-auto border-collapse border-spacing-0">
              {/* Table Header - معدل للاستجابة */}
              <thead className="bg-gray-50">
                <tr className="">
                  {/* عمود العميل */}
                  <th className=" px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className=" md:flex flex-col items-center">
                        <img
                          src="/Icones/Sortup.svg"
                          alt="تصاعدي"
                          className="w-3 h-3"
                        />
                        <img
                          src="/Icones/Sortdown.svg"
                          alt="تنازلي"
                          className="w-3 h-3 mt-1"
                        />
                      </div>
                      <img
                        src="/Icones/Profile.svg"
                        alt="عميل"
                        className="w-4 h-4"
                      />
                      <span>العميل</span>
                    </div>
                  </th>

                  {/* عمود المنتج */}
                  <th className="px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500 ">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src="/Icones/box.svg"
                        alt="منتج"
                        className="w-4 h-4"
                      />
                      <span>المنتج</span>
                    </div>
                  </th>

                  {/* عمود الكمية */}
                  <th className="px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500 ">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src="/Icones/Quantity.svg"
                        alt="الشركة"
                        className="w-4 h-4"
                      />
                      <span>الشركة</span>
                    </div>
                  </th>

                  {/* عمود السعر */}
                  <th className="px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500 ">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src="/Icones/price.svg"
                        alt="سعر"
                        className="w-4 h-4"
                      />
                      <span>السعر</span>
                    </div>
                  </th>

                  {/* عمود الإجراءات */}
                  <th className="px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500 ">
                    <span>الإجراءات</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {shipmentData.map((shipment) => (
                  <Fragment key={shipment.id}>
                    <tr
                      key={shipment.id}
                      className={`hover:bg-gray-50 ${
                        expandedRow === shipment.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => handleRowClick(shipment.id)}
                    >
                      <td className="px-3 py-3 md:px-4 md:py-4 text-center text-xs md:text-sm whitespace-nowrap">
                        {shipment.customerName}
                      </td>
                      <td className="px-3 py-3 md:px-4 md:py-4 text-center text-xs md:text-sm whitespace-nowrap">
                        {shipment.productName}
                      </td>
                      <td className="px-3 py-3 md:px-4 text-center md:py-4 text-xs md:text-sm whitespace-nowrap">
                        {shipment.companyName}
                      </td>
                      <td className="px-3 py-3 md:px-4 text-center md:py-4 text-xs md:text-sm whitespace-nowrap">
                        {shipment.previewRate}
                      </td>
                      <td className="px-3 py-3 md:px-4 md:py-4 text-xs md:text-sm whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1 text-gray-500 hover:text-gray-700 cursor-pointer">
                            <img
                              src="/Icones/Edit.svg"
                              alt="Edit icone"
                              className="w-6"
                            />
                          </button>
                          <button
                            className="p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(shipment.id);
                            }}
                          >
                            <img
                              src="/Icones/Delete.svg"
                              alt="delete icone"
                              className="w-6"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expandedRow === shipment.id && (
                      <tr>
                        <td colSpan="5" className="px-2 py-3 bg-blue-50">
                          <div className="p-3 md:p-4 text-center rounded-xl border border-solid bg-slate-50 border-neutral-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                              <DetailItem
                                label="المتجر"
                                value={shipment.shippingCompanyName}
                              />
                              <DetailItem
                                label="العميل"
                                value={shipment.customerName}
                              />
                              <DetailItem
                                label="المنتج"
                                value={shipment.productName}
                              />
                              <DetailItem
                                label="الكمية"
                                value={shipment.quantity}
                              />
                              <DetailItem
                                label="السعر"
                                value={shipment.previewRate}
                              />
                              <DetailItem
                                label="الارتفاع"
                                value={shipment.height}
                              />
                              <DetailItem
                                label="العرض"
                                value={shipment.width}
                              />
                              <DetailItem
                                label="الطول"
                                value={shipment.length}
                              />
                              <DetailItem
                                label="الوزن"
                                value={shipment.chargeableWeight}
                              />
                            </div>
                            <button
                              onClick={() => setExpandedRow(null)}
                              className="text-xs  md:text-sm text-center text-red-500 hover:text-red-700 mt-2"
                            >
                              إغلاق التفاصيل
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Confirm Button - معدل للاستجابة */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {shipmentData.length > 0 ?  
              <NavLink to="/home/shipments/checkout">
              <button   className="px-4 py-2 cursor-pointer md:px-6 md:py-4 text-sm md:text-base font-extrabold bg-red-100 text-pink-950 rounded-xl w-full sm:w-auto min-w-[200px]">
                متابعة الدفع
              </button>
            </NavLink>
            :   
        
              <button onClick={()=>{
                
                if (shipmentData.length == 0) {
                  setNoData(!noData);
                } 
              }}  className="px-4 py-2 cursor-pointer md:px-6 md:py-4 text-sm md:text-base font-extrabold bg-red-100 text-pink-950 rounded-xl w-full sm:w-auto min-w-[200px]">
                متابعة الدفع
              </button>
         
            }
          
          </div>
            {noData && (
              <div className="text-red-500 text-center mt-8 text-sm md:text-base">  
               يرجى إضافة شحنة للمتابعة 
                </div>
            )}
        </section>
      </div>
    </>
  );
};

export default ShipmentTable;

// مكون مساعد لعرض التفاصيل
const DetailItem = ({ label, value }) => (
  <div className="flex gap-2 min-w-[150px]">
    <div className="text-xs md:text-sm font-semibold text-zinc-400">
      {label}
    </div>
    <div className="text-xs md:text-sm font-semibold text-slate-950">
      {value}
    </div>
  </div>
);

const ConfirmDeleteModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4 text-center">{message}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-300">
            الغاء
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-100 textslate-950 rounded "
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};
