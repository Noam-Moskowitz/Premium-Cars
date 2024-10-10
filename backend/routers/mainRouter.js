import express from "express";
import usersRouter from "./usersRouter.js";
import carRouter from "./carsRouter.js";
import bookingRouter from "./bookingsRouter.js";
import branchRouter from "./branchRouter.js";
import { checkIfBookingPassed } from "../bookings/bookingMiddleware.js";

const router = express.Router();

router.use(`/users`, usersRouter);
router.use(`/cars`, carRouter);
router.use(`/bookings`, checkIfBookingPassed, bookingRouter);
router.use(`/branches`, branchRouter);

export default router;
