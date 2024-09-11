import React, { useState } from "react";
import "animate.css";
import Hero from "@/components/Hero";
import CarListDropdown from "@/components/cars/CarListDropdown";

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

const Home = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className="scroll-smooth">
      <header>
        <div className="pb-4 md:pb-0 pt-4 pl-5 animate__animated animate__fadeIn">
          <h1 className="font-bold text-accent-foreground text-lg md:text-2xl">
            Rent Your Car At The Click Of A Button!
          </h1>
          <p className="font-bold text-accent-foreground text-sm">
            Choose A car from our huge selection!
          </p>
        </div>
        <Hero
          isOpen={isOpen}
          handleClick={() =>
            setisOpen((prevState) => {
              return !prevState;
            })
          }
        />
      </header>
      <CarListDropdown open={isOpen} />
    </div>
  );
};

export default Home;
