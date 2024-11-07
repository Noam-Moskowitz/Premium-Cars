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
  const userId = useSelector((store: any) => store.user._id);

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <div className="size-full ">
      <OrdersTabContent status="active" />
    </div>
  );
};

export default MyOrders;
