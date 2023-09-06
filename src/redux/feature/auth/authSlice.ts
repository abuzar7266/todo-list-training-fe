import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@src/assets/typescript/interfaces";
import { USER_AUTH_STATE } from "assets/typescript/constants";

const initialState: IUser = {
  login: false,
  token: "",
  state: 0,
  msg: "",
};

var { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, NO_AUTH } =
  USER_AUTH_STATE;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: () => {},
    signup: () => {},
    loginSuccess: (state, action) => {
      return {
        ...state,
        login: true,
        token: action.payload.token,
        state: LOGIN_SUCCESS,
      };
    },
    loginFailure: (state) => {
      alert("Incorrect username or password");
      return {
        ...state,
        state: LOGIN_FAILURE,
        msg: "Incorrect username or password",
      };
    },
    signupSuccess: (state) => {
      alert("Successfuly created an account");
      return {
        ...state,
        state: SIGNUP_SUCCESS,
        msg: "Successfuly created an account",
      };
    },
    signupFailure: (state) => {
      alert("Failed to create an account");
      return {
        ...state,
        state: SIGNUP_FAILURE,
        msg: "Failed to create an account",
      };
    },
    refresh: (state) => {
      return {
        ...state,
        state: NO_AUTH,
        msg: "",
      };
    },
    logout: (state) => {
      localStorage.removeItem("token");
      return {
        ...state,
        login: false,
        token: "",
        state: NO_AUTH,
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
