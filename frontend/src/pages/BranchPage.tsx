import { BranchColumns } from "@/components/tables/columns/BranchColumns";
import { DataTable } from "@/components/tables/DataTable";
import Loader from "@/components/ui/Loader";
import { BRANCH_QUERY_KEY, ONE_HOUR } from "@/consts/reactQuery";
import useBranchApi from "@/hooks/api/useBranchApi";
import useCheckToken from "@/hooks/useCheckToken";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BranchPage = () => {
  const { checkPermissions } = useCheckToken();
  const { getAllBranches, deleteBranch } = useBranchApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [BRANCH_QUERY_KEY],
    queryFn: getAllBranches,
    staleTime: ONE_HOUR,
  });

  const removeCar = useMutation({
    mutationFn: (id: string) => deleteBranch(id),
    onSuccess: () => {
      toast.success(`Branch removed succesfully!`);
      queryClient.invalidateQueries({ queryKey: [BRANCH_QUERY_KEY] });
    },
    onError: (e: any) =>
      toast.error(`Oops, something went wrong!`, {
        description: e.response.data,
      }),
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  if (isLoading) return <Loader size="large" />;

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
