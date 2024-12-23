import BranchFilter from "@/components/filtering/BranchFilter";
import OrderStatus from "@/components/filtering/OrderStatus";
import PaymentStatus from "@/components/filtering/PaymentStatus";
import SearchFilterContainer from "@/components/filtering/SearchFilterContainer";
import OrderCard from "@/components/orders/OrderCard";
import DeleteModal from "@/components/ui/DeleteModal";
import ErrorComponent from "@/components/ui/ErrorComponent";
import Loader from "@/components/ui/Loader";
import NoResultsContainer from "@/components/ui/NoResultsContainer";
import {
  BOOKING_QUERY_KEY,
  BOOKINGS_BY_CAR_KEY,
  BOOKINGS_BY_STATUS_KEY,
  BOOKINGS_BY_USER_KEY,
  ONE_HOUR,
  SINGLE_BRANCH_KEY,
} from "@/consts/reactQuery";
import useBookingApi from "@/hooks/api/useBookingApi";
import useBranchApi from "@/hooks/api/useBranchApi";
import useReactQueryUtils from "@/hooks/useReactQueryUtils";
import { IFilterItem } from "@/interfaces";
import { IBooking } from "@/interfaces/booking";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AdminOrdersPage = () => {
  const { getAllBookings, changeBookingStatus } = useBookingApi();
  const { getOneBranch } = useBranchApi();
  const { errorFunc, successFunc } = useReactQueryUtils();

  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<IBooking[]>([]);
  const [pickupSpot, setPickupSpot] = useState<string | null>(null);
  const [dropoffSpot, setDropoffSpot] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<{
    orderId?: string;
    carId?: string;
    userId?: string;
  }>({});

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [BOOKING_QUERY_KEY],
    queryFn: getAllBookings,
    staleTime: ONE_HOUR,
  });

  const collectionBranchResponse = useQuery({
    queryKey: [SINGLE_BRANCH_KEY + pickupSpot],
    queryFn: () => getOneBranch(pickupSpot || ``),
    staleTime: ONE_HOUR,
    enabled: !!pickupSpot,
  });

  const returnBranchResponse = useQuery({
    queryKey: [SINGLE_BRANCH_KEY + dropoffSpot],
    queryFn: () => getOneBranch(dropoffSpot || ``),
    staleTime: ONE_HOUR,
    enabled: !!dropoffSpot,
  });

  const changeStatus = useMutation({
    mutationFn: () => changeBookingStatus(orderToCancel.orderId || ``),
    onSuccess: () =>
      successFunc(`Order cancled!`, [
        BOOKING_QUERY_KEY,
        BOOKINGS_BY_STATUS_KEY + `canceled`,
        BOOKINGS_BY_STATUS_KEY + `active`,
        BOOKINGS_BY_CAR_KEY + orderToCancel.carId || ``,
        BOOKINGS_BY_USER_KEY + orderToCancel.userId,
      ]),
    onError: errorFunc,
  });

  const handleDelete = (carId: string, orderId: string, userId: string) => {
    setOrderToCancel({ orderId, carId, userId });
    setOpenModal(true);
  };

  const filterItems: IFilterItem[] = [
    {
      component: <OrderStatus handleConfirm={(value) => setOrderStatus(value)} />,
      name: `Order Status`,
      selectedFilter: orderStatus,
    },
    {
      component: <PaymentStatus handleConfirm={(value) => setPaymentStatus(value)} />,
      name: `Payment Status`,
      selectedFilter: paymentStatus,
    },
    {
      component: <BranchFilter handleConfirm={(value) => setPickupSpot(value)} />,
      name: `Collection Branch`,
      selectedFilter: collectionBranchResponse.data?.name,
    },
    {
      component: <BranchFilter handleConfirm={(value) => setDropoffSpot(value)} />,
      name: `Return Branch`,
      selectedFilter: returnBranchResponse.data?.name,
    },
  ];

  const clearFilters = () => {
    setOrderStatus(null);
    setPaymentStatus(null);
    setPickupSpot(null);
    setDropoffSpot(null);
  };

  useEffect(() => {
    if (!data) return;

    setFilteredOrders(data);
  }, [data]);

  useEffect(() => {
    if (!orderStatus && !paymentStatus && !pickupSpot && !dropoffSpot)
      return setFilteredOrders(data || []);

    let newArray = [...data];

    if (orderStatus) {
      newArray = newArray.filter((order) => order.status == orderStatus.toLocaleLowerCase());
    }

    if (paymentStatus) {
      newArray = newArray.filter((order) => (paymentStatus == `Paid` ? order.paid : !order.paid));
    }

    if (pickupSpot) {
      newArray = newArray.filter((order) => order.pickUpSpot == pickupSpot);
    }

    if (dropoffSpot) {
      newArray = newArray.filter((order) => order.dropOffSpot == dropoffSpot);
    }

    setFilteredOrders(newArray);
  }, [paymentStatus, orderStatus, pickupSpot, dropoffSpot]);

  if (isLoading) return <Loader size="large" variant="screen" />;
  if (isError || collectionBranchResponse.isError || returnBranchResponse.isError)
    return (
      <ErrorComponent
        errorMessage={
          error?.message ||
          collectionBranchResponse.error?.message ||
          returnBranchResponse.error?.message
        }
      />
    );

  return (
    <>
      <div className="size-full min-h-[80vh] p-5">
        <SearchFilterContainer
          onClear={clearFilters}
          showClearButton={Boolean(orderStatus || paymentStatus || pickupSpot || dropoffSpot)}
          filtersArray={filterItems}
        />
        {filteredOrders.length == 0 ? (
          <NoResultsContainer title="No orders found!" />
        ) : (
          <div className="flex flex-col m-auto md:w-2/3 gap-5 p-5 animate__animated animate__fadeInUp ">
            {filteredOrders?.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                showUser
                handleCancel={() => handleDelete(order.carId, order._id || ``, order.userId)}
              />
            ))}
          </div>
        )}
      </div>
      <DeleteModal
        handleConfirm={changeStatus.mutate}
        handleOpenChange={setOpenModal}
        open={openModal}
        variant="cancel"
      />
    </>
  );
};

export default AdminOrdersPage;
