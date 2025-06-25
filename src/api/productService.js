import api from './api-helper';

// جلب المنتجات الأعلى مبيعًا حسب الفترة (اليوم/الأسبوع/الشهر)
export const getTopProducts = (period) => {
  return api.get(`/Products/GetTop?period=${period}`);
};

// جلب كل المنتجات
export const getAllProducts = () => {
  return api.get('/Products/GetAll');
};

// إنشاء منتج جديد باستخدام FormData
export const createProduct = (formData) => {
  return api.post('/Products/Create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// حذف منتج
export const deleteProduct = (id) => {
  return api.delete(`/Products/Delete/${id}`);
};
