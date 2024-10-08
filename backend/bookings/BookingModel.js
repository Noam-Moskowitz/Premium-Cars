import mongoose, { Schema, model } from "mongoose";
import Joi from "joi";

const DateRangeSchema = new Schema({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
});

const bookingSchema = new Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pickUpSpot: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    dropOffSpot: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    dates: { type: DateRangeSchema, required: true },
    paid: { type: Boolean, required: true, default: false },
    price: { type: Number, min: 1, required: true },
    status: {
      type: String,
      enum: ["active", "canceled"],
      required: true,
      default: "active",
    },
  },
  { timestamps: true }
);

export const Booking = model(`Bookings`, bookingSchema);

const dateRangeSchema = Joi.object({
  from: Joi.date().required(),
  to: Joi.date().required(),
});

export const bookingValidationSchema = Joi.object({
  carId: Joi.string().required(),
  userId: Joi.string().required(),
  pickUpSpot: Joi.string().required(),
  dropOffSpot: Joi.string().required(),
  dates: dateRangeSchema.required(),
  paid: Joi.boolean(),
  price: Joi.number().min(1),
  status: Joi.string().valid("active", "canceled").optional(),
});
