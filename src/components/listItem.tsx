import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SquareOutlined } from "@mui/icons-material";
import { CheckBox } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { IListItemProps, IUpdateInput } from "../interfaces";
import "assets/css/listItem.css";


const listItemSchema = yup
  .object({
    description: yup.string().min(5).max(30).required(),
  })
  .required();
const ListItem: React.FC<IListItemProps> = ({ task, state, handleEditable, updateTask, deleteTask, taskMarkDone}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(listItemSchema),
  });
  useEffect(() => {
    handleEditable("", 0);
  }, [task]);

  const onSubmitHandler = (e: IUpdateInput) => {
    updateTask({
        id: task.id,
        description: e["description"],
      })
    handleEditable("", !state.isEditable);
    reset();
  };

  return (
    <tr style={{ border: "1px solid black" }}>
      <td className="item-spacing">
        <div id={task.id} style={{ display: "flex" }}>
          {!task.isChecked ? (
            <SquareOutlined
              className="icon-format"
              onClick={() => {
                taskMarkDone({ id: task.id, isChecked: !task.isChecked })
              }}
            />
          ) : (
            <CheckBox
              className="icon-format"
              onClick={() => {
                taskMarkDone({ id: task.id, isChecked: !task.isChecked })
              }}
            />
          )}
          {state.isEditable && task.id === state.id ? (
            <form onSubmitCapture={handleSubmit(onSubmitHandler)} id={task.id}>
              <input type="text" {...register("description")} />
              { isDirty && <p style={{color: 'red'}}>{errors.description?.message}</p> }
            </form>
          ) : (
            <span className={task.isChecked ? "checked-task-text" : "task-text"}>
              {task.description}
            </span>
          )}
        </div>
      </td>
      <td>
        <Edit
          className="icon-format"
          onClick={(e) => {
            setValue("description", task.description);
            if (state.isEditable && task.id !== state.id)
              handleEditable(task.id, state.isEditable);
            else if (state.isEditable && task.id === state.id) {
              handleEditable("-", !state.isEditable);
            } else {
              handleEditable(task.id, !state.isEditable);
            }
          }}
        />
      </td>
      <td>
        <Delete
          className="icon-format"
          onClick={() => {
            deleteTask(task.id);
            reset();
          }}
        />
      </td>
    </tr>
  );
};
export default ListItem;
