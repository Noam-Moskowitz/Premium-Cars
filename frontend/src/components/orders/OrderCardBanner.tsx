import React from "react";

interface OrderCardBannerProps {
  color: string;
  text: string;
}

const OrderCardBanner: React.FC<OrderCardBannerProps> = ({ color, text }) => {
  return (
    <div
      className={`w-full bg-${color} text-destructive-foreground absolute top-5 shadow-lg p-1 flex items-center justify-center`}
    >
      <p className="font-bold uppercase">{text}</p>
    </div>
  );
};

export default OrderCardBanner;
