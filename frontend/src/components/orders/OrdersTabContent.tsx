import {
  BOOKING_QUERY_KEY,
  BOOKINGS_BY_CAR_KEY,
  BOOKINGS_BY_STATUS_KEY,
  BOOKINGS_BY_USER_KEY,
  ONE_HOUR,
} from "@/consts/reactQuery";
import useBookingApi from "@/hooks/api/useBookingApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import Loader from "../ui/Loader";
import ErrorComponent from "../ui/ErrorComponent";
import NoResultsContainer from "../ui/NoResultsContainer";
import DeleteModal from "../ui/DeleteModal";
import useReactQueryUtils from "@/hooks/useReactQueryUtils";

interface OrdersTabContentProps {
  status?: string;
}

const OrdersTabContent: React.FC<OrdersTabContentProps> = ({ status }) => {
  const { getBookingsByStatus, getBookingsByUser, changeBookingStatus } = useBookingApi();
  const userId = useSelector((store: any) => store.user._id);
  const { errorFunc, successFunc } = useReactQueryUtils();

  const [openModal, setOpenModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<{
    orderId?: string;
    carId?: string;
  }>({});

  const { data, error, isError, isLoading } = useQuery({
    queryFn: status ? () => getBookingsByStatus(status, userId) : () => getBookingsByUser(userId),
    queryKey: status ? [BOOKINGS_BY_STATUS_KEY + status] : [BOOKINGS_BY_USER_KEY + userId],
    staleTime: ONE_HOUR,
    enabled: status ? !!userId && !!status : !!userId,
  });

  const changeStatus = useMutation({
    mutationFn: () => changeBookingStatus(orderToCancel.orderId || ``),
    onSuccess: () =>
      successFunc(`Order cancled!`, [
        BOOKING_QUERY_KEY,
        BOOKINGS_BY_STATUS_KEY + `canceled`,
        BOOKINGS_BY_STATUS_KEY + `active`,
        BOOKINGS_BY_CAR_KEY + orderToCancel.carId || ``,
        BOOKINGS_BY_USER_KEY + userId,
      ]),
    onError: errorFunc,
  });

  const handleDelete = (carId: string, orderId: string) => {
    setOrderToCancel({ orderId, carId });
    setOpenModal(true);
  };

  if (isLoading) return <Loader size="large" variant="screen" />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  return (
    <>
      <div className="flex flex-col m-auto md:w-2/3 gap-5 p-5 animate__animated animate__fadeInUp ">
        {data?.length === 0 && <NoResultsContainer title="You dont have any orders!" />}
        {data?.map((booking) => (
          <OrderCard
            key={booking._id}
            order={booking}
            handleCancel={() => handleDelete(booking.carId, booking._id || ``)}
          />
        ))}
      </div>
      <DeleteModal
        handleOpenChange={setOpenModal}
        open={openModal}
        variant="cancel"
        handleConfirm={changeStatus.mutate}
      />
    </>
  );
};

export default OrdersTabContent;
