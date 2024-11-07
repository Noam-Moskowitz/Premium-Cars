import SearchFilterContainer from "@/components/filtering/SearchFilterContainer";
import OrderCard from "@/components/orders/OrderCard";
import { BOOKING_QUERY_KEY, ONE_HOUR } from "@/consts/reactQuery";
import useBookingApi from "@/hooks/api/useBookingApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdminOrdersPage = () => {
  const { getAllBookings } = useBookingApi();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [BOOKING_QUERY_KEY],
    queryFn: getAllBookings,
    staleTime: ONE_HOUR,
  });

  return (
    <div className="size-full p-5">
      <SearchFilterContainer onConfirmFilters={() => {}} />
      {data?.map((order) => (
        <OrderCard order={order} />
      ))}
    </div>
  );
};

export default AdminOrdersPage;
