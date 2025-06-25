import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ImageSwipper from "../../Components/ImageSwipper";
import { useAppContext } from "../../context/AppContext";
import { confirmOtp, resendOtp } from "../../api/authService"; // ✅ تم استبدال axios بالدوال

const OTP = () => {
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const { state } = useAppContext();
  const { personalSignUp } = state;
  const { phoneNumber, countryCode } = personalSignUp;
  const fullPhoneNumber = `${countryCode}${phoneNumber}`;

  const navigate = useNavigate();

  const handleOtpChange = useCallback(
    (e) => {
      const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
      setOtpCode(digits);
      if (error) setError("");
    },
    [error]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (otpCode.length !== 4) {
        setError("يرجى إدخال رمز مكون من 4 أرقام");
        return;
      }

      setLoading(true);
      try {
        // ✅ استخدام confirmOtp
        await confirmOtp({
          PhoneNumber: fullPhoneNumber,
          Otp: otpCode
        });

        navigate("/signin");
      } catch (err) {
        const status = err?.response?.status;
        if (status === 400) {
          setError("الرمز غير صالح أو الطلب غير صحيح");
        } else if (status === 401) {
          setError("رمز OTP غير مصرح به أو منتهي الصلاحية");
        } else if (status === 404) {
          setError("المستخدم غير موجود");
        } else if (status === 422) {
          setError("فشل التحقق، يرجى التأكد من الرمز");
        } else if (status === 429) {
          setError("تم تجاوز عدد المحاولات، حاول لاحقًا");
        } else {
          setError("فشل التحقق من الرمز، حاول مرة أخرى");
        }
      } finally {
        setLoading(false);
      }
    },
    [otpCode, fullPhoneNumber, navigate]
  );

  const handleResend = useCallback(async () => {
    if (resendCooldown > 0 || resendLoading) return;

    setError("");
    setResendLoading(true);
    try {
      // ✅ استخدام resendOtp
      await resendOtp({
        PhoneNumber: fullPhoneNumber
      });
      setResendCooldown(60);
    } catch (err) {
      const msg = err?.response?.data?.message || "فشل إعادة إرسال الرمز";
      setError(msg);
    } finally {
      setResendLoading(false);
    }
  }, [resendCooldown, resendLoading, fullPhoneNumber]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl xl:max-w-full overflow-hidden flex flex-col md:flex-row rounded-lg">
        <ImageSwipper />

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative min-h-screen">
          <div className="absolute top-8 left-8">
            <img src="/images/Logo.png" alt="Logo" className="w-32" />
          </div>

          <div className="w-full max-w-md mt-24">
            <h2 className="text-2xl font-bold text-right text-gray-900">
              تحقق من الرمز
            </h2>
            <p className="text-gray-600 text-right mt-2">
              تم إرسال رمز التحقق إلى: <strong>{fullPhoneNumber}</strong>
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="أدخل الرمز"
                className={`w-full px-4 py-2 border rounded-lg text-right ${
                  error ? "border-red-500" : ""
                }`}
                value={otpCode}
                onChange={handleOtpChange}
              />
              {error && (
                <p className="text-red-500 text-sm text-right">{error}</p>
              )}

              <p
                onClick={handleResend}
                className={`text-sm text-[#B1B1B2] text-right cursor-pointer hover:underline ${
                  resendCooldown > 0 || resendLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {resendCooldown > 0
                  ? `أعد الإرسال بعد ${resendCooldown} ث`
                  : resendLoading
                  ? "جاري إعادة الإرسال..."
                  : "لم تتلقَ رمزًا؟ أعد الإرسال"}
              </p>

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-4 py-2 rounded-lg transition duration-300 ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#FFDDDD] hover:bg-gray-200"
                }`}
              >
                {loading ? "جاري التحقق..." : "تحقق"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
