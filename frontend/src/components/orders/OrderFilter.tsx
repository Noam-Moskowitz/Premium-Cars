import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { Switch } from "../ui/switch";
import GenericToggler from "../ui/GenericToggler";

const OrderFilter = () => {
  return (
    <div className="flex gap-5 p-1 bg-accent w-fit rounded">
      <GenericToggler />
      <GenericToggler />
      <GenericToggler />
      <GenericToggler />
    </div>
  );
};

export default OrderFilter;
