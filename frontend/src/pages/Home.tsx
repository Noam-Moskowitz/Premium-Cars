import CarCard from "@/components/cars/CarCard";
import { carsArray } from "@/consts/cars";
import React from "react";
import "animate.css";

export const car = {
  make: "Toyota",
  model: "Corolla",
  year: 2023,
  seatAmount: 5,
  pricePerDay: 45,
  gear: "Automatic",
  doors: 4,
  image: "https://noam-moskowitz.github.io/premium-cars-images/cars/hyundai_I10.png",
};

const animationDelays = [
  `delay-0`,
  `delay-75`,
  `delay-100`,
  `delay-150`,
  `delay-200`,
  `delay-300`,
  `delay-500`,
  `delay-700`,
  `delay-1000`,
];

const Home = () => {
  return (
    <div>
      <header className="p-5 ">
        <h1 className="font-bold text-primary text-2xl">Rent Your Car At The Click Of A Button!</h1>
        <p className="font-bold">Choose A car from our huge selection!</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10 ">
        {carsArray.map((car, i) => (
          <div className={`animate__animated animate__fadeInUp ${animationDelays[i]} `}>
            <CarCard key={i} car={car} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
