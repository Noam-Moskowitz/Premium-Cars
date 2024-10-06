import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  _id: null,
  first: null,
  last: null,
  isAdmin: false,
  iat: null,
  exp: null,
};

const userSlice = createSlice({
  name: `user`,
  initialState: initialState,
  reducers: {
    saveUser: (state, action): any => {
      const authToken = action.payload;

      localStorage.setItem(`authToken`, authToken);

      return jwtDecode(authToken);
    },
    removeUser: (state, action) => {
      localStorage.removeItem(`authToken`);

      return initialState;
    },
  },
});

export const { saveUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
