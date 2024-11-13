import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface ProfileItemContainerProps {
  editable: boolean;
  value: string;
  title: string;
  onValueChange: (value: any) => void;
}

const ProfileItemContainer: React.FC<ProfileItemContainerProps> = ({
  editable,
  value,
  title,
  onValueChange,
}) => {
  return (
    <div>
      <Label>{title}</Label>
      {editable ? (
        <Input value={value} onChange={(e) => onValueChange(e.target.value)} />
      ) : (
        <div className="p-2 px-4 bg-accent rounded shadow-inner">{value}</div>
      )}
    </div>
  );
};

export default ProfileItemContainer;
