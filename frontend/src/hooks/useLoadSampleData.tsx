import React, { useState } from "react";
import useCarsApi from "./api/useCarsApi";
import useBranchApi from "./api/useBranchApi";
import useUserApi from "./api/useUserApi";

import { carsArray } from "@/consts/sample data/cars";
import { branchArray } from "@/consts/sample data/branches";
import { usersArray } from "@/consts/sample data/users";
import { useDispatch } from "react-redux";
import { removeUser } from "@/store/userSlice";
import { useQueryClient } from "@tanstack/react-query";
import { BRANCH_QUERY_KEY, CAR_QUERY_KEY } from "@/consts/reactQuery";

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

  const dataCreatedSuccesfully =
    usersCreatedSuccessfully && carsCreatedSuccessfully && branchesCreatedSuccessfully;

  const [error, setError] = useState<any | null>(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

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
    dispatch(removeUser(`logOut`));

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

    queryClient.invalidateQueries({ queryKey: [CAR_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [BRANCH_QUERY_KEY] });
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
    dataCreatedSuccesfully,
  };
};

export default useLoadSampleData;
