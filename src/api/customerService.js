import api from './api-helper';

// جلب كل العملاء
export const getAllCustomers = () => {
  return api.get('/Customers/GetAllCustomers');
};

// حذف عميل
export const deleteCustomer = (id) => {
  return api.delete(`/Customers/Delete/${id}`);
};
// src/api/customerService.js

// اظافة عميل
export const createCustomer = (customerDto) => {
  return api.post("/Customers/Create", customerDto);
};
