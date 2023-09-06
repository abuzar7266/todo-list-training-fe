import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  TextField,
  Typography,
  Box,
  CardContent,
  Card,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import TodoListContainer from "containers/todoContainers/todoListContainer";
import { ITaskInput, ITodoProps } from "assets/typescript/interfaces";
import { schemaTodo } from "formSchema";

const Todo: React.FC<ITodoProps> = ({ fetchTodo, addTask }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaTodo),
  });

  const onSubmitHandler = (e: ITaskInput) => {
    addTask(e.description);
    reset();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    fetchTodo();
  }, []);

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
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <TextField
              label="Input task name and press Enter to add"
              variant="outlined"
              fullWidth
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
