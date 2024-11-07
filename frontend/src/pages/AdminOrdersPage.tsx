import SearchFilterContainer from "@/components/filtering/SearchFilterContainer";
import OrderCard from "@/components/orders/OrderCard";
import ErrorComponent from "@/components/ui/ErrorComponent";
import Loader from "@/components/ui/Loader";
import NoResultsContainer from "@/components/ui/NoResultsContainer";
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

  if (isLoading) return <Loader size="large" />;
  if (isError) return <ErrorComponent errorMessage={error} />;

  return (
    <div className="size-full p-5">
      <SearchFilterContainer onConfirmFilters={() => {}} />
      {data.length == 0 ? (
        <NoResultsContainer title="No orders found!" />
      ) : (
        <div className="flex flex-col m-auto md:w-2/3 gap-5 p-5 animate__animated animate__fadeInUp ">
          {data?.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
