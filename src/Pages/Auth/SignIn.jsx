// // src/Pages/Auth/SignIn.jsx

// import { useState, useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import ImageSwipper from "../../Components/ImageSwipper";
// import axios from "axios";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({ email: "", password: "", server: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   useEffect(() => {
//     if (token) {
//       navigate("/home");
//     }
//   }, [token]);

//   const inputClass = (field) =>
//     `w-full px-4 py-2 border rounded-lg text-right focus:outline-none ${
//       errors[field] ? "border-red-500" : "border-gray-300"
//     }`;

//   const handleEmailChange = useCallback(
//     (e) => {
//       setEmail(e.target.value);
//       if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
//     },
//     [errors.email]
//   );

//   const handlePasswordChange = useCallback(
//     (e) => {
//       setPassword(e.target.value);
//       if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
//     },
//     [errors.password]
//   );

//   const validateInputs = () => {
//     const errs = {};
//     if (!email.trim()) errs.email = "البريد الإلكتروني مطلوب";
//     if (!password) errs.password = "كلمة المرور مطلوبة";
//     setErrors((prev) => ({ ...prev, ...errs, server: "" }));
//     return Object.keys(errs).length === 0;
//   };

//   const onSignInClick = async (e) => {
//     e.preventDefault();
//     if (!validateInputs()) return;

//     setLoading(true);
//     setErrors({ email: "", password: "", server: "" });

//     try {
//       const res = await axios.post("https://troxo.runasp.net/api/Users/Login", {
//         EmailOrPhoneNumber: email,
//         Password: password,
//       });

//       if (res.data.statusCode !== 200 && res.data.errors !== null) {
//         throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
//       }

//       const token = res.data.data.token;
//       console.log(res.data);

//       localStorage.setItem("token", token);
//       localStorage.setItem("userId", res.data.data.userData.id);
//       console.log("login success", token);
// //pop up 
//       navigate("/home");
//     } catch (err) {
//       const msg =
//         err?.response?.status === 404
//           ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
//           : err.message || "حدث خطأ غير متوقع";
//       setErrors((prev) => ({ ...prev, server: msg }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-6xl xl:max-w-full overflow-hidden flex flex-col md:flex-row rounded-lg">
//         {/* ✅ الجهة اليسار: صورة توعوية */}
//         <ImageSwipper />

//         {/* ✅ الجهة اليمين: فورم تسجيل الدخول */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative min-h-screen">
//           <div className="absolute top-8 left-8">
//             <img src="/images/Logo.png" alt="Logo" className="w-32" />
//           </div>

//           <div className="w-full max-w-md mt-24">
//             <h2 className="text-2xl font-bold text-right text-gray-900">
//               ابدأ الآن
//             </h2>
//             <p className="text-gray-600 text-right mt-2">
//               يرجى إدخال معلوماتك للوصول إلى حسابك.
//             </p>

//             <form className="mt-6 space-y-4" onSubmit={onSignInClick}>
//               <input
//                 type="email"
//                 placeholder="أدخل بريدك الإلكتروني"
//                 className={inputClass("email")}
//                 value={email}
//                 onChange={handleEmailChange}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1 text-right">
//                   {errors.email}
//                 </p>
//               )}

//               <input
//                 type="password"
//                 placeholder="أدخل كلمة المرور"
//                 className={inputClass("password")}
//                 value={password}
//                 onChange={handlePasswordChange}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1 text-right">
//                   {errors.password}
//                 </p>
//               )}

//               <div className="text-sm text-[#B1B1B2] text-right hover:text-black cursor-pointer">
//                 <a href="/forgetpassword">نسيت كلمة المرور؟</a>
//               </div>

//               {errors.server && (
//                 <p className="text-red-500 text-center text-sm">
//                   {errors.server}
//                 </p>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full mt-4 py-2 rounded-lg transition duration-300 ${
//                   loading ? "bg-gray-300" : "bg-[#FFDDDD] hover:bg-gray-200"
//                 }`}
//               >
//                 {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
//               </button>
//             </form>

//             <div className="flex items-center my-4">
//               <div className="flex-1 border-t border-gray-300"></div>
//               <span className="px-2 text-gray-600">أو</span>
//               <div className="flex-1 border-t border-gray-300"></div>
//             </div>

//             <p className="text-center text-gray-600 mt-4">
//               لا تملك حسابًا؟
//               <a href="/" className="hover:text-black">
//                 {" "}
//                 سجل مجاناً{" "}
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;



// src/Pages/Auth/SignIn.jsx

