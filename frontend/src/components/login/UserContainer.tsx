import React, { useState } from "react";
import { TbUserSquare } from "react-icons/tb";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";

interface UserContainerProps {
  email: string;
  handleClick: () => void;
  handleDelete: () => void;
}

const UserContainer: React.FC<UserContainerProps> = ({ email, handleClick, handleDelete }) => {
  const [deleteMode, setDeleteMode] = useState(false);

  return (
    <div
      className="w-full  flex items-center justify-start gap-1 md:gap-6 bg-background p-4 rounded shadow cursor-pointer hover:opacity-75 font-bold flex-wrap relative"
      onClick={handleClick}
    >
      <TbUserSquare size={23} />
      <p className="text-sm">{email}</p>
      <div
        className="absolute right-2 h-full flex items-center text-primary"
        onClick={(e) => {
          e.stopPropagation();
          deleteMode ? handleDelete() : setDeleteMode(true);
        }}
      >
        {deleteMode ? <FaRegTrashAlt /> : <AiOutlineMinusCircle size={15} />}
      </div>
    </div>
  );
};

export default UserContainer;
