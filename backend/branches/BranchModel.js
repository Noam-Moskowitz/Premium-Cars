import Joi from "joi";
import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  houseNumber: {
    type: Number,
    required: true,
    min: 0,
  },
  city: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 90,
  },
  country: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 60,
  },
  state: {
    type: String,
    required: false,
  },
  zip: {
    type: String,
    required: false,
  },
});

const branchSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 1,
    maxlength: 150,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 12,
  },
  favorites: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
});

export const Branch = model(`Branches`, branchSchema);

const addressValidationSchema = Joi.object({
  street: Joi.string().min(1).max(50).required(),
  houseNumber: Joi.number().min(0).required(),
  city: Joi.string().min(1).max(90).required(),
  country: Joi.string().min(1).max(60).required(),
  state: Joi.string().optional(),
  zip: Joi.string().optional(),
});

export const branchValidationSchema = Joi.object({
  name: Joi.string().min(1).max(150).required(),
  address: addressValidationSchema.required(),
  phone: Joi.string().min(10).max(12).required(),
});
