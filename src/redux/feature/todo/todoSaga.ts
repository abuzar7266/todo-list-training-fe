import { call, put } from "redux-saga/effects";
import {
  fetchTodoSuccess,
  addTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  addFailure,
  updateFailure,
  deleteFailure,
} from "redux/feature/todo/todoSlice";
import { apiCallRequest } from "redux/api";
import { ITodoAction } from "@src/assets/typescript/interfaces";
import { API_REQUEST_METHODS } from "assets/typescript/constants";

var { GET, PUT, DELETE, POST } = API_REQUEST_METHODS;

export function* FETCH_TODO(): Generator<any, void, any> {
  const todo = yield call(() => apiCallRequest("/", GET));
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

export function* POST_ADD_TODO(action: ITodoAction): Generator<any, void, any> {
  var data = yield call(() =>
    apiCallRequest("/", POST, { description: action.payload })
  );
  if (data.status === true) {
    var { description, _id, isChecked } = data.todo;
    yield put(
      addTaskSuccess({
        description,
        id: _id,
        isChecked,
      })
    );
  } else {
    yield put(addFailure());
  }
}

export function* UPDATE_TODO(action: ITodoAction): Generator<any, void, any> {
  var data = yield call(() =>
    apiCallRequest(`/${action.payload.id}`, PUT, {
      description: action.payload.description,
    })
  );
  if (data.status === true) {
    var { description, _id, isChecked } = data.todo;
    yield put(
      updateTaskSuccess({
        description,
        id: _id,
        isChecked,
      })
    );
  } else {
    yield put(updateFailure());
  }
}
export function* MARK_DONE_TODO(
  action: ITodoAction
): Generator<any, void, any> {
  var data = yield call(() =>
    apiCallRequest(`/${action.payload.id}`, PUT, {
      isChecked: action.payload.isChecked,
    })
  );
  if (data.status) {
    var { description, _id, isChecked } = data.todo;
    yield put(
      updateTaskSuccess({
        description,
        id: _id,
        isChecked,
      })
    );
  } else {
    yield put(updateFailure());
  }
}

export function* DELETE_TODO(action: ITodoAction): Generator<any, void, any> {
  var data = yield call(() => apiCallRequest(`/${action.payload}`, DELETE));
  if (data.status) {
    yield put(deleteTaskSuccess({ id: action.payload }));
  } else {
    yield put(deleteFailure());
  }
}
