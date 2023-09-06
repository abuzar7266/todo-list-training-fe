import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import todoReducer from "redux/feature/todo/todoSlice";
import authReducer from "redux/feature/auth/authSlice";
import Saga from "redux/saga";

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
