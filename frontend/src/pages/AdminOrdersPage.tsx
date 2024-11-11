import BranchFilter from "@/components/filtering/BranchFilter";
import OrderStatus from "@/components/filtering/OrderStatus";
import PaymentStatus from "@/components/filtering/PaymentStatus";
import SearchFilterContainer from "@/components/filtering/SearchFilterContainer";
import OrderCard from "@/components/orders/OrderCard";
import ErrorComponent from "@/components/ui/ErrorComponent";
import Loader from "@/components/ui/Loader";
import NoResultsContainer from "@/components/ui/NoResultsContainer";
import { BOOKING_QUERY_KEY, ONE_HOUR } from "@/consts/reactQuery";
import useBookingApi from "@/hooks/api/useBookingApi";
import useBranchApi from "@/hooks/api/useBranchApi";
import { IFilterItem } from "@/interfaces";
import { IBooking } from "@/interfaces/booking";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AdminOrdersPage = () => {
  const { getAllBookings } = useBookingApi();
  const { getOneBranch } = useBranchApi();

  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<IBooking[]>([]);
  const [pickupSpot, setPickupSpot] = useState<string | null>(null);
  const [dropoffSpot, setDropoffSpot] = useState<string | null>(null);
  const [branchNames, setBranchNames] = useState<{ collection?: string; return?: string }>({});

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [BOOKING_QUERY_KEY],
    queryFn: getAllBookings,
    staleTime: ONE_HOUR,
  });

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
      selectedFilter: branchNames.collection,
    },
    {
      component: <BranchFilter handleConfirm={(value) => setDropoffSpot(value)} />,
      name: `Return Branch`,
      selectedFilter: branchNames.return,
    },
  ];

  const clearFilters = () => {
    setOrderStatus(null);
    setPaymentStatus(null);
    setPickupSpot(null);
    setDropoffSpot(null);
    setBranchNames({});
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

  useEffect(() => {
    if (pickupSpot) {
      getOneBranch(pickupSpot).then((res) =>
        setBranchNames({ ...branchNames, collection: res.name })
      );
    }

    if (dropoffSpot) {
      getOneBranch(dropoffSpot).then((res) => setBranchNames({ ...branchNames, return: res.name }));
    }
  }, [pickupSpot, dropoffSpot]);

  if (isLoading) return <Loader size="large" />;
  if (isError) return <ErrorComponent errorMessage={error} />;

  return (
    <div className="size-full p-5">
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
            <OrderCard key={order._id} order={order} showUser />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
