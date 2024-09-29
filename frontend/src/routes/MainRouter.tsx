import About from "@/pages/About";
import CarFormPage from "@/pages/CarFormPage";
import CarsPage from "@/pages/CarsPage";
import Home from "@/pages/Home";
import LogInPage from "@/pages/LogInPage";
import MyOrders from "@/pages/MyOrders";
import Register from "@/pages/RegisterPage";
import RentCarPage from "@/pages/RentCarPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars/rent" element={<RentCarPage />} />
      <Route path="/cars/new" element={<CarFormPage />} />
      <Route path="/cars/update/:id" element={<CarFormPage />} />
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/user/login" element={<LogInPage />} />
      <Route path="/user/register" element={<Register />} />
    </Routes>
  );
};

export default MainRouter;
