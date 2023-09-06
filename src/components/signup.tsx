import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  makeStyles,
} from "@mui/material"; // Import MUI components
import { ISignupInput, ISignupProps } from "interfaces";

const schemaSignup = yup
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
    email: yup
      .string()
      .required("Email Address is required")
      .email("Email Address must be valid"),
    firstName: yup
      .string()
      .required("First Name is required")
      .min(5, "First Name must contain atleast 5 characters")
      .max(30, "First Name must not exceed 30 characters"),
    lastName: yup
      .string()
      .required("Last Name is required")
      .min(5, "Last Name must contain atleast 5 characters")
      .max(30, "Last Name must not exceed 30 characters"),
  })
  .required();

const Signup: React.FC<ISignupProps> = ({
  refresh,
  signupRequest,
  user,
  setAuth,
}) => {
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
    if (user.state === 3) {
      reset();
      refresh();
      navigate("/auth");
    }
  }, [user]);

  const onSubmitHandler = (e: ISignupInput) => {
    signupRequest(e);
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
