import React from "react";
import { car } from "./Home";
import CarDetails from "@/components/cars/CarDetails";
import BookCarForm from "@/components/forms/BookCarForm";
import "animate.css";

const RentCarPage = () => {
  return (
    <div className="w-full h-[90vh]  flex flex-col item-center justify-between bg-accent">
      <div className="md:h-[60vh] pb-10 flex items-center animate__animated animate__fadeIn">
        <img className=" md:w-[500px] lg:w-[700px] m-auto" src={car.image} alt="Car Image" />
      </div>
      <CarDetails car={car} />
      <div className="w-full md:h-[30vh] bg-background md:rounded-t-lg animate__animated animate__fadeInUp  flex justify-center items-center py-5  md:border-2 ">
        <BookCarForm carPrice={car.pricePerDay} />
      </div>
    </div>
  );
};

export default RentCarPage;
