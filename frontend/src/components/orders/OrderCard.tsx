import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { car } from "@/pages/Home";
import { FiChevronsRight } from "react-icons/fi";
import { Button } from "../ui/button";

const OrderCard = () => {
  return (
    <Card className="flex flex-col lg:flex-row">
      <CardHeader className="flex items-center lg:w-1/2">
        <img src={car.image} alt="Car" />
        <h2 className="font-bold text-lg">{`${car.make} ${car.model}`}</h2>
        <CardDescription>{car.year}</CardDescription>
      </CardHeader>
      <CardContent className="lg:w-1/2 flex flex-col items-between justify-around gap-10">
        <div className="pt-10">
          <h6 className="text-center font-bold text-lg">Price:</h6>
          <h6 className="text-center  font-bold text-2xl text-primary">1,200$</h6>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col font-bold items-center">
            <h6>Dimona Branch</h6>
            <h6>10:00 AM</h6>
            <h6>30/08/24</h6>
          </div>
          <FiChevronsRight size={35} className="text-primary" />
          <div className="flex flex-col font-bold items-center">
            <h6>Dimona Branch</h6>
            <h6>15:00 PM</h6>
            <h6>31/08/24</h6>
          </div>
        </div>
        <div className="flex flex-col  justify-center gap-3">
          <Button variant="outline">Edit Order</Button>
          <Button variant="destructive">Cancel Order</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
