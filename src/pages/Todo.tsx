import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Box,
  CardContent,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LogoutIcon from "@mui/icons-material/Logout";
import TodoListContainer from "containers/todoContainers/todoListContainer";
import { ITaskInput, ITodoProps } from "interfaces";

const schema = yup
  .object({
    description: yup
      .string()
      .min(5, "Description must be at least 5 characters")
      .max(30, "Description must not exceed 30 characters")
      .required("Description is required"),
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

  const [newTask, setNewTask] = useState("");

  const onSubmitHandler = (e: ITaskInput) => {
    addTask(e.description);
    reset();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    fetchTodo();
  }, [navigate, fetchTodo]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newTask.trim() !== "") {
      addTask(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "20vh",
        textAlign: "right",
      }}
    >
      <LogoutIcon onClick={handleLogout} />
      <Card
        style={{
          marginTop: "5vh",
          textAlign: "right",
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography
              variant="h3"
              style={{
                color: "#0014F8",
                fontFamily: "serif",
                fontWeight: "800",
              }}
            >
              My Todo
            </Typography>
          </Box>
          <form action="" onSubmit={handleSubmit(onSubmitHandler)}>
            <TextField
              label="Input task name and press Enter to add"
              variant="outlined"
              fullWidth
              onKeyPress={handleKeyPress}
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register("description")}
            />
          </form>

          <TodoListContainer />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Todo;
