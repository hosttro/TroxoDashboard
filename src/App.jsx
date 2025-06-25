import { Routes, Route } from "react-router";  
// استيراد مكونات التوجيه من مكتبة react-router

import TamplateSignUp from "./Routers/TamplateSignUp.jsx";  
// قالب التسجيل (Personal / Business)

import PersonalSignUp from "./Pages/Auth/PersonalSignUp.jsx";  
// صفحة تسجيل مستخدم فردي

import BussinessSignUp from "./Pages/Auth/BussinessSignUp.jsx";  
// صفحة تسجيل شركة (تجاري)

import SignIn from "./Pages/Auth/SignIn.jsx";  
// صفحة تسجيل الدخول

import ForgetPassword from "./Pages/Auth/ForgetPassword.jsx";  
// صفحة استعادة كلمة المرور

import ConfirmEmail from "./Pages/Auth/ConfirmEmail.jsx";  
// صفحة تأكيد البريد الإلكتروني بعد التسجيل

import ResetPassword from "./Pages/Auth/ResetPassword.jsx";  
// صفحة إعادة تعيين كلمة المرور

import OTP from "./Pages/Auth/OTP.jsx";  
// صفحة إدخال رمز التحقق (OTP)

import Home from "./Pages/Home";  
// الصفحة الرئيسية للمستخدم

import DashboardLayout from "./Routers/DashboardLayout.jsx";  
// تخطيط الواجهة الرئيسية (Layout) بعد تسجيل الدخول

import StatStore from "./Pages/StatStore";  
// صفحة إحصائيات المتجر

import Shopes from "./Pages/Shopes";  
// صفحة عرض جميع المتاجر

import ShopProduct from "./Pages/ShopProduct.jsx";  
// صفحة عرض منتجات المتجر

import Classification from "./Pages/Classification.jsx";  
// صفحة تصنيف المنتجات

import AddShipments from "./Pages/AddShipments.jsx";  
// صفحة إضافة شحنة جديدة

import Shipments from "./Pages/Shipments.jsx";  
// صفحة عرض قائمة الشحنات

import ShipmentDetails from "./Components/Shipment/ShimpentDetails.jsx";  
// مكون تفاصيل الشحنة (Checkout)

import Customer from "./Pages/Customer.jsx";  
// صفحة إدارة العملاء داخل شحنات

import Bills from "./Pages/Bills.jsx";  
// صفحة فواتير العملاء

import { Ticket } from "./Pages/Ticket";  
// صفحة التذاكر (Tickets)

import Wallet from "./Pages/Wallet.jsx";  
// صفحة المحفظة المالية للمستخدم

import BankAccount from "./Pages/BankAccount.jsx";  
// صفحة إضافة تفاصيل الحساب البنكي

import Statistics from "./Pages/Statistics.jsx";  
// صفحة إحصائيات المستخدم (عام)

import StateShipment from "./Pages/StateShipment.jsx";  
// صفحة الحالة العامة للشحنات

import StateFinancial from "./Pages/StateFinancial.jsx";  
// صفحة الحالة المالية

// القسم الإداري (Admin)
import AdminDashLayout from "./Routers/AdminDashLayout";  
// تخطيط لوحة الإدارة

import HomeAdmin from "./Pages/Admin/HomeAdmin.jsx";  
// الصفحة الرئيسية للوحة الإدارة

import Company from "./Pages/Admin/Company";  
// صفحة إدارة الشركات في لوحة الإدارة

import CompanyDetails from "./Pages/Admin/CompanyDetails.jsx";  
// صفحة تفاصيل شركة محددة

import Users from "./Pages/Admin/Users.jsx";  
// صفحة إدارة المستخدمين في لوحة الإدارة

import ShipmentsAdmin from "./Pages/Admin/ShipmentsAdmin.jsx";  
// صفحة إدارة الشحنات في لوحة الإدارة

