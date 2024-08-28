import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";
import CarSpecsIcon from "./CarSpecsIcon";
import { GiCarDoor, GiCarSeat, GiGearStickPattern } from "react-icons/gi";
import { ICar } from "@/interfaces/car";
import { useNavigate } from "react-router-dom";
import SpecsIconContainer from "./SpecsIconContainer";

interface CarCardProps {
  car: ICar;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { doors, gear, image, make, model, pricePerDay, seatAmount, year } = car;
  const navigate = useNavigate();

  return (
    <Card className="bg-accent shadow-md  hover:shadow-lg">
      <CardHeader>
        <img className="h-full" src={image} alt="Car" />
        <SpecsIconContainer specs={{ doors, gear, seatAmount }} />
      </CardHeader>
      <CardContent>
        <p className="font-bold">{`${make} ${model}`}</p>
        <p className="font-bold text-foreground">{year}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <p className="font-bold">{pricePerDay}$ Per Day</p>
        <Button className="text-accent" onClick={() => navigate(`cars/rent/`)}>
          BOOK NOW
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
