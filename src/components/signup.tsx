import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Paper, Typography, TextField, Button } from "@mui/material"; // Import MUI components
import { ISignupInput, ISignupProps } from "@src/assets/typescript/interfaces";
import { schemaSignup } from "formSchema";
import { USER_AUTH_STATE } from "assets/typescript/constants";

var { SIGNUP_SUCCESS } = USER_AUTH_STATE;

const Signup: React.FC<ISignupProps> = ({ refresh, signup, user, setAuth }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaSignup),
  });

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/todo");
  }, []);

  useEffect(() => {
    if (user.state === SIGNUP_SUCCESS) {
      reset();
      refresh();
      navigate("/auth");
    }
  }, [user]);

  const onSubmitHandler = (e: ISignupInput) => {
    signup(e);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Paper
        elevation={3}
        sx={{ padding: "20px", border: "none", boxShadow: "none" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            {...register("firstName")}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            {...register("lastName")}
          />
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
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            type="password"
            label="Password"
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
            fullWidth
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            Signup
          </Button>
        </form>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            variant="text"
            onClick={() => {
              setAuth();
            }}
          >
            Go to login page
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Signup;
