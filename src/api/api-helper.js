import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://troxo.runasp.net/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err?.response?.data?.message || "حدث خطأ غير متوقع.";
    console.error("API Error:", msg);
    return Promise.reject(err);
  }
);

// ✅ هذا السطر ضروري
export default api;
