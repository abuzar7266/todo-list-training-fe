import React, { useState } from "react";
import { Container } from "react-bootstrap";
import LoginContainer from "containers/authcontainers/loginContainer";
import SignupContainer from "containers/authcontainers/signupContainer";
import "assets/css/auth.css";
const Auth: React.FC = () => {
  const [onLogged, setOnLogged] = useState<number>(0);
  const setAuth = () => {
    setOnLogged((onLogged + 1) % 2);
  };
  return (
    <>
      <Container className="container" fluid>
        {onLogged ? <SignupContainer setAuth={setAuth} /> : <LoginContainer setAuth={setAuth} />}
      </Container>
    </>
  );
};

export default Auth;
