// src/Pages/Auth/ForgetPassword.jsx

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ImageSwipper from "../../Components/ImageSwipper";
import { useAppContext } from "../../context/AppContext";
import { requestPasswordReset } from "../../api/authService"; // ✅ ربط API

const ForgetPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [errors, setErrors] = useState({ emailOrPhone: "", server: "" });
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const inputClass = `w-full px-4 py-2 border rounded-lg text-right focus:outline-none ${
    errors.emailOrPhone ? "border-red-500" : "border-gray-300"
  }`;

  const handleChange = (e) => {
    setEmailOrPhone(e.target.value);
    if (errors.emailOrPhone) {
      setErrors((prev) => ({ ...prev, emailOrPhone: "" }));
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // ✅ تم نقل validate هنا لتفادي تحذير ESLint
      const validate = () => {
        const errs = { emailOrPhone: "", server: "" };
        const v = emailOrPhone.trim();

        if (!v) {
          errs.emailOrPhone = "يرجى إدخال البريد الإلكتروني أو رقم الهاتف";
        } else if (v.includes("@")) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(v)) {
            errs.emailOrPhone = "تنسيق البريد الإلكتروني غير صالح";
          }
        } else {
          const phoneRegex = /^[0-9]{9,15}$/;
          if (!phoneRegex.test(v)) {
            errs.emailOrPhone = "رقم الهاتف يجب أن يكون بين 9 و15 رقمًا";
          }
        }

        setErrors(errs);
        return !errs.emailOrPhone;
      };

      if (!validate()) return;

      setLoading(true);
      setErrors({ emailOrPhone: "", server: "" });

      try {
        // ✅ استخدام requestPasswordReset
        await requestPasswordReset({
          EmailOrPhone: emailOrPhone.trim()
        });

        dispatch({ type: "SET_FORGOT_EMAIL", payload: emailOrPhone.trim() });
        navigate("/confirmEmail");
      } catch (err) {
        let msg = "حدث خطأ أثناء طلب إعادة تعيين كلمة المرور";
        const status = err?.response?.status;

        switch (status) {
          case 400:
            msg = "البيانات المرسلة غير صحيحة";
            break;
          case 404:
            msg = "لم يتم العثور على مستخدم بهذا البريد أو الهاتف";
            break;
          case 429:
            msg = "تم تجاوز عدد المحاولات، حاول مرة أخرى لاحقًا";
            break;
          case 500:
            msg = "خطأ في الخادم، يرجى المحاولة لاحقًا";
            break;
          default:
            msg = err?.response?.data?.message || msg;
        }

        setErrors((prev) => ({ ...prev, server: msg }));
      } finally {
        setLoading(false);
      }
    },
    [emailOrPhone, dispatch, navigate]
  );

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
              نسيت كلمة المرور؟
            </h2>
            <p className="text-gray-600 text-right mt-2">
              لا تقلق، يحدث ذلك للجميع. أدخل بريدك الإلكتروني أو رقم هاتفك
              لاستعادة كلمة المرور.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="أدخل بريدك الإلكتروني أو رقم الهاتف"
                className={inputClass}
                value={emailOrPhone}
                onChange={handleChange}
              />
              {errors.emailOrPhone && (
                <p className="text-red-500 text-sm text-right">
                  {errors.emailOrPhone}
                </p>
              )}

              {errors.server && (
                <p className="text-red-500 text-sm text-center">
                  {errors.server}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full cursor-pointer mt-4 py-2 rounded-lg transition duration-300 ${
                  loading ? "bg-gray-300" : "bg-[#FFDDDD] hover:bg-gray-200"
                }`}
              >
                {loading ? "جاري الإرسال..." : "إرسال"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
