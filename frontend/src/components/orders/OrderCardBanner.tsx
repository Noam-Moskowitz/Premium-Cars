import React from "react";

interface OrderCardBannerProps {
  variant: `fullfilled` | `canceled`;
}

const OrderCardBanner: React.FC<OrderCardBannerProps> = ({ variant }) => {
  return (
    <div
      className={`w-full ${
        variant == `canceled` ? `bg-destructive` : `bg-info`
      }  text-destructive-foreground absolute top-5 shadow-lg p-1 flex items-center justify-center`}
    >
      <p className="font-bold uppercase">{variant == `canceled` ? `Canceled` : `Fulfilled`}</p>
    </div>
  );
};

export default OrderCardBanner;
