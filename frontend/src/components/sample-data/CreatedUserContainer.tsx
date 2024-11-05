import { IUser } from "@/interfaces/user";
import React from "react";
import { FiCopy } from "react-icons/fi";
import { toast } from "sonner";

interface CreatedUserContainerProps {
  user: IUser;
}

const CreatedUserContainer: React.FC<CreatedUserContainerProps> = ({
  user: { email, password },
}) => {
  const userCredentials = { email, password };
  const copyToClipBoard = (copiedText: string) => {
    navigator.clipboard.writeText(copiedText);

    toast.info(`Copied to clipboard!`);
  };

  return (
    <div className="flex flex-col">
      {Object.keys(userCredentials).map((key, i) => (
        <>
          <h6 className=" w-full  text-left text-xs   font-semibold">
            {i == 0 ? `Email:` : `Password:`}
          </h6>
          <div
            key={key}
            className="bg-background shadow-inner flex justify-between items-center p-2 gap-3 "
          >
            <p>{userCredentials[key]}</p>
            <FiCopy
              className="cursor-pointer hover:scale-110 hover:bg-accent transition-all"
              onClick={() => copyToClipBoard(userCredentials[key])}
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default CreatedUserContainer;
