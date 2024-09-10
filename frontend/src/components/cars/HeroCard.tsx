import React from "react";
import { Button } from "../ui/button";

interface HeroCardProps {
  img: string;
  price: string;
  make: string;
  model: string;
}

const HeroCard: React.FC<HeroCardProps> = ({ img, price, make, model }) => {
  return (
    <div className="flex flex-col items-center gap-3 py-5">
      <img className="w-[500px]" src={img} alt="" />
      <h1 className="font-bold text-3xl">
        {make} {model}
      </h1>
      <h2 className="text-2xl text-primary font-bold">{price}$ Per Day</h2>
      <Button>Rent Now</Button>
    </div>
  );
};

export default HeroCard;
