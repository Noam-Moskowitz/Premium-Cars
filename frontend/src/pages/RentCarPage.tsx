import React from "react";
import { car } from "./Home";
import CarDetails from "@/components/cars/CarDetails";

const RentCarPage = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col item-center justify-start bg-accent">
      <div>
        <img className="w-5/12 m-auto" src={car.image} alt="Car Image" />
      </div>
      <CarDetails car={car} />
    </div>
  );
};

export default RentCarPage;
