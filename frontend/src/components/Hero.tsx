import React from "react";
import GenericCarousel from "./ui/GenericCarousel";
import { carsArray } from "@/consts/cars";

const Hero = () => {
  return (
    <div className="w-full h-[80vh] bg-accent p-5 shadow-md traingleBorder flex place-items-center justify-center">
      <div className="w-[50%]">
        <GenericCarousel data={carsArray} />
      </div>
    </div>
  );
};

export default Hero;
