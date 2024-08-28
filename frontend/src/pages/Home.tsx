import CarCard from "@/components/cars/CarCard";
import React from "react";

export const car = {
  make: "Toyota",
  model: "Corolla",
  year: 2023,
  seatAmount: 5,
  pricePerDay: 45,
  gear: "Automatic",
  doors: 4,
  image: "https://th.bing.com/th/id/OIP.daHYkY2TSKoZpRovfI79YwAAAA?rs=1&pid=ImgDetMain",
};

const Home = () => {
  return (
    <div>
      <header className="p-5 ">
        <h1 className="font-bold text-primary text-2xl">Rent Your Car At The Click Of A Button!</h1>
        <p className="font-bold">Choose A car from our huge selection!</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
        <CarCard car={car} />
        <CarCard car={car} />
        <CarCard car={car} />
        <CarCard car={car} />
        <CarCard car={car} />
        <CarCard car={car} />
        <CarCard car={car} />
        <CarCard car={car} />
      </div>
    </div>
  );
};

export default Home;
