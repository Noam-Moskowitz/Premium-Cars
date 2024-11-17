import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { FiChevronsRight } from "react-icons/fi";
import { Button } from "../ui/button";
import { IBooking } from "@/interfaces/booking";
import { useMutation, useQuery } from "@tanstack/react-query";
import useCarsApi from "@/hooks/api/useCarsApi";
import {
  BOOKING_QUERY_KEY,
  BOOKINGS_BY_CAR_KEY,
  BOOKINGS_BY_STATUS_KEY,
  BOOKINGS_BY_USER_KEY,
  ONE_HOUR,
  SINGLE_BRANCH_KEY,
  SINGLE_CAR_KEY,
  SINGLE_USER_KEY,
} from "@/consts/reactQuery";
import Loader from "../ui/Loader";
import useBranchApi from "@/hooks/api/useBranchApi";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import OrderCardBanner from "./OrderCardBanner";
import useUserApi from "@/hooks/api/useUserApi";
import ErrorComponent from "../ui/ErrorComponent";

interface OrderCardProps {
  order: IBooking;
  showUser?: boolean;
  handleCancel: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, showUser = false, handleCancel }) => {
  const { carId, price, paid, pickUpSpot, dropOffSpot, dates, status, _id, userId } = order;
  const { getOneCar } = useCarsApi();
  const { getOneBranch } = useBranchApi();
  const { getOneUser } = useUserApi();
  const navigate = useNavigate();

  const carResponse = useQuery({
    queryFn: () => getOneCar(carId),
    queryKey: [SINGLE_CAR_KEY + carId],
    staleTime: ONE_HOUR,
    enabled: !!carId,
  });

  const pickUpSpotResponse = useQuery({
    queryFn: () => getOneBranch(pickUpSpot),
    queryKey: [SINGLE_BRANCH_KEY + pickUpSpot],
    staleTime: ONE_HOUR,
    enabled: !!pickUpSpot,
  });

  const dropOffSpotResponse = useQuery({
    queryFn: () => getOneBranch(dropOffSpot),
    queryKey: [SINGLE_BRANCH_KEY + dropOffSpot],
    staleTime: ONE_HOUR,
    enabled: !!dropOffSpot,
  });

  const userResponse = useQuery({
    queryFn: () => getOneUser(userId),
    queryKey: [SINGLE_USER_KEY + userId],
    staleTime: ONE_HOUR,
    enabled: !!userId,
  });

  if (
    carResponse.isLoading ||
    pickUpSpotResponse.isLoading ||
    dropOffSpotResponse.isLoading ||
    userResponse.isLoading
  )
    return <Loader size="medium" />;

  if (
    carResponse.isError ||
    pickUpSpotResponse.isError ||
    dropOffSpotResponse.isError ||
    userResponse.isError
  )
    return (
      <ErrorComponent
        errorMessage={
          carResponse.error ||
          pickUpSpotResponse.error ||
          dropOffSpotResponse.error ||
          userResponse.error
        }
      />
    );

  return (
    <Card className="flex flex-col lg:flex-row relative">
      {status === `canceled` && <OrderCardBanner variant="canceled" />}
      {status === `passed` && <OrderCardBanner variant="fullfilled" />}
      <CardHeader className={`flex items-center lg:w-1/2 ${status !== `active` && `opacity-45`} `}>
        <img src={carResponse.data?.image} alt="Car" />
        <h2 className="font-bold text-lg">{`${carResponse.data?.make} ${carResponse.data?.model}`}</h2>
        <CardDescription>{carResponse.data?.year}</CardDescription>
        {showUser && (
          <div className="text-left">
            <p className="font-bold">Customer Information:</p>
            <p>
              <span className="font-semibold">Name:</span>
              {` ${userResponse.data.firstName} ${userResponse.data.lastName}`}
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {userResponse.data.email}
            </p>
            <p>
              <span className="font-semibold">Phone: </span>
              {userResponse.data.phone}
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent className="lg:w-1/2 flex flex-col items-between md:justify-around gap-2 md:gap-10">
        <div className={`${status !== `active` && `opacity-45`}`}>
          <div className="md:pt-10">
            <h6 className="text-center font-bold text-lg">Price:</h6>
            <h6 className="text-center  font-bold text-2xl text-primary">
              {paid ? `PAID ` : price}
            </h6>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col font-bold items-center">
              <h6>{pickUpSpotResponse.data?.name}</h6>
              <h6>10:00 AM</h6>
              <h6>{format(dates.from || ``, "LLL dd, y")}</h6>
            </div>
            <FiChevronsRight size={35} className="text-primary" />
            <div className="flex flex-col font-bold items-center">
              <h6>{dropOffSpotResponse.data?.name}</h6>
              <h6>15:00 PM</h6>
              <h6>{format(dates.to || ``, "LLL dd, y")}</h6>
            </div>
          </div>
        </div>
        <div className="flex flex-col  justify-center gap-3">
          {status == `active` ? (
            <>
              <Button
                variant="outline"
                onClick={() => navigate(`/cars/rent/${carId}/booking/${_id}`)}
              >
                Edit Order
              </Button>
              <Button variant="destructive" onClick={handleCancel}>
                Cancel Order
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate(`/cars/rent/${carId}`)}>Reserve Car</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
