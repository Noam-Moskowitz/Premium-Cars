import { deleteItem, sendData } from "@/API/api";
import { IUser } from "@/interfaces/user";
import React from "react";

const USER_ENDPOINT = "/users";

const useUserApi = () => {
  const logIn = (credentials: { email: string; password: string }) =>
    sendData(USER_ENDPOINT + `/login`, credentials);

  const addUser = (user: IUser) => sendData(USER_ENDPOINT, user);

  const addManyUsers = (usersArray: IUser[]) => sendData(USER_ENDPOINT + `/many`, usersArray);

  const deleteManyUsers = (deleteParams?: any) => deleteItem(USER_ENDPOINT + `/many`, deleteParams);

  return {
    logIn,
    addUser,
    addManyUsers,
    deleteManyUsers,
  };
};

export default useUserApi;
