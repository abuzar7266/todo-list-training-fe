export enum API_REQUEST_METHODS {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum API_TODO_PATH {
  TODO_PATH = "/",
  AUTH_LOGIN_PATH = "/user/login",
  AUTH_SIGNUP_PATH = "/user/signup",
}

export enum USER_AUTH_STATE {
  LOGIN_SUCCESS = 1,
  LOGIN_FAILURE = 2,
  SIGNUP_SUCCESS = 3,
  SIGNUP_FAILURE = 4,
  NO_AUTH = 0,
}
