import { User } from "./UserModel.js";

export class UserServices {
  static async addUser(user) {}
  static async updateUser(userId, newUser) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, newUser, { new: true });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);

      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  static async getOneUser(userId) {
    try {
      const user = await User.findOneById(userId);

      return user;
    } catch (error) {
      throw error;
    }
  }

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
