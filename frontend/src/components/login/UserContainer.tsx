import React from "react";
import { TbUserSquare } from "react-icons/tb";

interface UserContainerProps {
  email: string;
  handleClick: () => void;
}

const UserContainer: React.FC<UserContainerProps> = ({ email, handleClick }) => {
  return (
    <div
      className="w-full  flex items-center justify-start gap-6 bg-background p-4 rounded shadow cursor-pointer hover:opacity-75 font-bold flex-wrap"
      onClick={handleClick}
    >
      <TbUserSquare size={23} />
      <p>{email}</p>
    </div>
  );
};

export default UserContainer;
