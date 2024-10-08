import { deleteItem, fetchData, patchItem, sendData, updateItem } from "@/API/api";
import { IBooking } from "@/interfaces/booking";
import React from "react";

const BOOKINGS_ENDPOINT = `/bookings`;

const useBookingApi = () => {
  const getAllBookings = () => fetchData<IBooking[]>(BOOKINGS_ENDPOINT);

  const getOneBooking = (bookingId: string) =>
    fetchData<IBooking>(`${BOOKINGS_ENDPOINT}/one/${bookingId}`);

  const getBookingsByUser = (userId: string) =>
    fetchData<IBooking[]>(`${BOOKINGS_ENDPOINT}/user/${userId}`);

  const getBookingsByStatus = (status: string) =>
    fetchData<IBooking[]>(`${BOOKINGS_ENDPOINT}/status/${status}`);

  const getBookingsByCar = (carId: string) =>
    fetchData<IBooking[]>(`${BOOKINGS_ENDPOINT}/car/${carId}`);

  const addBooking = (bookingInfo: IBooking) => sendData<IBooking>(BOOKINGS_ENDPOINT, bookingInfo);

  const updateBooking = (bookingId: string, bookingInfo: IBooking) =>
    updateItem<IBooking>(`${BOOKINGS_ENDPOINT}/${bookingId}`, bookingInfo);

  const changeBookingStatus = (bookingId: string) =>
    patchItem<IBooking>(`${BOOKINGS_ENDPOINT}/${bookingId}`);

  const deleteBooking = (bookingId: string) => deleteItem<IBooking>(BOOKINGS_ENDPOINT, bookingId);

  return {
    getAllBookings,
    getBookingsByCar,
    getBookingsByUser,
    getBookingsByStatus,
    getOneBooking,
    addBooking,
    updateBooking,
    changeBookingStatus,
    deleteBooking,
  };
};

export default useBookingApi;
