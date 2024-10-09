import OrderCard from "@/components/orders/OrderCard";
import React, { useEffect } from "react";
import "animate.css";
import useCheckToken from "@/hooks/useCheckToken";
import { useSelector } from "react-redux";
import useBookingApi from "@/hooks/api/useBookingApi";
import { useQuery } from "@tanstack/react-query";
import { BOOKINGS_BY_USER_KEY, ONE_HOUR } from "@/consts/reactQuery";
import Loader from "@/components/ui/Loader";

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
    <div className="size-full">
      <h1 className="text-3xl font-bold p-5">My Orders</h1>
      <div className="flex flex-col m-auto w-2/3 gap-5 p-5 animate__animated animate__fadeInUp ">
        {data?.map((booking) => (
          <OrderCard key={booking._id} order={booking} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
