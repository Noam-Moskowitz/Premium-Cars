import express from "express";
import { validateLoginCredentials, validateNewUserDetails } from "../users/userMiddlware.js";
import { UsersController } from "../users/UsersController.js";

const router = express.Router();

router.post(`/login`, validateLoginCredentials, UsersController.logIn);
router.get(`/`, UsersController.getAllUsers);
router.get(`/:id`, UsersController.getUser);
router.post(`/`, validateNewUserDetails, UsersController.addUser);
router.put(`/:id`, validateNewUserDetails, UsersController.updateUser);
router.delete(`/:id`, UsersController.deleteUser);

export default router;
