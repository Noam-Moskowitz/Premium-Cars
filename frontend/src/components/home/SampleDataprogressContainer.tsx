import useLoadSampleData from "@/hooks/useLoadSampleData";
import React, { useEffect } from "react";
import ErrorComponent from "../ui/ErrorComponent";
import { Progress } from "../ui/progress";
import { Checkbox } from "../ui/checkbox";

const SampleDataprogressContainer = () => {
  const {
    branchesCreatedSuccessfully,
    branchesLoading,
    carsCreatedSuccessfully,
    carsLoading,
    error,
    loadSampleData,
    usersCreatedSuccessfully,
    usersLoading,
  } = useLoadSampleData();

  if (error) return <ErrorComponent errorMessage={error} />;

  useEffect(() => {
    loadSampleData();
  }, []);

  return (
    <div className="size-full flex flex-col items-center gap-5">
      <div>
        <div className="flex items-center gap-3">
          <Checkbox checked={usersCreatedSuccessfully} />
          <p>Users Created</p>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox checked={carsCreatedSuccessfully} />
          <p>Cars Created</p>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox checked={branchesCreatedSuccessfully} />
          <p>Branches Created</p>
        </div>
      </div>
      <h1 className="text-4xl font-bold">
        {branchesLoading
          ? `Creating branches`
          : carsLoading
          ? `Creating cars`
          : usersLoading
          ? `Creating users`
          : `Loading..`}
      </h1>
      <Progress
        value={
          usersCreatedSuccessfully && carsCreatedSuccessfully && branchesCreatedSuccessfully
            ? 100
            : usersCreatedSuccessfully && carsCreatedSuccessfully
            ? 66
            : usersCreatedSuccessfully
            ? 33
            : 0
        }
        className="border-2 bg-background w-[60%]"
      />
    </div>
  );
};

export default SampleDataprogressContainer;
