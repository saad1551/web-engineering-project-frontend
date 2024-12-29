import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router";
import Register from './pages/Register';
import RegisterBuyer from './pages/RegisterBuyer';
import RegisterSeller from './pages/RegisterSeller';
import Login from './pages/Login';
import LoginBuyer from './pages/LoginBuyer';
import LoginSeller from './pages/LoginSeller';
import VerifyEmail from './pages/VerifyEmail';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import AddProduct from './pages/AddProduct';
import BuyerEditProfile from './pages/BuyerEditProfile';
import SellerEditProfile from './pages/SellerEditProfile';

const App = () => {
  useEffect(() => {
    const payload = JSON.parse(localStorage.getItem('jwt_payload')); // Get token from localStorage
    const currentPath = window.location.pathname; // Get the current URL path

    if (payload) {
      if (currentPath !== '/' && currentPath !== '/buyer' && currentPath !== '/seller' && currentPath !== '/register' &&
        currentPath !== '/register/buyer' && currentPath !== '/register/seller' && currentPath !== '/verify-email' &&
        currentPath !== '/verify-seller-email') {
        return;
      }
      if (payload.buyer) {
        window.location.href = '/buyer-dashboard'; // Redirect to buyer dashboard
      } else if (payload.seller) {
        window.location.href = '/seller-dashboard'; // Redirect to seller dashboard
      }
    } else {
      if (currentPath !== '/' && currentPath !== '/buyer' && currentPath !== '/seller' && currentPath !== '/register' &&
        currentPath !== '/register/buyer' && currentPath !== '/register/seller' && currentPath !== '/verify-email' &&
        currentPath !== '/verify-seller-email') {
        window.location.href = '/'; // Redirect to login page
      }
    }
  }, []); // Empty dependency array ensures it runs once on initial load

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="buyer" element={<LoginBuyer />} />
            <Route path="seller" element={<LoginSeller />} />
          </Route>
          <Route path="/register" element={<Register />}>
            <Route index element={<RegisterSeller />} />
            <Route path="buyer" element={<RegisterBuyer />} />
            <Route path="seller" element={<RegisterSeller />} />
          </Route>
          <Route path="/verify-email" element={<VerifyEmail type="buyer" />} />
          <Route path="/verify-seller-email" element={<VerifyEmail type="seller" />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/buyer-profile" element={<BuyerEditProfile />} />
          <Route path="/seller-profile" element={<SellerEditProfile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
