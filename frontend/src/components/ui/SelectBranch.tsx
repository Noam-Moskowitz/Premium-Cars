import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectSeparator,
} from "./select";
import { useQuery } from "@tanstack/react-query";
import useBranchApi from "@/hooks/api/useBranchApi";
import { BRANCH_NAMES_QUERY_KEY } from "@/consts/reactQuery";
import FavortieIcon from "./FavortieIcon";
import { IBranchNames } from "@/interfaces/branch";
import { useSelector } from "react-redux";

const SelectBranch = () => {
  const userId = useSelector((store: any) => store.user._id);
  const { getAllBranchNames } = useBranchApi();
  const { data, error, isError, isLoading } = useQuery({
    queryFn: getAllBranchNames,
    queryKey: [BRANCH_NAMES_QUERY_KEY],
  });

  const [favorites, setFavorites] = useState<IBranchNames[]>(
    data?.filter((branch) => branch.favorites.includes(userId)) || []
  );

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a branch" />
      </SelectTrigger>
      <SelectContent>
        {favorites.length > 0 && (
          <div>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Favorties</SelectLabel>
              {favorites.map(({ favorites, name, _id }) => (
                <div className="flex justify-between w-full items-center">
                  <SelectItem className="border-r-2" key={_id} value={name}>
                    {name}
                  </SelectItem>
                  <FavortieIcon favorites={favorites} />
                </div>
              ))}
            </SelectGroup>
            <SelectSeparator />
          </div>
        )}

        {data?.map(({ name, _id, favorites }) => (
          <div className="flex justify-between w-full items-center">
            <SelectItem className="border-r-2" key={_id} value={name}>
              {name}
            </SelectItem>
            <FavortieIcon favorites={favorites} />
          </div>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBranch;
