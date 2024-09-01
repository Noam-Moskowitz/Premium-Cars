import OrderCard from "@/components/orders/OrderCard";
import React from "react";
import "animate.css";

const MyOrders = () => {
  return (
    <div className="size-full">
      <h1 className="text-3xl font-bold p-5">My Orders</h1>
      <div className="flex flex-col m-auto w-2/3 gap-5 p-5 animate__animated animate__fadeInUp ">
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  );
};

export default MyOrders;
