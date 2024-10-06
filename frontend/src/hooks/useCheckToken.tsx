import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { saveUser, removeUser } from "@/store/userSlice";

const useCheckToken = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkToken = (token: string | null) => {
    if (!token) return false;

    const { exp } = jwtDecode<{ exp: number }>(token);
    const tokenExpiry = exp * 1000;
    const timeNow = Date.now();

    if (timeNow > tokenExpiry) return false;

    return true;
  };

  const checkIfLoggedIn = () => {
    const token = localStorage.getItem(`authToken`);
    const isValid = checkToken(token);

    if (!isValid) return dispatch(removeUser(token));

    dispatch(saveUser(token));
  };

  const checkPermissions = () => {
    const token = localStorage.getItem(`authToken`);
    const isValid = checkToken(token);

    if (!isValid) navigate(`/user/login/alert`);
  };

  return { checkIfLoggedIn, checkPermissions };
};

export default useCheckToken;
