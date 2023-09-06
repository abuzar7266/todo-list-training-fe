import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Paper, Typography, TextField, Button } from "@mui/material"; // Import MUI components
import { ILoginInput, ILoginProps } from "assets/typescript/interfaces";
import { schemaLogin } from "formSchema";
import { USER_AUTH_STATE } from "assets/typescript/constants";

var { LOGIN_SUCCESS } = USER_AUTH_STATE;

const Login: React.FC<ILoginProps> = ({ user, login, logout, setAuth }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  useEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    if (user.state === LOGIN_SUCCESS) {
      localStorage.setItem("token", user.token);
      window.location.href = "/todo";
    }
  }, [user.state]);

  const onSubmitHandler = (e: ILoginInput) => {
    login(e);
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
