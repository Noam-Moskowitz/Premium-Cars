import { UserServices } from "./UserServices.js";

export class UsersController {
  static async logIn(req, res) {
    const { email } = req.body;

    try {
      const user = await UserServices.logInUser(email);

      const token = jwt.sign(
        {
          _id: user._id,
          first: user.name.first,
          last: user.name.last,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: `1hr` }
      );

      res.send(token);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }
  static async addUser(req, res) {}
  static async updateUser(req, res) {}
  static async deleteUser(req, res) {}
  static async getUser(req, res) {}
  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserServices.getAllUsers();

      res.status(200).send(allUsers);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }
}
