import { call, put } from "redux-saga/effects";
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
} from "redux/feature/auth/authSlice";
import { apiCallRequest } from "redux/api";
import { IAuthAction } from "assets/typescript/interfaces";
import {
  API_REQUEST_METHODS,
  API_TODO_PATH,
} from "assets/typescript/constants";

var { AUTH_LOGIN_PATH, AUTH_SIGNUP_PATH } = API_TODO_PATH;
var { POST } = API_REQUEST_METHODS;

export function* LOGIN(action: IAuthAction): Generator<any, void, any> {
  const response = yield call(() =>
    apiCallRequest(AUTH_LOGIN_PATH, POST, action.payload)
  );
  if (response.token ?? 0) {
    yield put(loginSuccess({ token: response.token }));
  } else {
    yield put(loginFailure());
  }
}

export function* SIGNUP(action: IAuthAction): Generator<any, void, any> {
  const response = yield call(() =>
    apiCallRequest(AUTH_SIGNUP_PATH, POST, action.payload)
  );
  if (response.success ?? 0) {
    yield put(signupSuccess());
  } else {
    yield put(signupFailure());
  }
}
