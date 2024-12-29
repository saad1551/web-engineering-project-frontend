import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from "react-router";
import Register from './pages/Register';
import RegisterBuyer from './pages/RegisterBuyer';
import RegisterSeller from './pages/RegisterSeller';

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />}>
            <Route index element={<RegisterSeller />} />
            <Route path="buyer" element={<RegisterBuyer />} />
            <Route path="seller" element={<RegisterSeller />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
