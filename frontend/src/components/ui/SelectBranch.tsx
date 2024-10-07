import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { useQuery } from "@tanstack/react-query";
import useBranchApi from "@/hooks/api/useBranchApi";
import { BRANCH_NAMES_QUERY_KEY } from "@/consts/reactQuery";
import FavortieIcon from "./FavortieIcon";
import { IBranchNames } from "@/interfaces/branch";
import { useSelector } from "react-redux";
import { Skeleton } from "./skeleton";

interface SelectBranchProps {
  handleChange: () => void;
  value: string;
}

const SelectBranch: React.FC<SelectBranchProps> = ({ handleChange, value }) => {
  const userId = useSelector((store: any) => store.user._id);
  const { getAllBranchNames } = useBranchApi();
  const { data, error, isError, isLoading } = useQuery({
    queryFn: getAllBranchNames,
    queryKey: [BRANCH_NAMES_QUERY_KEY],
  });

  const [branches, setBranches] = useState<IBranchNames[]>([]);

  useEffect(() => {
    if (!data) return;
    const favorites = data?.filter((branch) => branch.favorites.includes(userId));
    const nonFavorites = data?.filter((branch) => !branch.favorites.includes(userId));
    setBranches([...favorites, ...nonFavorites]);
  }, [data]);

  if (isLoading) return <Skeleton />;

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder={value || "Select a branch"} />
      </SelectTrigger>
      <SelectContent>
        {branches?.map(({ name, _id, favorites }) => (
          <div className="flex justify-between w-full items-center">
            <SelectItem className="border-r-2" key={_id} value={name}>
              {name}
            </SelectItem>
            <FavortieIcon favorites={favorites} branchId={_id} />
          </div>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBranch;
