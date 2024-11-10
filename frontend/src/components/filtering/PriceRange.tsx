import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";

interface PriceRangeProps {
  handleConfirm: (range: number[]) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ handleConfirm }) => {
  const [range, setRange] = useState<number[]>([]);

  const radioOpts = [
    {
      value: "0",
      id: `one`,
      label: `0-25$`,
    },
    {
      value: "1",
      id: `two`,
      label: `25-50$`,
    },
    {
      value: "2",
      id: `three`,
      label: `50-75$`,
    },
    {
      value: "3",
      id: `four`,
      label: `75$+`,
    },
  ];

  const ranges = [
    [0, 25],
    [25, 50],
    [50, 75],
    [75, 999_999_999],
  ];

  return (
    <div className="p-5 flex flex-col gap-2 ">
      <RadioGroup
        className=" grid grid-cols-2"
        onValueChange={(val) => setRange(ranges[Number(val)])}
      >
        {radioOpts.map(({ id, label, value }, i) => (
          <div key={i} className="flex items-center gap-2 p-1 ">
            <RadioGroupItem value={value} id={id} />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button variant="link" onClick={() => handleConfirm(range)}>
        Confirm
      </Button>
    </div>
  );
};

export default PriceRange;
