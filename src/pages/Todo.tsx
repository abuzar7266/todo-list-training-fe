import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LogoutIcon from "@mui/icons-material/Logout";
import { ITaskInput } from "interfaces";
import TodoListContainer from "containers/todoContainers/todoListContainer";
import { ITodoProps } from "interfaces";
import "assets/css/todo.css";

const schema = yup
  .object({
    description: yup.string().min(5).max(30).required(),
  })
  .required();

const Todo: React.FC<ITodoProps> = ({ fetchTodo, addTask }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (e: ITaskInput) => {
    addTask(e["description"]);
    reset();
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
    } else navigate("/");
    fetchTodo();
  }, [navigate, fetchTodo]);

  return (
    <>
      {
        <div>
          <Container className="container">
            <span>
              <LogoutIcon
                style={{
                  marginLeft: "75%",
                  marginTop: "5%",
                  marginBottom: "100px",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              />
            </span>
            <form action="" onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="task-card">
                <h1 className="task-card-heading">My Todo</h1>
                {errors.description && isDirty && isSubmitted && (
                  <p className="item-field-error">
                    {errors.description?.message}
                  </p>
                )}
                <input
                  placeholder="Input task name and then enter to add"
                  type="text"
                  className="task-field"
                  {...register("description")}
                />
                <hr className="list-endline" />
                <TodoListContainer />
              </div>
            </form>
          </Container>
        </div>
      }
    </>
  );
};

export default Todo;
