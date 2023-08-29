import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import todoReducer from "./feature/todo/todoSlice";
import Saga from "./saga";
import authReducer from "./feature/auth/authSlice";

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: authReducer,
  },
  middleware: [saga],
});
saga.run(Saga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
