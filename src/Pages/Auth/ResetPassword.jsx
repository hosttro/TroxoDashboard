// src/Pages/Auth/ResetPassword.jsx

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ImageSwipper from "../../Components/ImageSwipper";
import { resetPassword } from "../../api/authService"; // ✅ دالة الربط مع API

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess(false);

      if (!newPassword || !confirmPassword) {
        setError("جميع الحقول مطلوبة");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("كلمتا المرور غير متطابقتين");
        return;
      }

      setLoading(true);

      try {
        // ملاحظة: يمكن تعديل Token بحسب النظام (من الرابط أو السياق)
        const dto = {
          NewPassword: newPassword,
          ConfirmPassword: confirmPassword,
          Token: "sample-token", // ← TODO: استبداله بالرمز الفعلي
        };

        await resetPassword(dto);
        setSuccess(true);
        navigate("/signin"); // أو أي صفحة نجاح
      } catch (err) {
        const msg = err?.response?.data?.message || "فشل تعيين كلمة المرور";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [newPassword, confirmPassword, navigate]
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl xl:max-w-full overflow-hidden flex flex-col md:flex-row rounded-lg">
        <ImageSwipper />

        <div className="w-full flex flex-col justify-center items-center min-h-screen md:w-1/2 p-8 relative">
          <div className="absolute top-8 left-8">
            <img src="/images/Logo.png" alt="Logo" className="w-32" />
          </div>
          <div className="w-full max-w-md mt-24">
            <h2 className="text-2xl font-bold text-right text-gray-900">
              تعيين كلمة مرور
            </h2>
            <p className="text-gray-600 text-right mt-2">
              تم إعادة تعيين كلمة المرور السابقة. يرجى تعيين كلمة مرور جديدة لحسابك.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="إنشاء كلمة المرور"
                className="w-full px-4 py-2 border text-right rounded-lg"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="تأكيد كلمة المرور"
                className="w-full px-4 py-2 border text-right rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm text-center">
                  تم تعيين كلمة المرور بنجاح
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-4 bg-[#FFDDDD] py-2 rounded-lg transition duration-300 ${
                  loading ? "bg-gray-300 cursor-not-allowed" : "hover:bg-gray-200"
                }`}
              >
                {loading ? "جاري التعيين..." : "تعيين كلمة المرور"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
