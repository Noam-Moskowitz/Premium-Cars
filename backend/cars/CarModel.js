import Joi from "joi";
import { model, Schema } from "mongoose";

const carSchema = new Schema({
  make: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  model: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  year: {
    type: Number,
    required: true,
    min: 1886,
    max: new Date().getFullYear(),
  },
  seatAmount: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 1,
  },
  gear: {
    type: String,
    required: true,
    enum: ["Automatic", "Manual"],
  },
  doors: {
    type: Number,
    required: true,
    min: 2,
    max: 8,
  },
});

export const Car = model(`Cars`, carSchema);

export const carValidationSchema = Joi.object({
  make: Joi.string().min(1).max(50).required().messages({
    "string.base": "Make must be a string.",
    "string.min": "Make must be at least 1 character long.",
    "string.max": "Make cannot exceed 50 characters.",
    "any.required": "Make is required.",
  }),
  model: Joi.string().min(1).max(50).required().messages({
    "string.base": "Model must be a string.",
    "string.min": "Model must be at least 1 character long.",
    "string.max": "Model cannot exceed 50 characters.",
    "any.required": "Model is required.",
  }),
  year: Joi.number()
    .integer()
    .min(1886)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.base": "Year must be a number.",
      "number.min": "Year cannot be before 1886.",
      "number.max": `Year cannot be later than ${new Date().getFullYear()}.`,
      "any.required": "Year is required.",
    }),
  seatAmount: Joi.number().integer().min(1).max(12).required().messages({
    "number.base": "Seat amount must be a number.",
    "number.min": "Seat amount must be at least 1.",
    "number.max": "Seat amount cannot exceed 12.",
    "any.required": "Seat amount is required.",
  }),
  pricePerDay: Joi.number().min(1).required().messages({
    "number.base": "Price per day must be a number.",
    "number.min": "Price per day must be at least 1.",
    "any.required": "Price per day is required.",
  }),
  gear: Joi.string().valid("Automatic", "Manual").required().messages({
    "string.base": "Gear must be a string.",
    "any.only": "Gear must be either Automatic or Manual.",
    "any.required": "Gear is required.",
  }),
  doors: Joi.number().integer().min(2).max(8).required().messages({
    "number.base": "Doors must be a number.",
    "number.min": "Doors must be at least 2.",
    "number.max": "Doors cannot exceed 8.",
    "any.required": "Doors are required.",
  }),
});
