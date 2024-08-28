import { ICar } from "@/interfaces/car";
import React from "react";
import SpecsIconContainer from "./SpecsIconContainer";

interface CarDetailsProps {
  car: ICar;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  const { doors, gear, make, model, pricePerDay, seatAmount, year } = car;

  const detailsArray = [
    { label: `Make`, details: make },
    { label: `Model`, details: model },
    { label: `Year`, details: year },
  ];

  return (
    <div className="bg-secondary rounded-3xl flex flex-col w-auto p-5 absolute top-[20vh] ml-10 shadow-md">
      <div className="flex flex-col items-center gap-4">
        {detailsArray.map((item) => (
          <div className="flex flex-col items-center">
            <h6 className="font-bold">{item.label}</h6>
            <p>{item.details}</p>
          </div>
        ))}
      </div>
      <SpecsIconContainer specs={{ doors, gear, seatAmount }} gap="small" />
    </div>
  );
};

export default CarDetails;
