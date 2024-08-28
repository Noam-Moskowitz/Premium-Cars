import { ICarSpecs } from "@/interfaces/car";
import React from "react";
import { GiCarDoor, GiCarSeat, GiGearStickPattern } from "react-icons/gi";
import CarSpecsIcon from "./CarSpecsIcon";

interface SpecsIconContainerProps {
  specs: ICarSpecs;
  gap?: `medium` | `small`;
}

const SpecsIconContainer: React.FC<SpecsIconContainerProps> = ({ specs, gap = `medium` }) => {
  const { doors, gear, seatAmount } = specs;

  return (
    <div className={`flex justify-center px-3 py-5 ${gap === `medium` ? `gap-4` : `gap-1`}`}>
      <CarSpecsIcon icon={<GiCarDoor />} specs={doors} />
      <CarSpecsIcon icon={<GiGearStickPattern />} specs={gear} />
      <CarSpecsIcon icon={<GiCarSeat />} specs={seatAmount} />
    </div>
  );
};

export default SpecsIconContainer;