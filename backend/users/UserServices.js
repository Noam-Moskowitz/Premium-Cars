import { User } from "./UserModel.js";

export class UserServices {
  static async addManyUsers(userArray) {
    try {
      const createdUsers = await User.insertMany(userArray);

      return createdUsers;
    } catch (error) {
      throw error;
    }
  }

  static async addUser(user) {
    try {
      const newUser = await User.create(user);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(userId, newUser) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, newUser, { new: true }).select([
        `-password`,
        `-isAdmin`,
      ]);

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId).select([`-password`, `-isAdmin`]);

      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteManyUsers(params = {}) {
    try {
      const removedUsers = await User.deleteMany(params);

      return removedUsers;
    } catch (error) {
      throw error;
    }
  }

  static async getOneUser(userId) {
    try {
      const user = await User.findById(userId).select([`-password`, `-isAdmin`]);

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const users = await User.find({}, { password: 0, isAdmin: 0 });

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
