import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router";
import Register from './pages/Register';
import RegisterBuyer from './pages/RegisterBuyer';
import RegisterSeller from './pages/RegisterSeller';
import Login from './pages/Login'
import LoginBuyer from './pages/LoginBuyer';
import LoginSeller from './pages/LoginSeller';
import VerifyEmail from './pages/VerifyEmail';

const App = () => {
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
          <Route path="/verify-email" element={<VerifyEmail type="buyer"/>} />
          <Route path="/verify-seller-email" element={<VerifyEmail type="seller"/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
