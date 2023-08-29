import React from "react";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RootState } from "redux/store";
import { login, refresh, logout } from "redux/feature/auth/authSlice";
import { LoginInput, LoginProps } from "../interfaces";
const schema = yup
  .object({
    username: yup.string().min(5).max(16).required(),
    password: yup.string().min(5).max(16).required(),
  })
  .required();

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const Login: React.FC<LoginProps> = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (e: LoginInput) => {
    dispatch(login(e));
    reset();
  };
  useEffect(() => {
    dispatch(logout({}));
  }, []);
  useEffect(() => {
    if (props.user.state === 1) {
      localStorage.setItem("token", props.user.token);
      dispatch(refresh({}));
      window.location.href = "/todo";
    }
  }, [props.user.state]);
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h1 className="header-form">Login</h1>
          {!isDirty ||
            (!isValid && (
              <p className="alert alert-sm alert-danger">
                Username or password is not valid
              </p>
            ))}
        </div>
        <form action="" onSubmitCapture={handleSubmit(onSubmitHandler)}>
          <div className="card-body">
            <input
              type="text"
              className="demographic-field"
              placeholder="Username"
              {...register("username")}
            />
            <input
              type="password"
              className="demographic-field"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <input
            type="submit"
            className="submit"
            value="Login"
            disabled={!isDirty || !isValid}
          />
        </form>
        <div className="submit-btn">
          <button
            className="move-btn"
            onClick={() => {
              props.setAuth();
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
export default connect(mapStateToProps)(Login);
