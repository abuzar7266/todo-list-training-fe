import React, { useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
  Container,
  Grid,
  Paper,
  Button,
} from "@mui/material"; // Import MUI components
import { createTheme } from "@mui/material/styles";
import LoginContainer from "containers/authcontainers/loginContainer";
import SignupContainer from "containers/authcontainers/signupContainer";
import "assets/css/auth.css";

// Define a custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#007BFF",
    },
    secondary: {
      main: "#007BFF",
    },
    background: {
      default: "#2F8BAF",
    },
  },
});

const Auth: React.FC = () => {
  const [onLogged, setOnLogged] = useState<number>(0);
  const setAuth = () => {
    setOnLogged((onLogged + 1) % 2);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        {" "}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              {onLogged ? (
                <SignupContainer setAuth={setAuth} />
              ) : (
                <LoginContainer setAuth={setAuth} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Auth;
