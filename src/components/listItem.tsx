import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SquareOutlined, CheckBox, Edit, Delete } from "@mui/icons-material";
import { IListItemProps, IUpdateInput } from "assets/typescript/interfaces";
import { listItemSchema } from "formSchema";
import "assets/css/listItem.css";

const ListItem: React.FC<IListItemProps> = ({
  task,
  state,
  handleEditable,
  updateTask,
  deleteTask,
  taskMarkDone,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(listItemSchema),
  });

  useEffect(() => {
    handleEditable("", false);
  }, [task]);

  const onSubmitHandler = (e: IUpdateInput) => {
    updateTask({
      id: task.id,
      description: e["description"],
    });
    handleEditable("", !state.isEditable);
    reset();
  };
  const handleDelete = () => {
    deleteTask(task.id);
    reset();
  };
  const handleEditBtn = () => {
    if (!task.isChecked) {
      setValue("description", task.description);
      if (state.isEditable && task.id !== state.id)
        handleEditable(task.id, state.isEditable);
      else if (state.isEditable && task.id === state.id) {
        handleEditable("-", !state.isEditable);
      } else {
        handleEditable(task.id, !state.isEditable);
      }
    }
  };

  return (
    <tr style={{ border: "1px solid black" }}>
      <td className="item-spacing column-1">
        <div id={task.id} style={{ display: "flex" }}>
          {!task.isChecked ? (
            <SquareOutlined
              className="icon-format"
              onClick={() => {
                taskMarkDone({ id: task.id, isChecked: !task.isChecked });
              }}
            />
          ) : (
            <CheckBox className="icon-format" />
          )}
          {state.isEditable && task.id === state.id ? (
            <form onSubmitCapture={handleSubmit(onSubmitHandler)} id={task.id}>
              <input
                type="text"
                {...register("description")}
                className="update-field"
              />
              {errors.description && isSubmitted && isDirty && (
                <p className="update-field-error">
                  {errors.description?.message}
                </p>
              )}
            </form>
          ) : (
            <span
              className={task.isChecked ? "checked-task-text" : "task-text"}
            >
              {task.description}
            </span>
          )}
        </div>
      </td>
      <td>
        <Edit className="icon-format" onClick={handleEditBtn} />
      </td>
      <td>
        <Delete className="icon-format" onClick={handleDelete} />
      </td>
    </tr>
  );
};
export default ListItem;
