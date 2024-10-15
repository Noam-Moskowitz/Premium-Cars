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
  const { getBookingsByUser } = useBookingApi();
  const userId = useSelector((store: any) => store.user._id);

  const { data, isError, error, isLoading } = useQuery({
    queryFn: () => getBookingsByUser(userId),
    queryKey: [BOOKINGS_BY_USER_KEY + userId],
    enabled: !!userId,
    staleTime: ONE_HOUR,
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  if (isLoading) return <Loader size="large" />;

  return (
    <div className="size-full p-5 md:p-10">
      <Tabs defaultValue="activeOrders" className="flex flex-col items-center">
        <TabsList className="w-fit">
          {tabs.headers.map(({ name, value }, i) => (
            <TabsTrigger key={i} value={value}>
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.content.map(({ title, value, status }, i) => (
          <TabsContent value={value}>
            <OrdersTabContent title={title} status={status} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MyOrders;
