import OrderCard from "@/components/orders/OrderCard";
import { useEffect } from "react";
import "animate.css";
import useCheckToken from "@/hooks/useCheckToken";
import { useSelector } from "react-redux";
import useBookingApi from "@/hooks/api/useBookingApi";
import { useQuery } from "@tanstack/react-query";
import { BOOKINGS_BY_USER_KEY, ONE_HOUR } from "@/consts/reactQuery";
import Loader from "@/components/ui/Loader";
import { ITab } from "@/interfaces/tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersTabContent from "@/components/orders/OrdersTabContent";
import { Button } from "@/components/ui/button";
import { MdHistory } from "react-icons/md";
import { RiListUnordered } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const tabs: ITab = {
  headers: [
    { value: `activeOrders`, name: `Active Orders` },
    { value: `canceledOrders`, name: `Canceled Orders` },
    { value: `allOrders`, name: `All Orders` },
  ],
  content: [
    {
      value: `activeOrders`,
      status: `active`,
      title: `My Active Orders`,
    },
    {
      value: `canceledOrders`,
      status: `canceled`,
      title: `My Canceled Orders`,
    },
    {
      value: `allOrders`,
      title: `My Orders`,
    },
  ],
};

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
    <div className="size-full p-10">
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
