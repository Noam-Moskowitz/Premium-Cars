import express from "express";
import { CarController } from "../cars/CarController.js";
import { checkIfAdmin } from "../token/tokenMiddleware.js";
import { validateCar } from "../cars/carMiddleware.js";

const router = express.Router();

router.get(`/`, CarController.getAllCars);

router.get(`/:id`, CarController.getOneCar);

router.post(`/`, checkIfAdmin, validateCar, CarController.addCar);

router.put(`/:id`, checkIfAdmin, validateCar, CarController.updateCar);

router.delete(`/:id`, checkIfAdmin, CarController.deleteCar);

export default router;
