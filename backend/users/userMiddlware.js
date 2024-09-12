import { User } from "./UserModel.js";
import bcrypt from "bcrypt";

export const validateLoginCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(`1`);
  if (!email) return res.status(400).send({ message: `Email is required!` });
  if (!password) return res.status(400).send({ message: `Password is required!` });
  console.log(`2`);

  try {
    const user = await User.find({ email }, { email: 1, password: 1 });
    console.log(`3`);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: `Email or password are incorrect!` });
    }

    next();
  } catch (error) {
    console.log(`err`, error);

    res.status(500).send({ message: error });
  }
};
