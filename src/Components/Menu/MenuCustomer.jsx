/* eslint-disable react/prop-types */
import axios from "axios";
import EditClientModal from "../Modal/EditClientModal";
import { MenuItem } from "./MenuItem";
import { useState } from "react";
import { getAllCustomers } from "../../Utils/CallAPi";

const menuItems = [
  {
    text: "تعديل العميل",
    icon: `/Icones/Edit.svg`,
    action: "Edit",
  },
  {
    text: "حذف العميل",
    icon: `/Icones/Delete.svg`,
    action: "Delete",
  },
];

export default function MenuCustomer({customerId}) {
  const [activeModal, setActiveModal] = useState(null);
  const handleMenuItemClick = async(action) => {
    if (action === "Edit") {
      console.log(action);
      setActiveModal("Edit");
    }
    if (action === "Delete") {
      console.log({ customerId });
      
  
      await axios.delete(`https://troxo.runasp.net/api/Customers/Delete/5592e794-a5f6-49ce-8837-57bab84a2131` ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }}).then((res) => {
          console.log("Customer deleted successfully:", res.data);
          getAllCustomers()
        }).catch((err) => {
          console.error("Error deleting customer:", err);
        });
      // بعد حذف العميل، يمكنك تحديث الحالة أو إعادة تحميل البيانات

      setActiveModal("Delete");
    }
  
    // يمكنك إضافة حالات أخرى هنا
  };
  return (
    <div
      className="bg-white rounded-lg shadow-sm w-[185px] py-2 border border-gray-200"
      // منع إغلاق القائمة عند النقر عليها
    >
      <div className="flex flex-col items-start space-y-1 px-2">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            text={item.text}
            icon={item.icon}
            textColor={item.textColor}
            className="hover:bg-gray-100 rounded px-2 py-1"
            onClick={() => handleMenuItemClick(item.action)}
          />
        ))}
        {/* عرض المودال عند النقر */}
        {activeModal === "Edit" && (
          <EditClientModal customerId={customerId} onClose={() => setActiveModal(null)} />
        )}
      </div>
    </div>
  );
}
