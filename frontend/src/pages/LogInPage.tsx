import LoginContainer from "@/components/login/LoginContainer";
import React from "react";

interface LogInPageProps {
  title?: boolean;
}

const LogInPage: React.FC<LogInPageProps> = ({ title }) => {
  return (
    <div className="size-full flex flex-col items-center justify-center p-5 py-5 md:p-10">
      {title && <h1 className="md:text-3xl font-bold">This action requires you to be logged in</h1>}
      <LoginContainer />
    </div>
  );
};

export default LogInPage;
