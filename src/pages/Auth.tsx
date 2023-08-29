import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Login from "../components/login";
import Signup from "../components/signup";
import "../assets/css/auth.css";
const Auth: React.FC = () => {
  const [onLogged, setOnLogged] = useState<number>(0);
  const setAuth = () => {
    setOnLogged((onLogged + 1) % 2);
  };
  return (
    <>
      <Container className="container" fluid>
        {onLogged ? <Signup setAuth={setAuth} /> : <Login setAuth={setAuth} />}
      </Container>
    </>
  );
};

export default Auth;
