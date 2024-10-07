import { BRANCH_NAMES_QUERY_KEY } from "@/consts/reactQuery";
import useBranchApi from "@/hooks/api/useBranchApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface FavortieIconProps {
  favorites: string[];
  branchId?: string;
}

const FavortieIcon: React.FC<FavortieIconProps> = ({ favorites, branchId }) => {
  const userId = useSelector((store: any) => store.user._id);
  const { favoriteBranch } = useBranchApi();
  const queryClient = useQueryClient();
  const [isFavorited, setIsFavorited] = useState(favorites.includes(userId));

  const favoriteABranch = useMutation({
    mutationFn: ({ branchId, userId }: { branchId: string; userId: string }) =>
      favoriteBranch(branchId, userId),
    onSuccess: () => {
      toast.info(`Updated favorites!`);
      queryClient.invalidateQueries({ queryKey: [BRANCH_NAMES_QUERY_KEY] });
      setIsFavorited((prevState) => !prevState);
    },
    onError: (err: any) =>
      toast.error(`Oops, something went wrong!`, { description: err.response.data.message }),
  });

  const handleClick = () => {
    if (!branchId || !userId) return;
    favoriteABranch.mutate({ branchId, userId });
  };

  return (
    <div className="p-2 cursor-pointer hover:bg-yellow-100 rounded-full" onClick={handleClick}>
      {isFavorited ? (
        <MdOutlineStarPurple500 size={25} className="text-yellow-400" />
      ) : (
        <MdOutlineStarOutline size={25} className="text-yellow-400" />
      )}
    </div>
  );
};

export default FavortieIcon;
