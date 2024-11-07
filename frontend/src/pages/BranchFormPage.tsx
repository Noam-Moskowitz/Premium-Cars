import BranchForm from "@/components/forms/BranchForm";
import {
  BRANCH_NAMES_QUERY_KEY,
  BRANCH_QUERY_KEY,
  ONE_HOUR,
  SINGLE_BRANCH_KEY,
} from "@/consts/reactQuery";
import useBranchApi from "@/hooks/api/useBranchApi";
import { IBranch } from "@/interfaces/branch";
import { cleanUpBranch } from "@/utils/branch";
import useReactQueryUtils from "@/hooks/useReactQueryUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorComponent from "@/components/ui/ErrorComponent";
import Loader from "@/components/ui/Loader";

const BranchFormPage = () => {
  const { addBranch, updateBranch, getOneBranch } = useBranchApi();
  const { errorFunc, successFunc } = useReactQueryUtils();

  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: [`branch-${id}`],
    queryFn: () => getOneBranch(id || ``),
    staleTime: ONE_HOUR,
    enabled: !!id,
  });

  const createBranch = useMutation({
    mutationFn: addBranch,
    onSuccess: () =>
      successFunc(
        `Branch created succesfully!`,
        [BRANCH_NAMES_QUERY_KEY, BRANCH_QUERY_KEY, SINGLE_BRANCH_KEY + id],
        `/branches`
      ),
    onError: errorFunc,
  });

  const editBranch = useMutation({
    mutationFn: ({ id, branchDetails }: { id: string; branchDetails: IBranch }) =>
      updateBranch(branchDetails, id),
    onSuccess: () =>
      successFunc(
        `Branch updated succesfully!`,
        [BRANCH_NAMES_QUERY_KEY, BRANCH_QUERY_KEY, SINGLE_BRANCH_KEY + id],
        `/branches`
      ),
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
  if (isError) return <ErrorComponent errorMessage={error} />;

  return (
    <div className="size-full flex items-center justify-center p-10">
      <BranchForm existingData={data} handleSubmit={handleSubmit} />
    </div>
  );
};

export default BranchFormPage;
