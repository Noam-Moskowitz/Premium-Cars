import { carValidationSchema } from "./CarModel.js";

export const validateCar = (req, res, next) => {
  const carDetails = req.body;

  const { error } = carValidationSchema.validate(carDetails);

  if (error) return res.status(400).send({ message: error.details[0] });

  next();
};
