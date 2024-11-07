import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import PriceRange from "./PriceRange";
import Doors from "./Doors";
import GearType from "./GearType";
import { Button } from "../ui/button";
import { displayPriceRangeString } from "@/utils/utls";
import { IFilter } from "@/interfaces";

interface SearchFilterContainerProps {
  onConfirmFilters: (filters: IFilter) => void;
}

const SearchFilterContainer: React.FC<SearchFilterContainerProps> = ({ onConfirmFilters }) => {
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

  const handleInputChange = (value: string) => {
    if (!value) return setSearchParam(null);

    setSearchParam(value);
  };

  const clearFilters = () => {
    setDoors(null);
    setGearType(null);
    setPriceRange([]);
    setSearchParam(null);

    const filters = { priceRange: [], doors: null, gearType: null, searchParam: null };

    onConfirmFilters(filters);
  };

  const handleConfirm = () => {
    const filters = { priceRange, doors, gearType, searchParam };

    onConfirmFilters(filters);
  };

  return (
    <div className=" flex gap-1 flex-wrap justify-center border-2 border-primary rounded w-[80vw] md:w-fit shadow  mx-auto p-2">
      <div className="relative">
        <Input
          className="bg-accent"
          placeholder="search"
          value={searchParam || ``}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <FaSearch className="absolute top-3 right-2" />
      </div>
      <div className="flex  justify-center">
        {navItems.map(({ name, component, selectedFilter }, i) => (
          <NavigationMenu key={i}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="flex flex-col">
                    {name}
                    <p className="font-thin text-primary">{selectedFilter}</p>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>{component}</NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ))}
      </div>
      <Button onClick={handleConfirm}>Search</Button>
      {(gearType || doors || priceRange.length > 0 || searchParam) && (
        <Button variant="link" onClick={clearFilters}>
          Clear
        </Button>
      )}
    </div>
  );
};

export default SearchFilterContainer;
