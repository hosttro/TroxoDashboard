import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageSwipper from "../../Components/ImageSwipper";
import { useAppContext } from "../../context/AppContext";

const ConfirmEmail = () => {
  const { state } = useAppContext();             // ← هنا
  const emailOrPhone = state.forgetPassword.emailOrPhone;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
    server: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // إذا لم نجد emailOrPhone في الـ Context، نعيد المستخدم  
  useEffect(() => {
    if (!emailOrPhone) {
      navigate("/forgetpassword");
    }
  }, [emailOrPhone, navigate]);

  const inputClass = (field) =>
    `w-full px-4 py-2 border rounded-lg text-right focus:outline-none ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  const handleOtpChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOtp(digits);
    if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }));
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (errors.newPassword)
      setErrors((prev) => ({ ...prev, newPassword: "" }));
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const validate = () => {
    const errs = { otp: "", newPassword: "", confirmPassword: "", server: "" };
    if (!otp) {
      errs.otp = "الرجاء إدخال رمز التحقق";
    } else if (otp.length !== 4) {
      errs.otp = "الرمز يجب أن يتكون من 4 أرقام";
    }
    if (!newPassword) {
      errs.newPassword = "الرجاء إدخال كلمة المرور الجديدة";
    } else if (newPassword.length < 6) {
      errs.newPassword = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }
    if (!confirmPassword) {
      errs.confirmPassword = "الرجاء تأكيد كلمة المرور";
    } else if (newPassword !== confirmPassword) {
      errs.confirmPassword = "كلمة المرور والتأكيد غير متطابقين";
    }
    setErrors(errs);
    return !errs.otp && !errs.newPassword && !errs.confirmPassword;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;

      setLoading(true);
      setErrors((prev) => ({ ...prev, server: "" }));

      try {
        const res=await axios.post(
          "https://troxo.runasp.net/api/Users/ConfirmPasswordReset",
          {
            EmailOrPhone: emailOrPhone,
            Otp: otp,
            NewPassword: newPassword,
            ConfirmPassword: confirmPassword,
          }
        );
        console.log(res);
        
        navigate("/signin");
      } catch (err) {
        let msg = "حدث خطأ أثناء تأكيد إعادة تعيين كلمة المرور";
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          switch (status) {
            case 400:
              msg = "البيانات المرسلة غير صحيحة";
              break;
            case 404:
              msg = "لم يتم العثور على المستخدم";
              break;
            case 410:
              msg = "رمز إعادة التعيين منتهي الصلاحية";
              break;
            case 422:
              msg = "فشل تحقق البيانات، يرجى التأكد";
              break;
            case 429:
              msg = "تم تجاوز عدد المحاولات، حاول لاحقًا";
              break;
            case 500:
              msg = "خطأ في الخادم، يرجى المحاولة لاحقًا";
              break;
            default:
              msg = err.response?.data?.message || msg;
          }
        } else {
          msg = "فشل الاتصال، تحقق من اتصالك بالإنترنت";
        }
        setErrors((prev) => ({ ...prev, server: msg }));
        console.error(err);
        
      } finally {
        setLoading(false);
      }
    },
    [emailOrPhone, otp, newPassword, confirmPassword, navigate]
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
              تأكيد إعادة تعيين كلمة المرور
            </h2>
            <p className="text-gray-600 text-right mt-2">
              تم إرسال رمز التحقق إلى: <strong>{emailOrPhone}</strong>
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="أدخل رمز التحقق"
                  className={inputClass("otp")}
                  value={otp}
                  onChange={handleOtpChange}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="كلمة المرور الجديدة"
                  className={inputClass("newPassword")}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  className={inputClass("confirmPassword")}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {errors.server && (
                <p className="text-red-500 text-center">{errors.server}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-4 py-2 rounded-lg transition duration-300 ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#FFDDDD] hover:bg-gray-200"
                }`}
              >
                {loading ? "جاري المعالجة..." : "تأكيد"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
