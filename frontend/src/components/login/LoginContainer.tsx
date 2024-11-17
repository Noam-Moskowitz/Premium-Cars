import React, { useEffect, useState } from "react";
import LogInForm from "../forms/LogInForm";
import UserContainer from "./UserContainer";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { deleteUser, retrieveUsers } from "@/utils/localStorage";

const LoginContainer = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [openForm, setOpenForm] = useState(true);

  const getUsers = (): void => {
    const userList = retrieveUsers();

    if (!userList) return;

    setOpenForm(false);
    const parsedUsers: string[] = JSON.parse(userList);
    setUsers(parsedUsers);
  };

  const handleSelectedUser = (user: string) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleManualSignIn = () => {
    setSelectedUser(null);
    setOpenForm(true);
  };

  const handleDeleteUser = (index: number) => {
    const updatedUsers = deleteUser(index);
    if (!updatedUsers) {
      setOpenForm(true);
      setUsers([]);
    } else {
      setUsers(updatedUsers);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="bg-accent  p-10 rounded-md shadow-md w-full md:w-96 mt-5 animate__animated animate__fadeIn">
      <h1 className="text-primary text-center font-bold text-3xl uppercase">log in</h1>
      {!openForm && (
        <>
          <h3 className="pt-4 text-sm md:text-md">Select your account</h3>
          <div className="flex flex-col gap-2 items-center max-h-36  overflow-x-hidden scroll-bar">
            {users.length === 0 ? (
              <h2 className="p-4 bg-background w-full text-center rounded shadow">
                No saved users!
              </h2>
            ) : (
              users?.map((account, i) => (
                <UserContainer
                  key={i}
                  email={account}
                  handleClick={() => handleSelectedUser(account)}
                  handleDelete={() => handleDeleteUser(i)}
                />
              ))
            )}
          </div>
          <Button variant="link" className=" px-0 text-center w-full" onClick={handleManualSignIn}>
            Sign in with a different account
          </Button>
        </>
      )}
      {openForm && (
        <LogInForm selectedEmail={selectedUser} handleClick={() => setOpenForm(false)} />
      )}
      <div className="flex justify-between text-primary underline py-4">
        <p className="cursor-pointer text-center w-full" onClick={() => navigate(`/user/register`)}>
          Register
        </p>
      </div>
    </div>
  );
};

export default LoginContainer;