import ShipmentAdminDetails from "./Pages/Admin/ShipmentAdminDetails.jsx";  
// صفحة تفاصيل شحنة في لوحة الإدارة

import TicketsAdmin from "./Pages/Admin/TicketsAdmin.jsx";  
// صفحة إدارة التذاكر في لوحة الإدارة

import WalletAdmin from "./Pages/Admin/WalletAdmin.jsx";  
// صفحة المحفظة المالية للإدارة

export default function App() {
  return (
    <Routes>
      {/* مسار التسجيل */}
      <Route path="/" element={<TamplateSignUp />}>
        {/* صفحة التسجيل الفردي */}
        <Route index element={<PersonalSignUp />} />
        {/* صفحة التسجيل التجاري */}
        <Route path="bussinessSignUp" element={<BussinessSignUp />} />
      </Route>

      {/* صفحات المصادقة */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/confirmemail" element={<ConfirmEmail />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/otp" element={<OTP />} />

      {/* المنطقة المحمية بعد تسجيل الدخول */}
      <Route path="/home" element={<DashboardLayout />}>
        {/* الصفحة الرئيسية للمستخدم */}
        <Route index element={<Home />} />

        {/* شجرة الإحصائيات ضمن اللوحة */}
        <Route path="statistics">
          {/* الحالة العامة للشحنات */}
          <Route index element={<StateShipment />} />
          {/* إحصائيات المتجر */}
          <Route path="statstore/:storeId" element={<StatStore />} />
          {/* الحالة المالية */}
          <Route path="financial" element={<StateFinancial />} />
          {/* إحصائيات أخرى */}
          <Route path="store" element={<Statistics />} />
        </Route>

        {/* شجرة المتاجر */}
        <Route path="stores">
          {/* قائمة المتاجر */}
          <Route index element={<Shopes />} />
          {/* منتجات متجر معين */}
          <Route path="product" element={<ShopProduct />} />
          {/* تصنيف المنتجات */}
          <Route path="classification" element={<Classification />} />
        </Route>

        {/* شجرة الشحنات */}
        <Route path="shipments">
          {/* إضافة شحنة جديدة */}
          <Route path="addshipment" element={<AddShipments />} />
          {/* صفحة الخروج (تفاصيل الشحنة) */}
          <Route path="checkout" element={<ShipmentDetails />} />
          {/* قائمة الشحنات */}
          <Route index element={<Shipments />} />
          {/* عملاء الشحنات */}
          <Route path="customer" element={<Customer />} />
          {/* فواتير العملاء */}
          <Route path="bills" element={<Bills />} />
          {/* تذاكر الدعم */}
          <Route path="ticket" element={<Ticket />} />
        </Route>

        {/* المحفظة */}
        <Route path="wallet">
          {/* عرض المحفظة */}
          <Route index element={<Wallet />} />
          {/* إضافة حساب بنكي */}
          <Route path="addbankaccount" element={<BankAccount />} />
        </Route>
      </Route>

      {/* لوحة الإدارة */}
      <Route path="/admin" element={<AdminDashLayout />}>
        {/* الصفحة الرئيسية للإدارة */}
        <Route index element={<HomeAdmin />} />

        {/* إدارة الشركات */}
        <Route path="company">
          {/* قائمة الشركات */}
          <Route index element={<Company />} />
          {/* تفاصيل شركة */}
          <Route path="details" element={<CompanyDetails />} />
        </Route>

        {/* إدارة المستخدمين */}
        <Route path="users" element={<Users />} />

        {/* إدارة شحنات الإدارة */}
        <Route path="shipments">
          <Route index element={<ShipmentsAdmin />} />
          <Route path="details" element={<ShipmentAdminDetails />} />
        </Route>

        {/* المحفظة الإدارية */}
        <Route path="wallet" element={<WalletAdmin />} />

        {/* التذاكر الإدارية */}
        <Route path="tickets" element={<TicketsAdmin />} />
      </Route>
    </Routes>
  );
}
