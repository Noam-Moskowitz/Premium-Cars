import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { FiChevronsRight } from "react-icons/fi";
import { Button } from "../ui/button";
import { IBooking } from "@/interfaces/booking";
import { useQuery } from "@tanstack/react-query";
import useCarsApi from "@/hooks/api/useCarsApi";
import { ONE_HOUR, SINGLE_BRANCH_KEY, SINGLE_CAR_KEY } from "@/consts/reactQuery";
import Loader from "../ui/Loader";
import useBranchApi from "@/hooks/api/useBranchApi";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import OrderCardBanner from "./OrderCardBanner";

interface OrderCardProps {
  order: IBooking;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { carId, price, paid, pickupSpot, dropOffSpot, dates, status, _id } = order;
  const { getOneCar } = useCarsApi();
  const { getOneBranch } = useBranchApi();
  const navigate = useNavigate();

  const passedOrder = new Date(dates.to || ``).getTime() < Date.now();

  const carResponse = useQuery({
    queryFn: () => getOneCar(carId),
    queryKey: [SINGLE_CAR_KEY + carId],
    staleTime: ONE_HOUR,
    enabled: !!carId,
  });

  const pickUpSpotResponse = useQuery({
    queryFn: () => getOneBranch(pickupSpot),
    queryKey: [SINGLE_BRANCH_KEY],
    staleTime: ONE_HOUR,
    enabled: !!pickupSpot,
  });

  const dropOffSpotResponse = useQuery({
    queryFn: () => getOneBranch(dropOffSpot),
    queryKey: [SINGLE_BRANCH_KEY],
    staleTime: ONE_HOUR,
    enabled: !!dropOffSpot,
  });

  if (carResponse.isLoading || pickUpSpotResponse.isLoading || dropOffSpotResponse.isLoading)
    return <Loader size="medium" />;

  return (
    <Card className="flex flex-col lg:flex-row relative">
      {status === `canceled` && <OrderCardBanner color="destructive" text="Canceled" />}
      {status === `passed` && <OrderCardBanner color="info" text="passed" />}
      <CardHeader className={`flex items-center lg:w-1/2 ${status !== `active` && `opacity-45`}`}>
        <img src={carResponse.data?.image} alt="Car" />
        <h2 className="font-bold text-lg">{`${carResponse.data?.make} ${carResponse.data?.model}`}</h2>
        <CardDescription>{carResponse.data?.year}</CardDescription>
      </CardHeader>
      <CardContent
        className={`lg:w-1/2 flex flex-col items-between justify-around gap-10 ${
          status !== `active` && `opacity-45`
        }`}
      >
        <div className="pt-10">
          <h6 className="text-center font-bold text-lg">Price:</h6>
          <h6 className="text-center  font-bold text-2xl text-primary">{paid ? `PAID ` : price}</h6>
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
        <div className="flex flex-col  justify-center gap-3">
          <Button
            disabled={passedOrder}
            variant="outline"
            onClick={() => navigate(`/cars/rent/${carId}/booking/${_id}`)}
          >
            Edit Order
          </Button>
          <Button disabled={passedOrder} variant="destructive">
            Cancel Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
