import express from "express";
import usersRouter from "./usersRouter.js";
import carRouter from "./carsRouter.js";
import bookingRouter from "./bookingsRouter.js";

const router = express.Router();

router.use(`/users`, usersRouter);
router.use(`/cars`, carRouter);
router.use(`/bookings`, bookingRouter);

export default router;
