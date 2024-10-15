import { BOOKINGS_BY_STATUS_KEY, BOOKINGS_BY_USER_KEY, ONE_HOUR } from "@/consts/reactQuery";
import useBookingApi from "@/hooks/api/useBookingApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import Loader from "../ui/Loader";

interface OrdersTabContentProps {
  status?: string;
  title: string;
}

const OrdersTabContent: React.FC<OrdersTabContentProps> = ({ status, title }) => {
  const { getBookingsByStatus, getBookingsByUser } = useBookingApi();
  const userId = useSelector((store: any) => store.user._id);

  const { data, error, isError, isLoading } = useQuery({
    queryFn: status ? () => getBookingsByStatus(status, userId) : () => getBookingsByUser(userId),
    queryKey: status ? [BOOKINGS_BY_STATUS_KEY + status] : [BOOKINGS_BY_USER_KEY + userId],
    staleTime: ONE_HOUR,
    enabled: !!status || !!userId,
  });

  if (isLoading) return <Loader size="large" />;

  return (
    <div className="bg-secondary rounded shadow-md overflow-hidden">
      <h1 className="text-3xl font-bold p-5">{title}</h1>
      <div className="flex flex-col m-auto md:w-2/3 gap-5 p-5 animate__animated animate__fadeInUp ">
        {data?.length === 0 && (
          <div className="size-full flex items-center justify-center p-5">
            <h1>No orders found!</h1>
          </div>
        )}
        {data?.map((booking) => (
          <OrderCard key={booking._id} order={booking} />
        ))}
      </div>
    </div>
  );
};

export default OrdersTabContent;
