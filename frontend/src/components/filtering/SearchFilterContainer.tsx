import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import PriceRange from "./PriceRange";
import Doors from "./Doors";
import GearType from "./GearType";
import { Button } from "../ui/button";
import { displayPriceRangeString } from "@/utils/utls";

const SearchFilterContainer = () => {
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [doors, setDoors] = useState<string | null>(null);
  const [gearType, setGearType] = useState<string | null>(null);

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
  };

  return (
    <div className=" flex gap-1 border-2 border-primary rounded w-fit shadow  mx-auto p-2">
      <div className="relative">
        <Input placeholder="search" />
        <FaSearch className="absolute top-3 right-2" />
      </div>
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
      <Button>Set Filters</Button>
      {(gearType || doors || priceRange.length > 0) && (
        <Button variant="link" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default SearchFilterContainer;
