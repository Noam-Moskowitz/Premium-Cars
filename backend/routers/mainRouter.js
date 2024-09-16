import express from "express";
import usersRouter from "./usersRouter.js";
import carRouter from "./carsRouter.js";

const router = express.Router();

router.use(`/users`, usersRouter);
router.use(`/cars`, carRouter);

export default router;
