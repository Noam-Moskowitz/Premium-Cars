import React from "react";
import { MdOutlineCarCrash } from "react-icons/md";

interface NoResultsContainerProps {
  title: string;
}

const NoResultsContainer: React.FC<NoResultsContainerProps> = ({ title }) => {
  return (
    <div className="size-full flex flex-col items-center justify-center p-10">
      <MdOutlineCarCrash className="text-8xl text-primary animate-pulse" />
      <h2 className="text-lg">{title}</h2>
    </div>
  );
};

export default NoResultsContainer;
