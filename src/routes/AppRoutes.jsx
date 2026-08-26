import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import VerifyOtp from "../features/auth/VerifyOtp";
import ForgotPassword from "../features/auth/ForgotPassword";
import ResetPassword from "../features/auth/ResetPassword";
import Home from "../features/home/Home";
import RestaurantDetail from "../features/restaurant/RestaurantDetail";
import Cart from "../features/cart/Cart";
import VendorDashboard from "../features/vendor/VendorDashboard";
import VendorMenu from "../features/vendor/VendorMenu";
import VendorLayout from "../layouts/VendorLayout";
import RegisterRestaurant from "../features/restaurant/RegisterRestaurant";
import AdminLayout from '../layouts/AdminLayout';
import AdminApproval from '../features/admin/AdminApproval';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register-restaurant" element={<RegisterRestaurant />} />

        <Route path="/vendor" element={<VendorLayout />}>
          <Route index element={<VendorDashboard />} />
          <Route path="menu" element={<VendorMenu />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminApproval />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}