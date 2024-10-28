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
  phone: {
    type: String,
    minLength: 10,
    maxLength: 15,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
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
  isAdmin: Joi.boolean(),
  password: Joi.string()
    .pattern(new RegExp("(?=.*[a-z])"), "lowercase letter", {
      "string.pattern.name": "Password must contain at least one lowercase letter.",
    })
    .pattern(new RegExp("(?=.*[A-Z])"), "uppercase letter", {
      "string.pattern.name": "Password must contain at least one uppercase letter.",
    })
    .pattern(new RegExp("(?=.*\\d)"), "digit", {
      "string.pattern.name": "Password must contain at least one digit.",
    })
    .pattern(new RegExp("(?=.*[@$!%*?&])"), "special character", {
      "string.pattern.name": "Password must contain at least one special character (@$!%*?&).",
    })
    .min(8)
    .messages({
      "string.min": "Password must be at least {#limit} characters long.",
    }),
});
