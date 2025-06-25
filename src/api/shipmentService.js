import api from './api-helper';

// إنشاء شحنة جديدة
export const createShipment = (shipmentDto) => {
  return api.post('/Shipments/Create', shipmentDto);
};

// جلب كل الشحنات
export const getAllShipments = () => {
  return api.get('/Shipments/GetAll');
};

// حذف شحنة
export const deleteShipment = (id) => {
  return api.delete(`/Shipments/Delete/${id}`);
};

// جلب شحنة حسب المعرّف
export const getShipmentById = (id) => {
  return api.get(`/Shipments/GetById/${id}`);
};
