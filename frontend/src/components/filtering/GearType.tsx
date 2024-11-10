import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";

interface GearTypeProps {
  handleConfirm: (gearType: any) => void;
}

const GearType: React.FC<GearTypeProps> = ({ handleConfirm }) => {
  const [gearType, setGearType] = useState<string | null>(null);

  const handleClick = () => {
    if (!gearType) return;

    handleConfirm(gearType);
  };

  return (
    <div className=" p-5 flex flex-col gap-3">
      <RadioGroup onValueChange={(value) => setGearType(value)} className="flex">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Manual" id="manual" />
          <Label htmlFor="manual">Manual</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Automatic" id="automatic" />
          <Label htmlFor="automatic">Automatic</Label>
        </div>
      </RadioGroup>
      <Button variant="link" onClick={handleClick}>
        Confirm
      </Button>
    </div>
  );
};

export default GearType;
