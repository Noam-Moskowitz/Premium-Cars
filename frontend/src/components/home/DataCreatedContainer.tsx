import { usersArray } from "@/consts/sample data/users";
import React from "react";
import CreatedUserContainer from "./CreatedUserContainer";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const DataCreatedContainer = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center flex flex-col gap-3">
      <h1 className="font-bold text-2xl ">Data Loaded Successfully!</h1>
      <p>All data has been loaded and is now available in the database.</p>
      <p>The following users have been created for your convenience:</p>
      <p>
        Feel free to copy the user details or check the `const` folder &rarr; `sample data` &rarr;
        `users` for the credentials.
      </p>
      <div className="flex flex-wrap justify-around">
        {usersArray.map((user, i) => (
          <div key={i}>
            <h2 className="text-center font-bold">
              {i == 0 ? `Admin Account` : `Regular Account`}
            </h2>
            <CreatedUserContainer user={user} />
          </div>
        ))}
      </div>
      <Button className="w-fit m-auto" onClick={() => navigate(`/user/login`)}>
        Understood, I'd like to go to the login now.
      </Button>
    </div>
  );
};

export default DataCreatedContainer;
