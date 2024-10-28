import { sendData } from "@/API/api";
import { IUser } from "@/interfaces/user";
import React from "react";

const USER_ENDPOINT = "/users";

const useUserApi = () => {
  const logIn = (credentials: { email: string; password: string }) =>
    sendData(USER_ENDPOINT + `/login`, credentials);

  const addUser = (user: IUser) => sendData(USER_ENDPOINT, user);

  const addManyUsers = (usersArray: IUser[]) => sendData(USER_ENDPOINT + `/many`, usersArray);

  return {
    logIn,
    addUser,
    addManyUsers,
  };
};

export default useUserApi;
