import { call, put } from "redux-saga/effects";
import { fetchTodoSuccess } from "./todoSlice";
import { apiCallRequest } from "redux/api";
import { TodoAction } from "interfaces";
export function* FETCH_TODO(): Generator<any, void, any> {
  const todo = yield call(() => apiCallRequest("/", "GET"));
  yield put(
    fetchTodoSuccess(
      todo.todo.map((data: any, idx: number) => {
        return {
          ...data,
          id: data._id,
        };
      })
    )
  );
}
export function* POST_ADD_TODO(action: TodoAction): Generator<any, void, any> {
  yield call(() =>
    apiCallRequest("/", "POST", { description: action.payload })
  );
  yield call(FETCH_TODO);
}
export function* UPDATE_TODO(action: TodoAction): Generator<any, void, any> {
  yield call(() =>
    apiCallRequest(`/${action.payload.id}`, "PUT", {
      description: action.payload.description,
    })
  );
  yield call(FETCH_TODO);
}
export function* MARK_DONE_TODO(action: TodoAction) {
  yield call(() =>
    apiCallRequest(`/${action.payload.id}`, "PUT", {
      isChecked: action.payload.isChecked,
    })
  );
  yield call(FETCH_TODO);
}
export function* DELETE_TODO(action: TodoAction): Generator<any, void, any> {
  yield call(() => apiCallRequest(`/${action.payload}`, "DELETE"));
  yield call(FETCH_TODO);
}
