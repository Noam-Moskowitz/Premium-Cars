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
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }

  if (!bookingsUser) return res.status(404).send({ message: `Could not verify user` });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send(err.message);

    const idValue = bookingsUser.userId;

    if (decoded.isAdmin || idValue.toString() === decoded._id) {
      return next();
    }

    return res.status(401).send({ message: `User not authorized!` });
  });
};

export const checkIfBookingPassed = async (req, res, next) => {
  try {
    const now = Date.now();

    const expiredBookings = await Booking.find({
      "dates.to": { $lt: now },
      status: { $ne: "passed" },
    });

    if (expiredBookings.length > 0) {
      const bookingIds = expiredBookings.map((booking) => booking._id);
      await Booking.updateMany({ _id: { $in: bookingIds } }, { status: "passed" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
