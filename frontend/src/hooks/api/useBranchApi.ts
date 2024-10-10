import { deleteItem, fetchData, patchItem, sendData, updateItem } from "@/API/api";
import { IBranch, IBranchNames } from "@/interfaces/branch";

const useBranchApi = () => {
  const BRANCH_ENDPOINT = `/branches`;

  const getAllBranches = () => fetchData<IBranch[]>(BRANCH_ENDPOINT);

  const getAllBranchNames = () => fetchData<IBranchNames[]>(`${BRANCH_ENDPOINT}/names`);

  const getOneBranch = (branchId: string) =>
    fetchData<IBranch>(`${BRANCH_ENDPOINT}/one/${branchId}`);

  const addBranch = (branchInfo: IBranch) => sendData(BRANCH_ENDPOINT, branchInfo);

  const updateBranch = (branchInfo: IBranch, branchId: string) =>
    updateItem<IBranch>(`${BRANCH_ENDPOINT}/${branchId}`, branchInfo);

  const deleteBranch = (branchId: string) => deleteItem<IBranch>(BRANCH_ENDPOINT, branchId);

  const favoriteBranch = (branchId: string, userId: string) =>
    patchItem<IBranch>(`${BRANCH_ENDPOINT}/${branchId}/user/${userId}`);

  return {
    favoriteBranch,
    getAllBranchNames,
    getAllBranches,
    getOneBranch,
    addBranch,
    updateBranch,
    deleteBranch,
  };
};

export default useBranchApi;