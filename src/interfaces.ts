import {
  addTask,
  fetchTodo,
  updateTask,
  deleteTask,
  taskMarkDone,
} from "redux/feature/todo/todoSlice";

export interface ITaskItem {
  description: string;
  isChecked: number;
  id: string;
}

export interface IEditState {
  isEditable: number;
  id: string;
}

export interface IListProps {
  taskList: ITaskItem[];
  loading: boolean;
  idTodo: string;
}

export interface IUpdateInput {
  description: string;
}

export interface IListItemProps {
  task: ITaskItem;
  state: IEditState;
  updateTask: typeof updateTask;
  deleteTask: typeof deleteTask;
  taskMarkDone: typeof taskMarkDone;
  handleEditable: any;
}

export interface IUser {
  login: boolean;
  token: string;
  state: number;
  msg: string;
}

export interface ILoginInput {
  username: string;
  password: string;
}

export interface ILoginProps {
  user: IUser;
  setAuth: any;
  loginRequest?: any;
  logoutRequest?: any;
  refresh?: any;
}

export interface ISignupInput {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface ISignupProps {
  user: IUser;
  setAuth: any;
  signupRequest: any;
  refresh: any;
}

export interface ITaskInput {
  description: string;
}

export interface ICredential {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface IAuthAction {
  payload: ICredential;
  type: string;
}

export interface ITodoAction {
  type: string;
  payload: ITaskItem;
}

export interface IItem {
  description: string;
  isChecked: number;
  id: string;
}
export interface IInitialTodoState {
  taskList: IItem[];
  loading: boolean;
  id: string;
}

export interface ITodoProps {
  fetchTodo: any;
  addTask: typeof addTask;
}
