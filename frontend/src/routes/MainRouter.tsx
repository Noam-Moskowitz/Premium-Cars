import PrefilDataContainer from "@/components/sample-data/PrefilDataContainer";
import About from "@/pages/About";
import AdminOrdersPage from "@/pages/AdminOrdersPage";
import BranchFormPage from "@/pages/BranchFormPage";
import BranchPage from "@/pages/BranchPage";
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
      <Route path="/sample-data" element={<PrefilDataContainer />} />
      <Route path="/my-orders/:status" element={<MyOrders />} />
      <Route path="/orders" element={<AdminOrdersPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars/rent/:id" element={<RentCarPage />} />
      <Route path="/cars/rent/:id/booking/:bookingId" element={<RentCarPage />} />
      <Route path="/cars/new" element={<CarFormPage />} />
      <Route path="/cars/update/:id" element={<CarFormPage />} />
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/branches" element={<BranchPage />} />
      <Route path="/branches/new" element={<BranchFormPage />} />
      <Route path="/branches/update/:id" element={<BranchFormPage />} />
      <Route path="/user/login" element={<LogInPage />} />
      <Route path="/user/login/alert" element={<LogInPage title />} />
      <Route path="/user/register" element={<Register />} />
    </Routes>
  );
};

export default MainRouter;
