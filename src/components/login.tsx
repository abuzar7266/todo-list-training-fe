import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ILoginInput, ILoginProps } from "../interfaces";
const schema = yup
  .object({
    username: yup.string().min(5).max(16).required(),
    password: yup.string().min(5).max(16).required(),
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
  const onSubmitHandler = (e: ILoginInput) => {
    loginRequest(e);
    reset();
  };
  useEffect(() => {
    logoutRequest({});
  }, []);
  useEffect(() => {
    if (user.state === 1) {
      localStorage.setItem("token", user.token);
      refresh();
      window.location.href = "/todo";
    }
  }, [user.state]);
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h1 className="header-form">Login</h1>
        </div>
        <form onSubmitCapture={handleSubmit(onSubmitHandler)}>
          <div className="card-body">
            <label htmlFor="" className="login-form-label">
              Username
              {errors.username && (
                <p className="auth-field-error">{errors.username?.message}</p>
              )}
            </label>
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
            <label htmlFor="" className="login-form-label">
              Password
              {errors.password && (
                <p className="auth-field-error">{errors.password?.message}</p>
              )}
            </label>
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
          <input type="submit" className="submit" value="Login" />
        </form>
        <div className="submit-btn">
          <button
            className="move-btn"
            onClick={() => {
              setAuth();
            }}
          >
            Go to Signup Page
          </button>
        </div>
      </div>
    </>
  );
};
// export default Login;
export default Login;
