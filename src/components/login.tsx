import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Paper, Typography, TextField, Button } from "@mui/material"; // Import MUI components
import { ILoginInput, ILoginProps } from "interfaces";

const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username must contain atleast 5 characters")
      .max(16, "Username must not exceed 16 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must contain atleast 5 characters")
      .max(16, "Username must not exceed 16 characters"),
  })
  .required();

const Login: React.FC<ILoginProps> = ({
  user,
  loginRequest,
  logoutRequest,
  refresh,
  setAuth,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    logoutRequest();
  }, []);

  useEffect(() => {
    if (user.state === 1) {
      localStorage.setItem("token", user.token);
      refresh();
      window.location.href = "/todo";
    }
  }, [user.state]);

  const onSubmitHandler = (e: ILoginInput) => {
    loginRequest(e);
    reset();
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Paper
        elevation={3}
        sx={{ padding: "20px", border: "none", boxShadow: "none" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmitCapture={handleSubmit(onSubmitHandler)}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username")}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "5px", marginBottom: "5px" }}
            fullWidth
          >
            Login
          </Button>
        </form>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button variant="text" onClick={() => setAuth()}>
            Go to Signup Page
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
