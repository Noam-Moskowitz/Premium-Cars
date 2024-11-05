import { UserServices } from "./UserServices.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsersController {
  static async logIn(req, res) {
    const { email } = req.body;

    try {
      const user = await UserServices.logInUser(email);
      console.log(user);

      const token = jwt.sign(
        {
          _id: user._id,
          first: user.firstName,
          last: user.lastName,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: `1hr` }
      );

      res.send(token);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async addManyUsers(req, res) {
    const userArr = req.body;

    await Promise.all(
      userArr.map(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      })
    );

    try {
      const users = UserServices.addManyUsers(userArr);

      res.send(users);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async addUser(req, res) {
    const user = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    };

    try {
      const newUser = await UserServices.addUser(user);

      res.send(newUser);
    } catch (error) {
      console.log(error);

      res.status(500).send({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const newUserInfo = req.body;

    try {
      const updatedUser = await UserServices.updateUser(id, newUserInfo);

      if (!updatedUser)
        return res.status(404).send({ message: `Could not find user with ID ${id} to update!` });

      res.send(updatedUser);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const deletedUser = await UserServices.deleteUser(id);

      if (!deletedUser)
        return res.status(404).send({ message: `Could not find user with ID ${id} to delete!` });

      res.send(deletedUser);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async deleteManyUsers(req, res) {
    const { deleteParams } = req.params;

    try {
      const deletedUsers = await UserServices.deleteManyUsers(deleteParams);

      res.send(deletedUsers);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getUser(req, res) {
    const { id } = req.params;

    try {
      const user = await UserServices.getOneUser(id);

      if (!user) return res.status(404).send({ message: `Could not find user with ID ${id}` });

      res.send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserServices.getAllUsers();

      res.send(allUsers);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
