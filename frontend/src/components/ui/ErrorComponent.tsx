import React from "react";
import { FaCarCrash } from "react-icons/fa";

interface ErrorComponentProps {
  errorMessage: any;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage }) => {
  return (
    <div className="size-full flex flex-col items-center justify-center p-10 ">
      <FaCarCrash className="text-9xl md:text-[200px] text-primary animate-pulse" />
      <h1 className="text-xl md:text-2xl  font-bold">Unable to retreive your data</h1>
      <h2 className="text-md md:text-lg">{errorMessage}</h2>
    </div>
  );
};

export default ErrorComponent;
