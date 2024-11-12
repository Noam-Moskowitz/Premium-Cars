import { deleteItem, fetchData, sendData, updateItem } from "@/API/api";
import { IUser } from "@/interfaces/user";
import React from "react";

const USER_ENDPOINT = "/users";

const useUserApi = () => {
  const getOneUser = (userId: string) => fetchData<IUser>(`${USER_ENDPOINT}/${userId}`);

  const logIn = (credentials: { email: string; password: string }) =>
    sendData(USER_ENDPOINT + `/login`, credentials);

  const addUser = (user: IUser) => sendData(USER_ENDPOINT, user);

  const updateUser = (user: IUser, id: string) => updateItem(USER_ENDPOINT + `/${id}`, user);

  const addManyUsers = (usersArray: IUser[]) => sendData(USER_ENDPOINT + `/many`, usersArray);

  const deleteManyUsers = (deleteParams?: any) => deleteItem(USER_ENDPOINT + `/many`, deleteParams);

  return {
    getOneUser,
    logIn,
    addUser,
    addManyUsers,
    deleteManyUsers,
    updateUser,
  };
};

export default useUserApi;
