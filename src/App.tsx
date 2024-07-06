import "./App.css";

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Cart from './pages/Cart';

import AddProduct from './pages/AddProduct';
import AddCategory from './pages/AddCategory';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Payment from "./pages/Payment";

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route path="" element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="cart/payment" element={<Payment />} />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="" element={<Admin />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="add-category" element={<AddCategory />} />
                </Route>
            </Routes >

        </>
    );
};

export default App;
