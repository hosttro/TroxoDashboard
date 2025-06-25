// src/Pages/Auth/PersonalSignUp.jsx

import { useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const PersonalSignUp = () => {
  const { state, dispatch } = useAppContext();
  const { personalSignUp } = state;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    countryCode,
    password,
    confirmPassword,
    policyCheck,
  } = personalSignUp;

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    dispatch({ type: "UPDATE_SIGNUP_FIELD", field, value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-lg text-right ${
      errors[field] ? "border-red-500" : ""
    }`;

  const validateAll = () => {
    const errs = {};
    if (!firstName.trim())
      errs.firstName = "الاسم الأول لا يمكن أن يكون فارغًا";
    if (!lastName.trim()) errs.lastName = "اسم العائلة لا يمكن أن يكون فارغًا";
    if (!email.trim()) {
      errs.email = "البريد الإلكتروني لا يمكن أن يكون فارغًا";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email))
        errs.email = "تنسيق البريد الإلكتروني غير صالح";
    }
    if (!phoneNumber.trim()) {
      errs.phoneNumber = "رقم الهاتف لا يمكن أن يكون فارغًا";
    } else {
      const phoneRegex = /^[0-9]{9,15}$/;
      if (!phoneRegex.test(phoneNumber)) {
        errs.phoneNumber = "رقم الهاتف يجب أن يكون بين 9 و15 رقمًا";
      }
    }
    if (!password) {
      errs.password = "كلمة المرور لا يمكن أن تكون فارغة";
    } else if (password.length < 6) {
      errs.password = "كلمة المرور يجب أن تتكون من 6 أحرف على الأقل";
    }
    if (!confirmPassword) {
      errs.confirmPassword = "يرجى تأكيد كلمة المرور";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "كلمتا المرور غير متطابقتين";
    }
    if (!policyCheck) {
      errs.policyCheck = "يجب الموافقة على الشروط وسياسة الخصوصية";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGoToNextStep = useCallback(async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    navigate("/bussinessSignUp");
  });

  return (
    <div className="mt-6">
      <form className="space-y-5" onSubmit={handleGoToNextStep}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="الاسم الأول"
              className={inputClass("firstName")}
              value={firstName}
              onChange={handleChange("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="اسم العائلة"
              className={inputClass("lastName")}
              value={lastName}
              onChange={handleChange("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            className={inputClass("email")}
            value={email}
            onChange={handleChange("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <select
            name="countryCode"
            className="w-full px-4 py-3 border rounded-lg text-right focus:ring-2"
            value={countryCode}
            onChange={handleChange("countryCode")}
          >
            <option value="+966">🇸🇦 +966</option>
          </select>
          <div className="w-full">
            <input
              type="tel"
              name="phoneNumber"
              placeholder="5×× ××× ×××"
              className={inputClass("phoneNumber")}
              pattern="[0-9]{9,15}"
              maxLength={9}
              minLength={9}
              value={phoneNumber}
              onChange={handleChange("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            className={inputClass("password")}
            value={password}
            onChange={handleChange("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="تأكيد كلمة المرور"
            className={inputClass("confirmPassword")}
            value={confirmPassword}
            onChange={handleChange("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <label htmlFor="terms" className="text-gray-600 text-sm text-right">
            أوافق على{" "}
            <NavLink to="/terms" className="text-red-500 hover:underline">
              الشروط
            </NavLink>{" "}
            و{" "}
            <NavLink to="/privacy" className="text-red-500 hover:underline">
              سياسة الخصوصية
            </NavLink>
          </label>
          <input
            type="checkbox"
            id="terms"
            name="policyCheck"
            className={`w-5 h-5 accent-red-200 rounded ${
              errors.policyCheck ? "ring-2 ring-red-500" : ""
            }`}
            checked={policyCheck}
            onChange={handleChange("policyCheck")}
          />
        </div>
        {errors.policyCheck && (
          <p className="text-red-500 text-sm mt-1 text-right">
            {errors.policyCheck}
          </p>
        )}

        {/* ✅ رسالة خطأ خادم */}
        {errors.server && (
          <p className="text-red-500 text-sm text-center">{errors.server}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#FFDDDD] text-gray-900 py-2 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          الخطوة التالية
        </button>
      </form>
    </div>
  );
};

export default PersonalSignUp;
