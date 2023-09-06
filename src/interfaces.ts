import mongoose from "mongoose";

export interface ITodoList {
  _id: mongoose.Schema.Types.ObjectId;
  description: string;
  isChecked: Boolean;
  creationTime: Date;
  completedTime: Date;
  user: mongoose.Schema.Types.ObjectId;
}
export interface ITodoListResponse {
  todo?: ITodoList[];
  status?: boolean;
}
export interface IAuthResponse {
  status?: string;
  success?: boolean;
  token?: string;
}
export interface IAuthRequest {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface IUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  _id?: string;
}
