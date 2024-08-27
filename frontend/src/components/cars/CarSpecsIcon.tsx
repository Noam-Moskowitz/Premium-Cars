import React, { ReactNode } from "react";

interface CarSpecsIconProps {
  icon: ReactNode;
  specs: string | number;
}

const CarSpecsIcon: React.FC<CarSpecsIconProps> = ({ icon, specs }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-primary p-2 rounded">{icon}</div>
      <p className="font-bold text-sm">{specs}</p>
    </div>
  );
};

export default CarSpecsIcon;
