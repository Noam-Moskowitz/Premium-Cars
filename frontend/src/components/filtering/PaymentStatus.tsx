import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface PaymentStatusProps {
  handleConfirm: (paymentStatus: any) => void;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ handleConfirm }) => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const handleClick = () => {
    if (!paymentStatus) return;

    handleConfirm(paymentStatus);
  };

  return (
    <div className="px-5 pt-5 flex flex-col gap-2">
      <RadioGroup onValueChange={(value) => setPaymentStatus(value)} className="flex">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Paid" id="paid" />
          <Label htmlFor="paid">Paid</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Unpaid" id="unpaid" />
          <Label htmlFor="unpaid">Unpaid</Label>
        </div>
      </RadioGroup>
      <Button variant="link" onClick={handleClick}>
        Confirm
      </Button>
    </div>
  );
};

export default PaymentStatus;
