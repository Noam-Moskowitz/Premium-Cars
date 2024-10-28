import express from "express";
import BranchController from "../branches/BranchController.js";
import { validateBranch } from "../branches/branchMiddleware.js";

const router = express.Router();

router.get(`/`, BranchController.getAllBranches);

router.get(`/names`, BranchController.getAllBranchNames);

router.get(`/one/:id`, BranchController.getOneBranch);

router.post(`/`, validateBranch, BranchController.addBranch);

router.post(`/many`, BranchController.addManyBranches);

router.put(`/:id`, validateBranch, BranchController.editBranch);

router.delete(`/:id`, BranchController.deleteBranch);

router.patch(`/:id/user/:userId`, BranchController.favoriteBranch);

export default router;
