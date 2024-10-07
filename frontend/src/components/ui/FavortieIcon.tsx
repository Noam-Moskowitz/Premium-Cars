import useBranchApi from "@/hooks/api/useBranchApi";
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
  const [isFavorited, setIsFavorited] = useState(favorites.includes(userId));

  const handleClick = () => {
    if (!branchId || !userId) return;

    favoriteBranch(branchId, userId)
      .then((res) => {
        toast.info(`Succecfully added branch to favroites`);
        setIsFavorited((prevState) => !prevState);
      })
      .catch((err) =>
        toast.error(`Oops, something went wrong!`, { description: err.response.data.message })
      );
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
