import { IBranch } from "@/interfaces/branch";

export const cleanUpBranch = (branch: IBranch) => {
  const cleanedBranch = { ...branch };
  console.log(cleanedBranch);

  // Remove the _id from the branch object if it exists
  if (cleanedBranch._id) {
    delete cleanedBranch._id;
  }

  // Remove the favorites key
  if (cleanedBranch.favorites) {
    delete cleanedBranch.favorites;
  }
  // Remove the _id from the address object if it exists
  if (cleanedBranch.address._id) {
    delete cleanedBranch.address._id;
  }

  // Trim and check the state value
  if (cleanedBranch.address.state?.trim().length === 0) {
    console.log(`stat`);

    delete cleanedBranch.address.state;
  }

  // Trim and check the zip value
  if (cleanedBranch.address.zip?.trim().length === 0) {
    delete cleanedBranch.address.zip;
  }

  return cleanedBranch;
};
