// src/api/walletService.js

import api from './api-helper';

/**
 * جلب ملخص المحفظة للمتجر المرتبط بالمستخدم الحالي
 */
export const getWalletSummary = () => {
  return api.get("/Wallet/getbystoreid");
};

/**
 * شحن رصيد المحفظة
 * @param {Object} dto - كائن يحتوي على بيانات الشحن مثل المبلغ ومعرف المتجر
 */
export const topUpWallet = (dto) => {
  return api.post("/Wallet/TopUp", dto);
};
