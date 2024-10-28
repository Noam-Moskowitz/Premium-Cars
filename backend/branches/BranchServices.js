import { Branch } from "./BranchModel.js";

export default class BranchServices {
  static async addManyBranches(branchArray) {
    const createdBranches = [];
    try {
      for (const branch of branchArray) {
        await Branch.create(branch);
        createdBranches.push(branch);
      }

      return createdBranches;
    } catch (error) {
      throw error;
    }
  }

  static async addBranch(branchInfo) {
    try {
      const branch = await Branch.create(branchInfo);

      return branch;
    } catch (error) {
      throw error;
    }
  }

  static async editBranch(id, branchInfo) {
    try {
      const updatedBranch = await Branch.findByIdAndUpdate(id, branchInfo, { new: true });

      return updatedBranch;
    } catch (error) {
      throw error;
    }
  }

  static async getAllBranches() {
    try {
      const allBranches = await Branch.find();

      return allBranches;
    } catch (error) {
      throw error;
    }
  }

  static async getAllBranchNames() {
    try {
      const allBranchNames = await Branch.find().select({ name: 1, favorites: 1 });

      return allBranchNames;
    } catch (error) {
      throw error;
    }
  }

  static async getOneBranch(id) {
    try {
      const branch = await Branch.findById(id);

      return branch;
    } catch (error) {
      throw error;
    }
  }

  static async deleteBranch(id) {
    try {
      const removedBranch = await Branch.findByIdAndDelete(id);

      return removedBranch;
    } catch (error) {
      throw error;
    }
  }

  static async favoriteBranch(branchId, userID) {
    try {
      const branch = await Branch.findById(branchId);
      if (!branch) return null;

      let branchToReturn = {};

      if (branch.favorites.includes(userID)) {
        branchToReturn = await Branch.findByIdAndUpdate(
          branchId,
          { $pull: { favorites: userID } },
          { new: true }
        );
      } else {
        branchToReturn = await Branch.findByIdAndUpdate(
          branchId,
          { $addToSet: { favorites: userID } },
          { new: true }
        );
      }

      return branchToReturn;
    } catch (error) {
      throw error;
    }
  }
}
