import React, { useState } from "react";
import SelectBranch from "../ui/SelectBranch";
import { Button } from "../ui/button";

interface BranchFilterProps {
  handleConfirm: (branch: string) => void;
}

const BranchFilter: React.FC<BranchFilterProps> = ({ handleConfirm }) => {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const handleClick = () => {
    if (!selectedBranch) return;

    handleConfirm(selectedBranch);
  };

  return (
    <div>
      <SelectBranch handleChange={(val) => setSelectedBranch(val)} value={selectedBranch || ``} />
      <Button variant="link" onClick={handleClick}>
        Confirm
      </Button>
    </div>
  );
};

export default BranchFilter;
