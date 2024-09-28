import BranchServices from "./BranchServices.js";

export default class BranchController {
  static async addBranch(req, res) {
    const branchInfo = req.body;

    try {
      const branch = await BranchServices.addBranch(branchInfo);

      res.send(branch);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async editBranch(req, res) {
    const branchInfo = req.body;
    const { id } = req.params;

    try {
      const updatedBranch = await BranchServices.editBranch(id, branchInfo);

      if (!updatedBranch) return res.status(404).send({ message: `Branch not found!` });

      res.send(updatedBranch);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getAllBranches(req, res) {
    try {
      const branches = await BranchServices.getAllBranches();

      res.send(branches);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getAllBranchNames(req, res) {
    try {
      const branchNames = await BranchServices.getAllBranchNames();

      res.send(branchNames);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getOneBranch(req, res) {
    const { id } = req.params;

    try {
      const branch = await BranchServices.getOneBranch(id);

      if (!branch) res.status(404).send({ message: `Branch not found!` });

      res.send(branch);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async deleteBranch(req, res) {
    const { id } = req.params;

    try {
      const removedBranch = await BranchServices.deleteBranch(id);

      if (!removedBranch) res.status(404).send({ message: `Branch not found!` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}