import React from "react";
import { Switch } from "./switch";

const GenericToggler = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h4 className="text-sm font-semibold">balls and butt</h4>
      <Switch className="h-4" defaultChecked />
    </div>
  );
};

export default GenericToggler;
