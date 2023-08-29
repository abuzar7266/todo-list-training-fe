import { call, put } from "redux-saga/effects";
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
} from "redux/feature/auth/authSlice";
import { apiCallRequest } from "redux/api";
import { AuthAction } from "interfaces";

export function* LOGIN(action: AuthAction): Generator<any, void, any> {
  console.log(action);
  const response = yield call(() =>
    apiCallRequest("/user/login", "POST", action.payload)
  );
  console.log(response);
  if (response.token ?? 0) {
    yield put(loginSuccess({ token: response.token }));
  } else {
    yield put(loginFailure({}));
  }
}
export function* SIGNUP(action: AuthAction): Generator<any, void, any> {
  const response = yield call(() =>
    apiCallRequest("/user/signup", "POST", action.payload)
  );
  if (response.success ?? 0) {
    yield put(signupSuccess({}));
  } else {
    yield put(signupFailure({}));
  }
}

export default {
  LOGIN,
  SIGNUP,
};
