import LogInForm from "@/components/forms/LogInForm";
import React from "react";

interface LogInPageProps {
  title?: boolean;
}

const LogInPage: React.FC<LogInPageProps> = ({ title }) => {
  return (
    <div className="size-full flex flex-col items-center justify-center p-10">
      {title && <h1 className="text-3xl font-bold">This action requires you to be logged in</h1>}
      <LogInForm />
    </div>
  );
};

export default LogInPage;
