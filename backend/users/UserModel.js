import Joi from "joi";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
    uniqe: true,
    minLength: 5,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 15,
  },
  isAdmin: {
    type: Boolean,
  },
});

export const User = new model("User", userSchema);

export const userValidation = Joi.object({
  firstName: Joi.string().min(1).max(30).required(),
  lastName: Joi.string().min(1).max(40).required(),
  email: Joi.string().email().min(5).max(50).required(),
  phone: Joi.string().min(10).max(15).required(),
});
