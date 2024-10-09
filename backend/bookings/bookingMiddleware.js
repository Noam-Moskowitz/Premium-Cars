import { Booking, bookingValidationSchema } from "./BookingModel.js";
import jwt from "jsonwebtoken";

export const validateBooking = (req, res, next) => {
  const bookingDetails = req.body;

  const { error } = bookingValidationSchema.validate(bookingDetails);

  if (error) return res.status(400).send({ message: error.details[0] });

  next();
};

export const checkIfUserWhoBookedOrAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id, userId } = req.params;

  if (!token) return res.status(401).send({ message: `User not authorized!` });

  let bookingsUser;

  try {
    if (userId) {
      bookingsUser = await Booking.findOne({ userId }).select({ userId: 1 });
    } else {
      bookingsUser = await Booking.findById(id).select({ userId: 1 });
    }
    console.log(bookingsUser);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send(err.message);

    const idValue = bookingsUser.userId;

    if (decoded.isAdmin || idValue.toString() === decoded._id) {
      return next();
    }

    return res.status(401).send({ message: `User not authorized!` });
  });
};
