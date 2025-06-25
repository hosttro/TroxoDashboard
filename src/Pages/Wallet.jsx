import { useEffect, useState } from "react";
import WalletCard from "../Components/Wallet/WalletCard";
import RechargeSection from "../Components/Wallet/RechargeSection";
import TransactionTable from "../Components/Wallet/TransactionTable";
import axios from "axios";

export default function Wallet() {
  const [balance, setBalance] = useState(0);

  // ✅ جلب رصيد المحفظة من API
  const fetchWalletBalance = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token is required");
      return;
    }
    try {
      const res = await axios.get(
        `https://troxo.runasp.net/api/wallet/entry/aaabe50d-5de7-4ec9-608f-08dda8150359`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBalance(res.data.data.balance); // تأكد أن API يعيد { balance: xxx }
    } catch (err) {
      console.error("فشل في تحميل رصيد المحفظة:", err);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-right">المحفظة</h1>

      {/* ✅ عرض الرصيد */}
      <WalletCard balance={balance} />

      {/* ✅ قسم شحن الرصيد */}
      <RechargeSection onSuccess={fetchWalletBalance} />

      {/* ✅ جدول العمليات */}
      <TransactionTable />
    </div>
  );
}
