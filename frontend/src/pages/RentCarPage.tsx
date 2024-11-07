import React, { useEffect } from "react";
import CarDetails from "@/components/cars/CarDetails";
import BookCarForm from "@/components/forms/BookCarForm";
import "animate.css";
import useCheckToken from "@/hooks/useCheckToken";
import { useParams } from "react-router-dom";
import useCarsApi from "@/hooks/api/useCarsApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BOOKING_QUERY_KEY,
  BOOKINGS_BY_CAR_KEY,
  BOOKINGS_BY_STATUS_KEY,
  BOOKINGS_BY_USER_KEY,
  ONE_HOUR,
  SINGLE_BOOKING_KEY,
  SINGLE_CAR_KEY,
} from "@/consts/reactQuery";
import Loader from "@/components/ui/Loader";
import useBookingApi from "@/hooks/api/useBookingApi";
import { IBooking } from "@/interfaces/booking";
import { useSelector } from "react-redux";
import useReactQueryUtils from "@/hooks/useReactQueryUtils";

const RentCarPage = () => {
  const { checkPermissions } = useCheckToken();
  const { id, bookingId } = useParams();
  const { getOneCar } = useCarsApi();
  const { getOneBooking, addBooking, updateBooking } = useBookingApi();
  const { errorFunc, successFunc } = useReactQueryUtils();
  const userId = useSelector((store: any) => store.user._id);

  const carResponse = useQuery({
    queryKey: [SINGLE_CAR_KEY + id],
    queryFn: () => getOneCar(id || ``),
    staleTime: ONE_HOUR,
    enabled: !!id,
  });

  const existingBookingResponse = useQuery({
    queryFn: () => getOneBooking(bookingId || ``),
    queryKey: [SINGLE_BOOKING_KEY + bookingId],
    staleTime: ONE_HOUR,
    enabled: !!bookingId,
  });

  const createNewBooking = useMutation({
    mutationFn: (bookingInfo: IBooking) => addBooking(bookingInfo),
    onSuccess: () =>
      successFunc(`Booking saved!`, [
        SINGLE_BOOKING_KEY + bookingId,
        BOOKING_QUERY_KEY,
        BOOKINGS_BY_CAR_KEY + id,
        BOOKINGS_BY_USER_KEY + userId,
        BOOKINGS_BY_STATUS_KEY + `canceled`,
        BOOKINGS_BY_STATUS_KEY + `active`,
      ]),
    onError: errorFunc,
  });

  const editBooking = useMutation({
    mutationFn: (bookingInfo: IBooking) => updateBooking(bookingId || ``, bookingInfo),
    onSuccess: () =>
      successFunc(`Booking updated!`, [
        SINGLE_BOOKING_KEY + bookingId,
        BOOKING_QUERY_KEY,
        BOOKINGS_BY_CAR_KEY + id,
        BOOKINGS_BY_USER_KEY + userId,
        BOOKINGS_BY_STATUS_KEY + `active`,
      ]),
    onError: errorFunc,
  });

  const handleSubmit = (bookingInfo: IBooking) => {
    if (bookingId) {
      editBooking.mutate(bookingInfo);
    } else {
      createNewBooking.mutate(bookingInfo);
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  if (carResponse.isLoading || (existingBookingResponse.isLoading && bookingId))
    return <Loader size="large" />;

  return (
    <div className="w-full h-[90vh]  flex flex-col item-center justify-between bg-accent">
      <div className="md:h-[60vh] pb-10 flex items-center animate__animated animate__fadeIn">
        <img
          className=" md:w-[500px] lg:w-[700px] m-auto"
          src={carResponse.data?.image}
          alt="Car Image"
        />
      </div>
      <CarDetails car={carResponse.data} />
      <div className="w-full  bg-background md:rounded-t-lg animate__animated animate__fadeInUp  flex justify-center items-center py-5  md:border-2 ">
        <BookCarForm
          carPrice={carResponse.data?.pricePerDay || 0}
          submitForm={handleSubmit}
          existingBooking={existingBookingResponse.data}
        />
      </div>
    </div>
  );
};

export default RentCarPage;
