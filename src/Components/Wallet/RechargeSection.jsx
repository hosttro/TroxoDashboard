import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function RechargeSection({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRecharge = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setMessage("⚠️ الرجاء إدخال مبلغ صحيح");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token is required");
      return;
    }
    const payload = {
      amount: amount,
      walletId: "aaabe50d-5de7-4ec9-608f-08dda8150359",
      Currency: "SAR",
    };
    try {
      const res = await axios.post(
        "https://troxo.runasp.net/api/Payments/initiate",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      localStorage.setItem("pendingTrackId", res.data.trackId);
      window.location.href = res.data.paymentUrl;
      await onSuccess();
      // setShowSuccessShipmentModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="p-4 md:p-5 mb-5 rounded-lg border border-solid bg-slate-50 border-pink-950">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* النص وحقول الإدخال */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-pink-950 mb-2 text-right">
              أعد شحن حسابك
            </h2>
            <p className="text-sm text-neutral-400 text-right">
              ندعم Mastercard و Visa و American Express و Mada.
            </p>
          </div>

          <div className="flex max-lg:flex-col flex-row gap-3">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="أدخل المبلغ للشحن"
                className="w-full px-4 py-3 h-12 bg-gray-200 rounded-xl border-none focus:ring-2 focus:ring-pink-950 focus:outline-none text-right"
                aria-label="المبلغ للشحن"
              />
            </div>

            <button
              onClick={handleRecharge}
              disabled={loading}
              className="h-12 px-6 text-base font-bold bg-red-100 rounded-xl cursor-pointer border-none text-pink-950 hover:bg-red-200 transition-colors min-w-[120px] md:w-40 lg:w-48"
            >
              {loading ? "جاري الدفع..." : "دفع"}
            </button>
          </div>

          {message && (
            <p
              className={`text-sm mt-2 text-${
                message.startsWith("✅") ? "green" : "red"
              }-600`}
            >
              {message}
            </p>
          )}
        </div>

        {/* صورة البطاقات */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/images/Recharger.png"
            alt="بطاقات الدفع"
            className="w-[180px] md:w-[200px] lg:w-[220px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}

RechargeSection.propTypes = {
  onSuccess: PropTypes.func,
};
