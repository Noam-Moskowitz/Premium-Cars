import React, { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { animationDelays } from "@/consts/style";
import CarCard from "./CarCard";
import { ICar } from "@/interfaces/car";
import SearchFilterContainer from "../filtering/SearchFilterContainer";
import NoResultsContainer from "../ui/NoResultsContainer";
import PriceRange from "../filtering/PriceRange";
import Doors from "../filtering/Doors";
import GearType from "../filtering/GearType";
import { displayPriceRangeString } from "@/utils/utls";

interface CarListDropdownProps {
  open: boolean;
  cars: ICar[];
}

const CarListDropdown: React.FC<CarListDropdownProps> = ({ open, cars }) => {
  const [filteredCars, setFilteredCars] = useState<ICar[]>(cars);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [doors, setDoors] = useState<string | null>(null);
  const [gearType, setGearType] = useState<"Manual" | "Automatic" | null>(null);
  const [searchParam, setSearchParam] = useState<string | null>(null);

  const navItems = [
    {
      name: `Price`,
      component: <PriceRange handleConfirm={(range) => setPriceRange(range)} />,
      selectedFilter: displayPriceRangeString(priceRange),
    },
    {
      name: `Doors`,
      component: <Doors handleConfirm={(value) => setDoors(value)} />,
      selectedFilter: doors,
    },
    {
      name: `Gear Type`,
      component: <GearType handleConfirm={(value) => setGearType(value)} />,
      selectedFilter: gearType,
    },
  ];

  const clearFilters = () => {
    setDoors(null);
    setGearType(null);
    setPriceRange([]);
    setSearchParam(null);
  };

  useEffect(() => {
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
  }, [doors, gearType, priceRange, searchParam]);

  return (
    <Collapsible open={open}>
      <CollapsibleContent id="carList" className="pt-10">
        <SearchFilterContainer
          filtersArray={navItems}
          handleSearch={(value) => setSearchParam(value)}
          onClear={clearFilters}
          showClearButton={Boolean(gearType || doors || priceRange.length > 0 || searchParam)}
          searchValue={searchParam}
        />
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