import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageSwipper from "../../Components/ImageSwipper";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [code, setCode] = useState("");
  const [submittingCode, setSubmittingCode] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (token) {
  //      navigate("/home");
  //   }
  // }, [token]);

  const inputClass = (field) =>
    `w-full px-4 py-2 border rounded-lg text-right focus:outline-none ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  const handleEmailChange = useCallback(
    (e) => {
      setEmail(e.target.value);
      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
    },
    [errors.email]
  );

  const handlePasswordChange = useCallback(
    (e) => {
      setPassword(e.target.value);
      if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
    },
    [errors.password]
  );

  const validateInputs = () => {
    const errs = {};
    if (!email.trim()) errs.email = "البريد الإلكتروني مطلوب";
    if (!password) errs.password = "كلمة المرور مطلوبة";
    setErrors((prev) => ({ ...prev, ...errs, server: "" }));
    return Object.keys(errs).length === 0;
  };

  const onSignInClick = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    setErrors({ email: "", password: "", server: "" });

    try {
      const res = await axios.post("https://troxo.runasp.net/api/Users/Login", {
        EmailOrPhoneNumber: email,
        Password: password,
      });

      if (res.data.statusCode !== 200 && res.data.errors !== null) {
        throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }

      const token = res.data.data.token;
      console.log(res.data);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", res.data.data.userData.id);
      console.log("login success", token);
    GetAuth()
      // Show modal instead of navigating directly
    //  setShowModal(true);
    } catch (err) {
      const msg =
        err?.response?.status === 404
          ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
          : err.message || "حدث خطأ غير متوقع";
      setErrors((prev) => ({ ...prev, server: msg }));
    } finally {
      setLoading(false);
    }
  };

 let  GetAuth =async() => {
    const token = localStorage.getItem("token");  
    
     await  axios.get("https://troxo.runasp.net/api/AuthAccess/GetAuth", {
     
         headers: { Authorization: `Bearer ${token}` },
                    }).then((response) => {
                             
                  console.log("User data fetched successfully:", response);
                  if (response.status == 200 && response.data.isAuthorized == true) {
                    // User is authenticated, proceed to home
                    navigate("/home");
                  } else {
                    // User is not authenticated, show error or redirect to login
                    console.error("User authentication failed:", response.data);}
                    setShowModal(true);
                  
                  
                  })      .catch((error) => {
        console.error("Error fetching user data:", error)})}

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
  

    const token = localStorage.getItem("token");  
    console.log("Submitting verification code:", verificationCode);
    
    
     await  axios.post(`https://troxo.runasp.net/api/AuthAccess/AuthUser?message=${verificationCode}`, {
     
         headers: { Authorization: `Bearer ${token}` },
                    }).then((response) => {
                             setSubmittingCode(false);
                  console.log("User data fetched successfully:", response);
                  if (response.status == 200  ) {
                 setCode(response.data)
                    navigate("/home");
                    
                  } else {
                    // User is not authenticated, show error or redirect to login
                    console.error("User authentication failed:", response.data);}
                  setCode(response.data);
                  setVerificationCode("");
                  setSubmittingCode(false);
                  
                  })     
                   .catch((error) => {
                    setCode("تم إرسال رسالتك بنجاح، شكرا للتفاعل معنا ");
                  setTimeout(() => {
                    setShowModal(false);
                   setCode("");
                  }, 2000);
        setSubmittingCode(false);
        console.log("Error fetching user data:", error)}).finally(() => {
                setSubmittingCode(false);
              // setCode("");
              setVerificationCode("");        
              });


   // setSubmittingCode(true);
   // setCode("");

    //try {
      // Simulate API call for code verification
      // Replace with actual API endpoint
     // console.log("Submitting code:", verificationCode);
      
      // Simulate delay
      
      
      // On success, navigate to home
      // navigate("/home");
   // } catch (err) {
     // setCode("الكود غير صحيح، حاول مرة أخرى");
    //} finally {
   
  //  }
  };

  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
    if (code) setCode("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl xl:max-w-full overflow-hidden flex flex-col md:flex-row rounded-lg">
        {/* ✅ الجهة اليسار: صورة توعوية */}
        <ImageSwipper />

        {/* ✅ الجهة اليمين: فورم تسجيل الدخول */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative min-h-screen">
          <div className="absolute top-8 left-8">
            <img src="/images/Logo.png" alt="Logo" className="w-32" />
          </div>

          <div className="w-full max-w-md mt-24">
            <h2 className="text-2xl font-bold text-right text-gray-900">
              ابدأ الآن
            </h2>
            <p className="text-gray-600 text-right mt-2">
              يرجى إدخال معلوماتك للوصول إلى حسابك.
            </p>

            <form className="mt-6 space-y-4" onSubmit={onSignInClick}>
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className={inputClass("email")}
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.email}
                </p>
              )}

              <input
                type="password"
                placeholder="أدخل كلمة المرور"
                className={inputClass("password")}
                value={password}
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.password}
                </p>
              )}

              <div className="text-sm text-[#B1B1B2] text-right hover:text-black cursor-pointer">
                <a href="/forgetpassword">نسيت كلمة المرور؟</a>
              </div>

              {errors.server && (
                <p className="text-red-500 text-center text-sm">
                  {errors.server}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-4 py-2 rounded-lg transition duration-300 ${
                  loading ? "bg-gray-300" : "bg-[#FFDDDD] hover:bg-gray-200"
                }`}
              >
                {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-2 text-gray-600">أو</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <p className="text-center text-gray-600 mt-4">
              لا تملك حسابًا؟
              <a href="/" className="hover:text-black">
                {" "}
                سجل مجاناً{" "}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#FFDDDD] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
              مرحبا بك 
              </h3>
              <p className="text-gray-600 text-sm">
                    سنكون متاحين قريبا لخدمتك
                            </p>
            </div>

            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder=" اذا كان لديك اي ملاحظات  اكتب لنا "
                  className={`w-full px-4 py-3 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#FFDDDD] 
                     border-gray-300
                  `}
                  value={verificationCode}
                  onChange={handleCodeChange}
                 
                />
                {code && (
                  <p className="text-green-500 text-sm mt-1 text-center">
                    {code}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submittingCode}
                  className={`flex-1 py-3 rounded-lg transition duration-300 ${
                    submittingCode 
                      ? "bg-gray-300 text-gray-500" 
                      : "bg-[#FFDDDD] hover:bg-[#FFD0D0] text-gray-800"
                  }`}
                >
                  {/* {submittingCode ? "جاري التحقق..." : "تأكيد"} */}
                  {submittingCode ? "جاري الارسال..." : "ارسال"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;