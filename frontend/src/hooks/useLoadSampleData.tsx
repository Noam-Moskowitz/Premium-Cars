import React, { useState } from "react";
import useCarsApi from "./api/useCarsApi";
import useBranchApi from "./api/useBranchApi";
import useUserApi from "./api/useUserApi";

import { carsArray } from "@/consts/sample data/cars";
import { branchArray } from "@/consts/sample data/branches";
import { usersArray } from "@/consts/sample data/users";

const useLoadSampleData = () => {
  const { addManyCars, deleteManyCars } = useCarsApi();
  const { addManyBranches, deleteManyBranches } = useBranchApi();
  const { addManyUsers, deleteManyUsers } = useUserApi();

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
      deleteFunc: deleteManyUsers,
      setSuccessFlag: setUsersCreatedSuccessfully,
      data: usersArray,
    },
    {
      setLoader: setCarsLoading,
      postFunction: addManyCars,
      deleteFunc: deleteManyCars,
      setSuccessFlag: setCarsCreatedSuccessfully,
      data: carsArray,
    },
    {
      setLoader: setBranchesLoading,
      postFunction: addManyBranches,
      deleteFunc: deleteManyBranches,
      setSuccessFlag: setBranchesCreatedSuccessfully,
      data: branchArray,
    },
  ];

  const loadSampleData = async () => {
    for (const handler of sampleDataHandlers) {
      const { data, postFunction, deleteFunc, setLoader, setSuccessFlag } = handler;

      try {
        setLoader(true);
        await deleteFunc();
        await postFunction(data);
        setSuccessFlag(true);
      } catch (error) {
        return setError(error);
      } finally {
        setLoader(false);
      }
    }
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
