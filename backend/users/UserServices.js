import { User } from "./UserModel.js";

export class UserServices {
  static async addUser(user) {}
  static async updateUser(newUser) {}
  static async deleteUser(userId) {}
  static async getOneUser(userId) {}
  static async getAllUsers() {
    try {
      const users = await User.find();

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async logInUser(email) {
    try {
      const user = await User.findOne({ email });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
