import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";
import CarSpecsIcon from "./CarSpecsIcon";
import { GiCarDoor, GiCarSeat, GiGearStickPattern } from "react-icons/gi";

const CarCard = () => {
  return (
    <Card className="bg-accent shadow-md w-72">
      <CardHeader>
        <img className="h-full" src="./images/testCar.png" alt="Car" />
        <div className="flex justify-center gap-8">
          <CarSpecsIcon icon={<GiCarDoor />} specs={3} />
          <CarSpecsIcon icon={<GiGearStickPattern />} specs="Manual" />
          <CarSpecsIcon icon={<GiCarSeat />} specs={2} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-bold">Porche Gt-1230</p>
        <p className="font-bold text-foreground">2016</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <p className="font-bold">386$ Per Day</p>
        <Button className="text-accent">BOOK NOW</Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
