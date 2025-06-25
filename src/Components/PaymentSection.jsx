import axios from "axios";
import SuccessShimpentModal from "../Components/Modal/SuccessShimpentModel";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function PaymentSection({ totalPrice, getOrders }) {
  const [showSuccessShipmentModal, setShowSuccessShipmentModal] =useState(false);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  let [balanceUrl, setBalanceUrl] = useState([])
  // ✅ جلب رصيد المحفظة من API
  console.log("totalPrice from payment section",showSuccessShipmentModal);
  
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

  function getIds(arr) {
   
    console.log("getIds function called with array:", arr);
    
    if (!arr) {
      return;
    }
    return arr.map((item) => item.id);
  }

  const OnSumbit = async (e) => {
    e.preventDefault();
    if (balance < totalPrice) {
      setError("balance is not enough");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token is required");
      return;
    }

    const ids = getIds(orders);
    console.log("ids array", ids);

    const payload = {
      shipmentIds: ids,
      RecaptchaToken: "sfdsfsdfdsfsdfsdf"
    };
    console.log("payload", payload);
   
  
       await axios.post(
        `https://troxo.runasp.net/api/Shipping/create-shipment`,
        payload, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then((res) => {
        console.log("response from create shipment", res.data);
        let URLs= res.data.map(item => item.labelUrl);
        setBalanceUrl(URLs); 
// تحديث الرصيد بعد إنشاء الشحنة
        setShowSuccessShipmentModal(true);
      }
      ).catch((err) => {
        console.error("Error creating shipment:", err);
        setError("حدث خطأ أثناء إنشاء الشحنة. يرجى المحاولة مرة أخرى.");
      });
    
  };

  useEffect(() => {
    setOrders(getOrders);
    return () => {};
  }, [getOrders]);

  console.log("orders from pay", orders);

  return (
    <>
      <section className="flex flex-col gap-3 justify-center  items-center px-11 py-8 mt-6 w-full tracking-wide bg-white rounded-lg border-2 border-solid border-zinc-200 max-md:px-5 max-md:max-w-full">
        <div className="flex max-md:flex-col gap-3 justify-center  items-center ">
          <h3 className="text-lg font-semibold text-gray-800">طريقة الدفع</h3>
          <div className="flex gap-10 px-12 py-4  max-w-full text-base font-semibold whitespace-nowrap bg-white rounded-lg border-2 border-solid border-zinc-200 w-[350px] max-md:px-5">
            <span className="my-auto text-gray-800">الرصيد</span>
            <div className="flex flex-1 text-pink-950">
              <span className="grow my-auto">{balance}</span>
              <img
                src="/images/CurrencyIcone.svg"
                alt="currency icone"
                className="object-contain shrink-0 aspect-square w-[27px]"
              />
            </div>
          </div>
          <button
            onClick={OnSumbit}
            className="w-full  px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg font-semibold bg-red-100 rounded-lg lg:rounded-xl hover:bg-red-200 text-pink-950 transition-colors"
          >
            دفع
          </button>
          <button className="w-full  px-8 lg:px-12 py-3 lg:py-4 text-base  font-semibold bg-gray-200 rounded-lg lg:rounded-xl hover:bg-gray-300 text-neutral-600 transition-colors">
            إلغاء الطلب
          </button>
          {showSuccessShipmentModal && (
            <SuccessShimpentModal
              labelUrl={balanceUrl}
              onClose={() => setShowSuccessShipmentModal(false)}
            />
          )}
        </div>
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      </section>
    </>
  );
}
