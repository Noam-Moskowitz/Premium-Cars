import React from "react";

const DataCreatedContainer = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-center">Data Loaded Successfully!</h1>
      <p>All data has been loaded and is now available in the database.</p>
      <p>The following users have been created for your convenience:</p>
      <p>
        Feel free to copy the user details or check the `const` folder &rarr; `sample data` &rarr;
        `users` for the credentials.
      </p>
    </div>
  );
};

export default DataCreatedContainer;
