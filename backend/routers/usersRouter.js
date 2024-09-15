import express from "express";
import { validateLoginCredentials, validateNewUserDetails } from "../users/userMiddlware.js";
import { UsersController } from "../users/UsersController.js";
import { checkIfAdmin, checkIfUserOrAdmin, validateToken } from "../token/tokenMiddleware.js";

const router = express.Router();

router.post(`/login`, validateLoginCredentials, UsersController.logIn);
router.get(`/`, checkIfAdmin, UsersController.getAllUsers);
router.get(`/:id`, checkIfUserOrAdmin, UsersController.getUser);
router.post(`/`, validateNewUserDetails, UsersController.addUser);
router.put(`/:id`, checkIfUserOrAdmin, validateNewUserDetails, UsersController.updateUser);
router.delete(`/:id`, checkIfUserOrAdmin, UsersController.deleteUser);

export default router;
