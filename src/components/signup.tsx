import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ISignupInput, ISignupProps } from "../interfaces";
const schemaSignup = yup
  .object({
    username: yup.string().min(5).max(16).required(),
    password: yup.string().min(5).max(16).required(),
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().min(1).required(),
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
      refresh({});
      window.location.href = "/auth";
    }
  }, [user]);
  const onSubmitHandler = (e: ISignupInput) => {
    signupRequest(e);
  };
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h1 className="header-form">Signup</h1>
        </div>
        <form action="" onSubmitCapture={handleSubmit(onSubmitHandler)}>
          <div className="card-body">
            <label className="signup-form-label">
              {" "}
              First Name <span style={{ color: "rgb(99, 0, 0)" }}>*</span>
            </label>
            {errors.firstName && (
              <p className="auth-field-error">{errors.firstName?.message}</p>
            )}
            <input
              type="text"
              className={
                errors.firstName
                  ? "demographic-field-danger"
                  : "demographic-field"
              }
              placeholder="First Name"
              {...register("firstName")}
            />
            <label className="signup-form-label">
              {" "}
              Last Name <span style={{ color: "rgb(99, 0, 0)" }}>*</span>
            </label>
            {errors.lastName && (
              <p className="auth-field-error">{errors.lastName?.message}</p>
            )}
            <input
              type="text"
              className={
                errors.lastName
                  ? "demographic-field-danger"
                  : "demographic-field"
              }
              placeholder="Last Name"
              {...register("lastName")}
            />
            <label className="signup-form-label">
              {" "}
              Username <span style={{ color: "rgb(99, 0, 0)" }}>*</span>
            </label>
            {errors.username && (
              <p className="auth-field-error">{errors.username?.message}</p>
            )}
            <input
              type="text"
              className={
                errors.username
                  ? "demographic-field-danger"
                  : "demographic-field"
              }
              placeholder="Username"
              {...register("username")}
            />
            <label className="signup-form-label">
              {" "}
              Email Address <span style={{ color: "rgb(99, 0, 0)" }}>*</span>
            </label>
            {errors.email && (
              <p className="auth-field-error">{errors.email?.message}</p>
            )}
            <input
              type="text"
              className={
                errors.email ? "demographic-field-danger" : "demographic-field"
              }
              placeholder="Email"
              {...register("email")}
            />
            <label className="signup-form-label">
              {" "}
              Password <span style={{ color: "rgb(99, 0, 0)" }}>*</span>
            </label>
            {errors.password && (
              <p className="auth-field-error">{errors.password?.message}</p>
            )}
            <input
              type="password"
              className={
                errors.password
                  ? "demographic-field-danger"
                  : "demographic-field"
              }
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <input type="submit" className="submit" value="Signup" />
        </form>
        <div className="submit-btn">
          <button
            className="move-btn"
            onClick={() => {
              setAuth();
            }}
          >
            Go to login page
          </button>
        </div>
      </div>
    </>
  );
};
export default Signup;
