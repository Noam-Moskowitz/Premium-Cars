import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface HeroCardProps {
  img: string;
  price: string;
  make: string;
  model: string;
  id: string;
}

const HeroCard: React.FC<HeroCardProps> = ({ img, price, make, model, id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-3 py-5">
      <img className="w-full md:w-[500px] rounded" src={img} alt="" />
      <h1 className="font-bold text-lg md:text-3xl">
        {make} {model}
      </h1>
      <h2 className="md:text-2xl text-primary font-bold">{price}$ Per Day</h2>
      <Button className="text-sm md:text-md" onClick={() => navigate(`/cars/rent/${id}`)}>
        Reserve Now
      </Button>
    </div>
  );
};

export default HeroCard;
