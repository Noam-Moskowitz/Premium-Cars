import express from "express";
import { checkIfAdmin } from "../token/tokenMiddleware";
import { BookingController } from "../bookings/BookingController.js";

const router = express.Router();

router.get(`/`, checkIfAdmin, BookingController.getAllBookings);

export default router;
