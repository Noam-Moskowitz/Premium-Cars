import React from "react";
import GenericCarousel from "./ui/GenericCarousel";
import { ICar } from "@/interfaces/car";

interface HeroProps {
  handleClick: () => void;
  isOpen: boolean;
  carsArray: ICar[];
}

const Hero: React.FC<HeroProps> = ({ handleClick, isOpen, carsArray }) => {
  return (
    <div className="w-full animate__animated animate__fadeIn h-[70vh] md:h-auto py-10 bg-accent p-5 shadow-md traingleBorder flex flex-col place-items-center justify-center">
      <div className="w-[85%] md:w-[50%]">
        <GenericCarousel data={carsArray} />
      </div>
      <a
        className="text-primary  underline-offset-4 hover:underline"
        onClick={handleClick}
        href={!isOpen ? `#` : "#carList"}
      >
        {isOpen ? `Show Less` : `Show More`}
      </a>
    </div>
  );
};

export default Hero;
