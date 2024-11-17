import { BranchColumns } from "@/components/tables/columns/BranchColumns";
import { DataTable } from "@/components/tables/DataTable";
import ErrorComponent from "@/components/ui/ErrorComponent";
import Loader from "@/components/ui/Loader";
import { BRANCH_NAMES_QUERY_KEY, BRANCH_QUERY_KEY, ONE_HOUR } from "@/consts/reactQuery";
import useBranchApi from "@/hooks/api/useBranchApi";
import useCheckToken from "@/hooks/useCheckToken";
import useReactQueryUtils from "@/hooks/useReactQueryUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BranchPage = () => {
  const { checkPermissions } = useCheckToken();
  const { getAllBranches, deleteBranch } = useBranchApi();
  const { errorFunc, successFunc } = useReactQueryUtils();
  const navigate = useNavigate();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [BRANCH_QUERY_KEY],
    queryFn: getAllBranches,
    staleTime: ONE_HOUR,
  });

  const removeCar = useMutation({
    mutationFn: (id: string) => deleteBranch(id),
    onSuccess: () =>
      successFunc(`Branch removed succesfully!`, [BRANCH_QUERY_KEY, BRANCH_NAMES_QUERY_KEY]),
    onError: errorFunc,
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  if (isLoading) return <Loader size="large" variant="screen" />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  return (
    <div className="w-full h-[100vh] p-10">
      <DataTable
        columns={BranchColumns}
        data={data || []}
        actionButtonTitle="Add Branch"
        handleViewData={({ _id }) => navigate(`/branches/update/${_id}`)}
        handleActionButton={() => navigate(`/branches/new`)}
        handleDeleteData={({ _id }) => removeCar.mutate(_id || ``)}
      />
    </div>
  );
};

export default BranchPage;
