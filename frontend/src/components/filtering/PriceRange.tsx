import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PriceRange = () => {
  const [range, setRange] = useState<number[]>([]);

  const radioOpts = [
    {
      value: "1",
      id: `one`,
      label: `0-25$`,
    },
    {
      value: "2",
      id: `two`,
      label: `25-50$`,
    },
    {
      value: "3",
      id: `three`,
      label: `50-75$`,
    },
    {
      value: "4",
      id: `four`,
      label: `75$+`,
    },
  ];

  const ranges = [[0, 25], [25, 50], [50, 75], [75]];

  useEffect(() => {
    console.log(range);
  }, [range]);

  return (
    <div className="p-5 w-auto">
      <RadioGroup
        className=" w-44 grid grid-cols-2"
        onValueChange={(val) => setRange(ranges[Number(val)])}
      >
        {radioOpts.map(({ id, label, value }, i) => (
          <div key={i} className="flex items-center gap-2 p-1 ">
            <RadioGroupItem value={value} id={id} />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PriceRange;
