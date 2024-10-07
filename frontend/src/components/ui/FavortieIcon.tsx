import React, { useState } from "react";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import { useSelector } from "react-redux";

interface FavortieIconProps {
  favorites: string[];
}

const FavortieIcon: React.FC<FavortieIconProps> = ({ favorites }) => {
  const userId = useSelector((store: any) => store.user._id);
  const [isFavorited, setIsFavorited] = useState(favorites.includes(userId));
  return (
    <div
      className="p-2 cursor-pointer hover:bg-yellow-100 rounded-full"
      onClick={() => setIsFavorited((prevState) => !prevState)}
    >
      {isFavorited ? (
        <MdOutlineStarPurple500 size={25} className="text-yellow-400" />
      ) : (
        <MdOutlineStarOutline size={25} className="text-yellow-400" />
      )}
    </div>
  );
};

export default FavortieIcon;
