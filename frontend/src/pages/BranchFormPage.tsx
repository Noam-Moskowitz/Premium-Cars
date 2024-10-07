import BranchForm from "@/components/forms/BranchForm";
import { BRANCH_NAMES_QUERY_KEY, BRANCH_QUERY_KEY, ONE_HOUR } from "@/consts/reactQuery";
import useBranchApi from "@/hooks/api/useBranchApi";
import { IBranch } from "@/interfaces/branch";
import { cleanUpBranch } from "@/utils/branch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const BranchFormPage = () => {
  const { addBranch, updateBranch, getOneBranch } = useBranchApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: [`branch-${id}`],
    queryFn: () => getOneBranch(id || ``),
    staleTime: ONE_HOUR,
    enabled: !!id,
  });

  const successFunc = () => {
    toast.success(`Branch saved succesfully!`);
    queryClient.invalidateQueries({ queryKey: [BRANCH_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [BRANCH_NAMES_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [[`branch-${id}`]] });
    navigate(`/branches`);
  };

  const errorFunc = (err: any) => {
    toast.error(`Oops, something went wrong!`, {
      description: err.response.data.message.message || err.response.data.message,
    });
  };

  const createBranch = useMutation({
    mutationFn: addBranch,
    onSuccess: successFunc,
    onError: errorFunc,
  });

  const editBranch = useMutation({
    mutationFn: ({ id, branchDetails }: { id: string; branchDetails: IBranch }) =>
      updateBranch(branchDetails, id),
    onSuccess: successFunc,
    onError: errorFunc,
  });

  const handleSubmit = (branch: IBranch) => {
    const branchDetails = cleanUpBranch(branch);
    if (id) {
      editBranch.mutate({ id, branchDetails });
    } else {
      createBranch.mutate(branchDetails);
    }
  };

  if (isLoading && id) return <Loader size="large" />;

  return (
    <div className="size-full flex items-center justify-center p-10">
      <BranchForm existingData={data} handleSubmit={handleSubmit} />
    </div>
  );
};

export default BranchFormPage;
