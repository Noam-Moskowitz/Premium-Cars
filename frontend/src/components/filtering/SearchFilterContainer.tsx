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

const SearchFilterContainer = () => {
  const [priceRange, setPriceRange] = useState<number[]>([]);

  const navItems = [
    {
      name: `Price`,
      component: <PriceRange handleConfirm={(range) => setPriceRange(range)} />,
    },
    {
      name: `Doors`,
      component: <Doors />,
    },
    {
      name: `Gear Type`,
      component: <GearType />,
    },
  ];

  return (
    <div className=" flex gap-1 border-2 border-primary rounded w-fit shadow  mx-auto p-2">
      <div className="relative">
        <Input placeholder="search" />
        <FaSearch className="absolute top-3 right-2" />
      </div>
      {navItems.map(({ name, component }, i) => (
        <NavigationMenu key={i}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
              <NavigationMenuContent>{component}</NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ))}
    </div>
  );
};

export default SearchFilterContainer;
