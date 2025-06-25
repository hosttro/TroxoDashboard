import axios from "axios";
import api from "./api-helper";

export const loginUser = (loginDto) => api.post("/Users/Login", loginDto);
// export const registerPersonalUser = (registerDto) => api.post('/Accounts/RegisterPersonal', registerDto);


export const registerBusiness = async (data) => {
  const url = "https://troxo.runasp.net/api/Users/Register";

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // or response depending on what you want
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};



export const confirmOtp = (dto) => api.post("/Users/ConfirmPhoneOTP", dto);
export const resendOtp = (dto) => api.post("/Users/ResendOTP", dto);
export const requestPasswordReset = (dto) =>
  api.post("/Users/RequestPasswordReset", dto);

//
// ✅ تعيين كلمة مرور جديدة
//
export const resetPassword = (dto) => {
  return api.post("/Users/ResetPassword", dto);
};
