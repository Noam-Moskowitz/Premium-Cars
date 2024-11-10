import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface DoorsProps {
  handleConfirm: (inputValue: string) => void;
}

const Doors: React.FC<DoorsProps> = ({ handleConfirm }) => {
  const [inputValue, setInputValue] = useState<string>();

  const handleClick = () => {
    if (!inputValue) return;

    handleConfirm(inputValue);
  };

  return (
    <div className="p-5  flex flex-col">
      <>
        <label htmlFor="doorNumber">Choose amount of doors</label>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          id="doorNumber"
          min={0}
          type="number"
          placeholder="1-2-3"
        />
      </>
      <Button variant="link" onClick={handleClick}>
        Confirm
      </Button>
    </div>
  );
};

export default Doors;
