import { useEffect } from "react";
import "animate.css";
import useCheckToken from "@/hooks/useCheckToken";

import OrdersTabContent from "@/components/orders/OrdersTabContent";
import { Button } from "@/components/ui/button";
import { MdHistory } from "react-icons/md";
import { RiListUnordered } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const MyOrders = () => {
  const { checkPermissions } = useCheckToken();
  const { status } = useParams();
  const navigate = useNavigate();

  const activeValues = {
    title: `My Orders`,
    navLink: `/my-orders/history`,
    ordersToRetrieve: `active`,
    icon: <MdHistory className="text-3xl" />,
    iconTitle: `History`,
  };

  const historyValues = {
    title: `Order History`,
    navLink: `/my-orders/active`,
    ordersToRetrieve: undefined,
    icon: <RiListUnordered className="text-3xl" />,
    iconTitle: `My Oders`,
  };

  const values = status == `active` ? activeValues : historyValues;

  const { navLink, ordersToRetrieve, title, icon, iconTitle } = values;

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <div className="size-full p-10 min-h-[70vh]">
      <div className="flex justify-around items-center">
        <h1 className="text-xl md:text-4xl font-bold">{title}</h1>
        <Button variant="secondary" className="flex gap-2" onClick={() => navigate(navLink)}>
          {icon}
          {iconTitle}
        </Button>
      </div>
      <OrdersTabContent status={ordersToRetrieve} />
    </div>
  );
};

export default MyOrders;
