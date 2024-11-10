import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface OrderStatusProps {
  handleConfirm: (ordertStatus: any) => void;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ handleConfirm }) => {
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  const handleClick = () => {
    if (!orderStatus) return;

    handleConfirm(orderStatus);
  };

  return (
    <div className="px-5 pt-5 flex flex-col gap-2">
      <RadioGroup onValueChange={(value) => setOrderStatus(value)} className="flex">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="active" id="pending" />
          <Label htmlFor="pending">Pending</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Canceled" id="canceled" />
          <Label htmlFor="canceled">Canceled</Label>
        </div>
      </RadioGroup>
      <Button variant="link" onClick={handleClick}>
        Confirm
      </Button>
    </div>
  );
};

export default OrderStatus;
