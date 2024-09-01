import React from "react";
import { car } from "./Home";
import CarDetails from "@/components/cars/CarDetails";
import BookCarForm from "@/components/forms/BookCarForm";
import "animate.css";

const RentCarPage = () => {
  return (
    <div className="size-full  flex flex-col item-center justify-between bg-accent">
      <div className="md:h-[80vh] flex items-center animate__animated animate__fadeIn">
        <img className=" md:w-[500px] lg:w-[800px] m-auto" src={car.image} alt="Car Image" />
      </div>
      <CarDetails car={car} />
      <div className="w-full bg-background md:rounded-t-lg animate__animated animate__fadeInUp shadow-lg flex justify-center items-center py-5 md:absolute md:border-2 bottom-0">
        <BookCarForm carPrice={car.pricePerDay} />
      </div>
    </div>
  );
};

export default RentCarPage;
