import mongoose, { Error, Mongoose } from "mongoose";
import { Response } from "express";
require("module-alias/register");
var TodoSchema = require("@models/todoSchema");

interface ITodoList {
  _id: mongoose.Schema.Types.ObjectId;
  description: string;
  isChecked: Boolean;
  creationTime: Date;
  completedTime: Date;
  user: mongoose.Schema.Types.ObjectId;
}
interface ITodoListResponse {
  todo?: ITodoList[];
  status?: boolean;
}

var getAllTodos = async (req: any, res: Response<ITodoListResponse>) => {
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

var addTodo = async (req: any, res: Response<ITodoListResponse>) => {
  try {
    const list = await TodoSchema.find({ user: req.user._id });
    list.forEach((item: ITodoList) => {
      if (item.description === req.body.description) {
        throw new Error("Duplicates detected...");
      }
    });
    const response = await TodoSchema.create({
      description: req.body.description,
      user: req.user._id,
    });
    res.statusCode = 200;
    res.json({ status: true, todo: response });
  } catch (error) {
    res.statusCode = 200;
    res.json({ status: false });
  }
};

var updateTodo = async (req: any, res: Response<ITodoListResponse>) => {
  try {
    const { id } = req.params;
    TodoSchema.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, {
      new: true,
    })
      .then((response: ITodoList[]) => {
        res.statusCode = 200;
        res.json({ status: true, todo: response });
      })
      .catch(() => {
        res.statusCode = 404;
        res.json({ status: false });
      });
  } catch (error) {
    res.statusCode = 200;
    res.json({ status: false });
  }
};

var deleteTodo = async (req: any, res: Response<ITodoListResponse>) => {
  try {
    const { id } = req.params;
    TodoSchema.findOneAndDelete({ _id: id, user: req.user._id })
      .then(() => {
        res.statusCode = 200;
        res.json({ status: true });
      })
      .catch(() => {
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
