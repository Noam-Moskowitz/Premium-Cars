import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { carsArray } from "@/consts/cars";
import { animationDelays } from "@/consts/style";
import CarCard from "./CarCard";

interface CarListDropdownProps {
  open: boolean;
}

const CarListDropdown: React.FC<CarListDropdownProps> = ({ open }) => {
  return (
    <Collapsible open={open}>
      <CollapsibleContent
        id="carList"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10 "
      >
        {carsArray.map((car, i) => (
          <div className={`animate__animated animate__fadeInUp ${animationDelays[i]} `}>
            <CarCard key={i} car={car} />
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CarListDropdown;
