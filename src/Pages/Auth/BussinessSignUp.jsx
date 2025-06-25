// src/Pages/Auth/BussinessSignUp.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { registerBusiness } from "../../api/authService";
import axios from "axios";

const BussinessSignUp = () => {
  const { state, dispatch } = useAppContext();
  const { personalSignUp, businessSignUp } = state;
  const [StorePlatform,setStorePlatform]=useState([]);
  const [userType,setUserType]=useState([]);
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    countryCode,
    password,
    confirmPassword,
    policyCheck,
    file,
  } = personalSignUp;

  const {
    entityClassification,
    commercialNumber,
    taxNumber,
    websiteLink,
    storePlatform,
  } = businessSignUp;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBusinessChange = (field) => (e) =>
    dispatch({ type: "UPDATE_BUSINESS_FIELD", field, value: e.target.value });

  const validateAll = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      setError("الحقول الأساسية مطلوبة");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("صيغة البريد غير صحيحة");
      return false;
    }
    if (!/^[0-9]{9,15}$/.test(phoneNumber)) {
      setError("رقم الجوال غير صالح");
      return false;
    }
    if (!policyCheck) {
      setError("يجب الموافقة على الشروط");
      return false;
    }
    if (!entityClassification) {
      setError("تصنيف الكيان مطلوب");
      return false;
    }
    // if (!commercialNumber.trim()) {
    //   setError("رقم السجل التجاري مطلوب");
    //   return false;
    // }
    // if (!taxNumber.trim()) {
    //   setError("رقم الضريبة مطلوب");
    //   return false;
    // }
    // if (!websiteLink.trim()) {
    //   setError("رابط الموقع مطلوب");
    //   return false;
    // }
    if (!storePlatform) {
      setError("منصة المتجر مطلوبة");
      return false;
    }
    setError("");
    return true;
  };

  const getStorePlateform = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `https://troxo.runasp.net/api/StorePlatforms/GetAll`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      setStorePlatform(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getUserType =async()=>{
    try{
      const res=await axios.get('https://troxo.runasp.net/api/UsersType/GetAll');
        console.log(res);
        setUserType(res.data.data);
    }catch(err){
      console.log(err);
    }
  }
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateAll()) return;
      setLoading(true);

      const payload = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        PhoneNumber: phoneNumber,
        Password: password,
        ConfirmPassword: confirmPassword,
        UserTypeId: entityClassification,
        StorePlateformId: storePlatform,
        CommercialRegister: null,
        CommercialRegisterFile: null,
        TaxNumber: null,
        Website: null,
        RecaptchaToken: "anything",
      };
      console.log(payload);
      
      //
      try {
        const res = await registerBusiness(payload);
        if (res.statusCode === 200 && res.data.success) {
          dispatch({ type: "CLEAR_FORM" });
          navigate("/otp");
        } else {
          // استخراج أول رسالة خطأ
          const msg = res.data?.errors?.[0] || res.errors || "فشل إنشاء الحساب";
          setError(msg);
        }
        if (!res.data.success) {
          setError(res.data.errors);
        }
      } catch (err) {
        // استثناء غير متوقع (شبكة أو  غير JSON)
        let msg = "تعذر الاتصال بالخادم، حاول لاحقًا";
        if (err && typeof err === "object") {
          // إذا كانت لدينا بنية خطأ من registerBusiness: throw error.response.data
          msg = err.errors || err.message || msg;
        }
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [
      firstName,
      lastName,
      email,
      phoneNumber,
      countryCode,
      password,
      confirmPassword,
      policyCheck,
      file,
      entityClassification,
      commercialNumber,
      taxNumber,
      websiteLink,
      storePlatform,
      dispatch,
    ]
  );
  useEffect(() => {
    getStorePlateform();
    getUserType();
    return () => {
      
    };
  }, []);
  return (
    <form className="mt-6 space-y-4 text-right" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="entityClassification" className="block text-sm mb-1">
          تصنيف الكيان
        </label>
        <select
          id="entityClassification"
          name="entityClassification"
          value={entityClassification}
          onChange={handleBusinessChange("entityClassification")}
          className="w-full border p-2 rounded"
        >
          <option value="">-- اختر تصنيفاً --</option>
          {
            userType?.map((item,index)=>(
              <option key={index} value={item.id}>{item.typeName}</option>
            ))
          }
        </select>
      </div>

      {/* <div>
        <label htmlFor="commercialNumber" className="block text-sm mb-1">
          رقم السجل التجاري
        </label>
        <input
          type="text"
          id="commercialNumber"
          name="commercialNumber"
          value={commercialNumber}
          onChange={handleBusinessChange("commercialNumber")}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="taxNumber" className="block text-sm mb-1">
          الرقم الضريبي
        </label>
        <input
          type="text"
          id="taxNumber"
          name="taxNumber"
          value={taxNumber}
          onChange={handleBusinessChange("taxNumber")}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="websiteLink" className="block text-sm mb-1">
          رابط الموقع
        </label>
        <input
          type="text"
          id="websiteLink"
          name="websiteLink"
          value={websiteLink}
          onChange={handleBusinessChange("websiteLink")}
          className="w-full border p-2 rounded"
        />
      </div> */}

      <div>
        <label htmlFor="storePlatform" className="block text-sm mb-1">
          منصة المتجر
        </label>
        <select
          id="storePlatform"
          name="storePlatform"
          value={storePlatform}
          onChange={handleBusinessChange("storePlatform")}
          className="w-full border p-2 rounded"
        >
          <option value="">-- اختر منصة المتجر --</option>
          {
            StorePlatform?.map((item,index)=>(
              <option key={index} value={item.id}>{item.plateformName}</option>
            ))
          }
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-between gap-2 mt-4 flex-col md:flex-row">
        <Link
          to="/"
          className="w-full bg-[#FFDDDD] px-12 py-2 rounded-lg text-center"
        >
          الخطوة السابقة
        </Link>
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-12 py-2 rounded-lg ${
            loading ? "bg-gray-300" : "bg-[#FFDDDD]"
          }`}
          aria-busy={loading}
        >
          {loading ? "جاري المعالجة..." : "إنشاء حساب"}
        </button>
      </div>
    </form>
  );
};

export default BussinessSignUp;
