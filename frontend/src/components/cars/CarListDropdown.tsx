import React from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { animationDelays } from "@/consts/style";
import CarCard from "./CarCard";
import { ICar } from "@/interfaces/car";
import SearchFilterContainer from "../filtering/SearchFilterContainer";

interface CarListDropdownProps {
  open: boolean;
  cars: ICar[];
}

const CarListDropdown: React.FC<CarListDropdownProps> = ({ open, cars }) => {
  return (
    <Collapsible open={open}>
      <CollapsibleContent id="carList" className="pt-10">
        <SearchFilterContainer />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10  p-10">
          {cars?.map((car, i) => (
            <div key={i} className={`animate__animated animate__fadeInUp ${animationDelays[i]} `}>
              <CarCard key={i} car={car} />
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CarListDropdown;
