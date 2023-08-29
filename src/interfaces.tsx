export interface TaskItem {
  description: string;
  isChecked: number;
  id: string;
}
export interface EditState {
  isEditable: number;
  id: string;
}
export interface ListProps {
  taskList: TaskItem[];
}
export interface UpdateInput {
  description: string;
}
export interface ListItemProps {
  task: TaskItem;
  state: EditState;
  handleEditable: any;
}

export interface User {
  login: boolean;
  token: string;
  state: number;
  msg: string;
}
export interface LoginInput {
  username: string;
  password: string;
}
export interface LoginProps {
  user: User;
  setAuth: any;
}
export interface SignupInput {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface SignupProps {
  user: User;
  setAuth: any;
}
export interface TaskInput {
  task: string;
}

export interface Credential {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}
export interface AuthAction {
  payload: Credential;
  type: string;
}

export interface TodoAction {
  type: string;
  payload: TaskItem;
}

export interface Item {
  description: string;
  isChecked: number;
  id: string;
}
export interface InitialTodoState {
  taskList: Item[];
}
