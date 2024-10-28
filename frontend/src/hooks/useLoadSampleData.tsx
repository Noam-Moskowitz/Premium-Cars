import React, { useState } from "react";
import useCarsApi from "./api/useCarsApi";
import useBranchApi from "./api/useBranchApi";
import useUserApi from "./api/useUserApi";

import { carsArray } from "@/consts/sample data/cars";
import { branchArray } from "@/consts/sample data/branches";
import { usersArray } from "@/consts/sample data/users";

const useLoadSampleData = () => {
  const { addManyCars } = useCarsApi();
  const { addManyBranches } = useBranchApi();
  const { addManyUsers } = useUserApi();

  const [usersLoading, setUsersLoading] = useState(false);
  const [carsLoading, setCarsLoading] = useState(false);
  const [branchesLoading, setBranchesLoading] = useState(false);

  const [usersCreatedSuccessfully, setUsersCreatedSuccessfully] = useState(false);
  const [carsCreatedSuccessfully, setCarsCreatedSuccessfully] = useState(false);
  const [branchesCreatedSuccessfully, setBranchesCreatedSuccessfully] = useState(false);

  const [error, setError] = useState<any | null>(null);

  const sampleDataHandlers = [
    {
      setLoader: setUsersLoading,
      postFunction: addManyUsers,
      setSuccessFlag: setUsersCreatedSuccessfully,
      data: usersArray,
    },
    {
      setLoader: setCarsLoading,
      postFunction: addManyCars,
      setSuccessFlag: setCarsCreatedSuccessfully,
      data: carsArray,
    },
    {
      setLoader: setBranchesLoading,
      postFunction: addManyBranches,
      setSuccessFlag: setBranchesCreatedSuccessfully,
      data: branchArray,
    },
  ];

  const loadSampleData = async () => {
    console.log(`a`);

    sampleDataHandlers.forEach(async ({ data, postFunction, setLoader, setSuccessFlag }) => {
      try {
        setLoader(true);
        await postFunction(data);
        setSuccessFlag(true);
      } catch (error) {
        return setError(error);
      } finally {
        setLoader(false);
      }
    });
  };

  return {
    loadSampleData,
    usersCreatedSuccessfully,
    usersLoading,
    carsCreatedSuccessfully,
    carsLoading,
    branchesCreatedSuccessfully,
    branchesLoading,
    error,
  };
};

export default useLoadSampleData;
