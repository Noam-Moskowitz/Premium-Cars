import { User, userValidation } from "./UserModel.js";
import bcrypt from "bcrypt";

export const validateLoginCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: `Email is required!` });
  if (!password) return res.status(400).send({ message: `Password is required!` });

  try {
    const user = await User.findOne({ email }, { email: 1, password: 1 });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: `Email or password are incorrect!` });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validateNewUserDetails = async (req, res, next) => {
  const { id } = req.params;
  const userInfo = req.body;

  if (!id) {
    const existingEmail = await User.findOne({ email: userInfo.email });

    if (existingEmail) return res.status(400).send({ message: `Email already in use!` });
  }

  const { error } = userValidation.validate(userInfo);

  if (error) return res.status(400).send({ message: error.message });

  next();
};
