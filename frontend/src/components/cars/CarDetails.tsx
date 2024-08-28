import { ICar } from "@/interfaces/car";
import React from "react";
import SpecsIconContainer from "./SpecsIconContainer";

interface CarDetailsProps {
  car: ICar;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  const { doors, gear, make, model, seatAmount, year } = car;

  const detailsArray = [
    { label: `Make`, details: make },
    { label: `Model`, details: model },
    { label: `Year`, details: year },
  ];

  return (
    <div className="bg-background md:rounded-3xl flex flex-col w-auto pt-3 md:p-5 md:absolute top-[15vh] md:ml-10 shadow-md">
      <div className="flex md:flex-col items-center justify-center gap-4">
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
