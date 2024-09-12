import express from "express";
import { validateLoginCredentials } from "../users/userMiddlware.js";
import { UsersController } from "../users/UsersController.js";

const router = express.Router();

router.post(`/login`, validateLoginCredentials, UsersController.logIn);
router.get(`/`, UsersController.getAllUsers);

export default router;
