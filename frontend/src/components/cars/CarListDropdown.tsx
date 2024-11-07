import React, { useState } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { animationDelays } from "@/consts/style";
import CarCard from "./CarCard";
import { ICar } from "@/interfaces/car";
import SearchFilterContainer from "../filtering/SearchFilterContainer";
import { IFilter } from "@/interfaces";
import NoResultsContainer from "../ui/NoResultsContainer";

interface CarListDropdownProps {
  open: boolean;
  cars: ICar[];
}

const CarListDropdown: React.FC<CarListDropdownProps> = ({ open, cars }) => {
  const [filteredCars, setFilteredCars] = useState<ICar[]>(cars);

  const filterCars = (filterParams: IFilter) => {
    const { doors, gearType, priceRange, searchParam } = filterParams;

    if (!doors && !gearType && !searchParam && priceRange.length == 0) return setFilteredCars(cars);

    let newArray = [...cars];

    if (doors) {
      newArray = newArray.filter((car) => car.doors == Number(doors));
    }

    if (gearType) {
      newArray = newArray.filter((car) => car.gear == gearType);
    }

    if (priceRange.length !== 0) {
      newArray = newArray.filter(
        (car) => car.pricePerDay > priceRange[0] && car.pricePerDay < priceRange[1]
      );
    }

    if (searchParam) {
      newArray = newArray.filter(
        (car) =>
          car.make.toLocaleLowerCase().includes(searchParam.toLocaleLowerCase()) ||
          car.model.toLocaleLowerCase().includes(searchParam.toLocaleLowerCase())
      );
    }

    setFilteredCars(newArray);
  };

  return (
    <Collapsible open={open}>
      <CollapsibleContent id="carList" className="pt-10">
        <SearchFilterContainer onConfirmFilters={(value) => filterCars(value)} />
        {filteredCars.length == 0 ? (
          <NoResultsContainer title="No results found!" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10  p-10">
            {filteredCars?.map((car, i) => (
              <div key={i} className={`animate__animated animate__fadeInUp ${animationDelays[i]} `}>
                <CarCard key={i} car={car} />
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CarListDropdown;
