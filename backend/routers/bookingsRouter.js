import express from "express";
import { checkIfAdmin, validateToken } from "../token/tokenMiddleware.js";
import { BookingController } from "../bookings/BookingController.js";
import { checkIfUserWhoBookedOrAdmin, validateBooking } from "../bookings/bookingMiddleware.js";

const router = express.Router();

router.get(`/`, checkIfAdmin, BookingController.getAllBookings);

router.get(`/one/:id`, BookingController.getOneBooking);

router.get(`/user/:userId`, BookingController.getBookingsByUser);

router.get(
  `/status/:status/user/:userId`,

  BookingController.getBookingsByStatus
);

router.get(`/car/:carId`, BookingController.getBookingsByCar);

router.post(`/`, validateToken, validateBooking, BookingController.addBooking);

router.put(`/:id`, checkIfUserWhoBookedOrAdmin, validateBooking, BookingController.updateBooking);

router.patch(`/:id`, checkIfUserWhoBookedOrAdmin, BookingController.changeBookingStatus);

router.delete(`/:id`, checkIfAdmin, BookingController.deleteBooking);

export default router;
