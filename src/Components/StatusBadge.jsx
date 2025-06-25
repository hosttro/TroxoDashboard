const statusStyles = {
  preparing: "text-blue-300",
  cancelled: "text-red-400",
  delivered: "text-green-500",
  undelivered: "text-yellow-400",
  pending: "text-orange-400",
};
// ملغاه احمر 
// تم التسليم  للعميل اخضر
//مرتجع اصفر 
//1   ازرق
// برتقالي 
//ر






export const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
     
      case "لم يتم تسليم الشحنة لشركة الشحن" :
        return statusStyles.preparing;
      case "تم تسليم الشحنة لشركة الشحن " :
        return statusStyles.pending;
       case "تم التسليم للعميل":
        return statusStyles.delivered;
         case " تم الغاء الارسال":
        return statusStyles.cancelled;

      case "تعذر التسليم للعميل":
        return statusStyles.undelivered;
      default:
        return statusStyles.pending; // Default case if no match found
    }
  };

  return (
    <span className={`text-xs font-bold ${getStatusClass()}`} role="status">
      {status}
    </span>
  );
};
