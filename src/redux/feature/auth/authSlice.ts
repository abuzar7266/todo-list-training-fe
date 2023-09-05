import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  login: boolean;
  token: string;
  state: number;
  msg: string;
}
const initialState: IUser = {
  login: false,
  token: "",
  state: 0,
  msg: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {},
    signup: (state, action) => {},
    loginSuccess: (state, action) => {
      return {
        ...state,
        login: true,
        token: action.payload.token,
        state: 1,
      };
    },
    loginFailure: (state) => {
      alert("Incorrect username or password");
      return { ...state, state: 2 };
    },
    signupSuccess: (state) => {
      alert("Successfuly created an account");
      return { ...state, state: 3 };
    },
    signupFailure: (state) => {
      alert("Failed to create an account");
      return { ...state, state: 4 };
    },
    refresh: (state) => {
      return {
        ...state,
        state: 0,
        msg: "",
      };
    },
    logout: () => {
      localStorage.removeItem("token");
      return {
        login: false,
        token: "",
        state: 0,
        msg: "",
      };
    },
  },
});

export const {
  login,
  signup,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  refresh,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
