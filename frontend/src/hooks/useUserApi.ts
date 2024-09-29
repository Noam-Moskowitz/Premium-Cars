import { sendData } from "@/API/api";
import { IUser } from "@/interfaces/user";
import React from "react";

const USER_ENDPOINT = "/users";

const useUserApi = () => {
  const logIn = (credentials: { email: string; password: string }) =>
    sendData(USER_ENDPOINT + `/login`, credentials);

  const addUser = (user: IUser) => sendData(USER_ENDPOINT, user);

  return {
    logIn,
    addUser,
  };
};

export default useUserApi;
