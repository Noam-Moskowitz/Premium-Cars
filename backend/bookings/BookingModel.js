import mongoose, { Schema, model } from "mongoose";

const DateRangeSchema = new Schema({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
});

const bookingSchema = new Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pickupSpot: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    dropOffSpot: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    dates: { type: DateRangeSchema, required: true },
    paid: { type: Boolean, required: true, default: false },
    status: {
      type: String,
      enum: ["active", "canceled"],
      required: true,
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
  pickupSpot: Joi.string().required(),
  dropOffSpot: Joi.string().required(),
  dates: dateRangeSchema.required(),
  paid: Joi.boolean(),
  status: Joi.string().valid("active", "canceled").required(),
});
