import About from "@/pages/About";
import Home from "@/pages/Home";
import MyOrders from "@/pages/MyOrders";
import RentCarPage from "@/pages/RentCarPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars/rent/" element={<RentCarPage />} />
    </Routes>
  );
};

export default MainRouter;