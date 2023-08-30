import mongoose, { Error } from "mongoose";
import express, { Request, Response } from "express";
var TodoSchema = require("../models/todoSchema");
interface TodoList {
  _id: mongoose.Schema.Types.ObjectId;
  description: string;
  isChecked: Boolean;
  creationTime: Date;
  completedTime: Date;
  user: mongoose.Schema.Types.ObjectId;
}
interface TodoListResponse {
  todo?: TodoList[];
  status?: boolean;
}
var getAllTodos = async (req: any, res: Response<TodoListResponse>) => {
  try {
    const response = await TodoSchema.find({ user: req.user._id });
    res.statusCode = 200;
    res.json({
      todo: response,
    });
  } catch (err) {
    res.statusCode = 500;
    res.json({ todo: [], status: false });
  }
};
var addTodo = async (req: any, res: Response<TodoListResponse>) => {
  try {
    const response = await TodoSchema.create({
      description: req.body.description,
      user: req.user._id,
    });
    res.statusCode = 200;
    res.json({ status: true, todo: response });
  } catch (error) {
    res.statusCode = 500;
    res.json({ status: false });
  }
};

var updateTodo = async (req: any, res: Response<TodoListResponse>) => {
  try {
    const { id } = req.params;
    TodoSchema.findOneAndUpdate({ _id: id, user: req.user._id }, req.body)
      .then((response: TodoList[]) => {
        res.statusCode = 200;
        res.json({ status: true, todo: response });
      })
      .catch((err: Error) => {
        res.statusCode = 404;
        res.json({ status: false });
      });
  } catch (error) {
    res.statusCode = 500;
    res.json({ status: false });
  }
};
var deleteTodo = async (req: any, res: Response<TodoListResponse>) => {
  try {
    const { id } = req.params;
    TodoSchema.findOneAndDelete({ _id: id, user: req.user._id })
      .then((response: any) => {
        res.statusCode = 200;
        res.json({ status: true });
      })
      .catch((err: Error) => {
        res.statusCode = 404;
        res.json({ status: false });
      });
  } catch (error) {
    res.statusCode = 500;
    res.json({ status: false });
  }
};
module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};

// End of File
