import { branchValidationSchema } from "./BranchModel.js";

export const validateBranch = (req, res, next) => {
  const branchInfo = req.body;

  const { error } = branchValidationSchema.validate(branchInfo);

  if (error) return res.status(400).send({ message: error.details[0] });

  next();
};
