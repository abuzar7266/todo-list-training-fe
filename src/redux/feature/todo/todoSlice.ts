import { createSlice } from "@reduxjs/toolkit";
import { IInitialTodoState, IItem } from "interfaces";

const initialState: IInitialTodoState = {
  taskList: [],
  loading: false,
  id: ''
};

function removeTodoById(taskList: IItem[], Tid: string) {
  return taskList.filter(({ id }) => id !== Tid);
}
function updateTodoById(taskList: IItem[], updatedTask: IItem) {
  var index = taskList.findIndex(({ id }) => id === updatedTask.id);
  taskList[index] = {...updatedTask};
  return taskList;
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchTodoSuccess: (state, action) => {
      return {
        ...state,
        taskList: [...action.payload],
        id: '',
        loading: false
      };
    },
    deleteTaskSuccess: (state, action )=>{
      var { id } = action.payload;
      return {
        ...state,
        taskList: [...removeTodoById([...state.taskList], id)],
        loading: false,
        id: ''
      };
    },
    updateTaskSuccess: (state, action )=>{
      var { description, id, isChecked } = action.payload;
      return {
        ...state,
        taskList:
        updateTodoById([...state.taskList], { description, id, isChecked }),
        loading: false,
        id: ''
      };
    },
    addTaskSuccess: (state, action )=>{
      var { description, id, isChecked } = action.payload;
      return {
        ...state,
        taskList: [
          ...state.taskList,
          { description: description, id: id, isChecked: isChecked },
        ],
        loading: false,
        id: ''
      };
    },
    updateFailure: (state) =>{
      alert('Failed to update item');
      return {...state, loading: false, id: ''}
    },
    addFailure: (state) =>{
      alert('Failed to add item');
      return {...state, loading: false, id: ''}
    },
    deleteFailure: (state) =>{
      alert('Failed to delete item');
      return {...state, loading: false, id: ''}
    },
    fetchTodo: (state) => {
      state.loading = true;
    },
    addTask: (state, action) => {
      state.loading = true;
    },
    updateTask: (state, action) => {
      state.loading = true;
      state.id = action.payload.id;
    },
    deleteTask: (state, action) => {
      state.loading = true;
      state.id = action.payload.id;
    },
    taskMarkDone: (state, action) => {
      state.loading = true;
      state.id = action.payload.id;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  taskMarkDone,
  fetchTodoSuccess,
  fetchTodo,
  deleteTaskSuccess,
  addTaskSuccess,
  updateTaskSuccess,
  addFailure,
  updateFailure,
  deleteFailure
} = todoSlice.actions;
export default todoSlice.reducer;
