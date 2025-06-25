import api from './api-helper';

export const getAllStores = () => api.get('/Stores/GetAllStores');
export const createStore = (dto) => api.post('/Stores/CreateStore', dto);
export const deleteStore = (id) => api.delete(`/Stores/DeleteStore/${id}`); // ✅
