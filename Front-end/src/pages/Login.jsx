import React, { useState } from "react";
import { useFileHandler, useInputValidation } from "6pp";
import {  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography, } from "@mui/material";
  import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { usernameValidator } from "../utils/validators";

import { bgGradient } from "../constants/color";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false); 

  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };


   const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

   const avatar = useFileHandler("single");

    const handleLogin = (event) => {
      event.preventDefault();
      setIsLoading(true);
      // Perform login logic here
    };
const handleSignUp =(event)=>{
  event.preventDefault();
  setIsLoading(true);
  // Perform signup logic here
}

  return (
     <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
    <Container
      component={"main"}
      
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Paper
        elevation={3}
        rounded={"md"}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form
              style={{ width: "100%", marginTop: "1rem" }}
              onSubmit={handleLogin}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                  value={username.value}
                  onChange={username.changeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                   value={password.value}
                  onChange={password.changeHandler}
              />
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </Button>
              <Typography textAlign={"center"} m={2}>
                OR
              </Typography>
              <Button
                variant="text"
                color="primary"
                type="button"
                fullWidth
                onClick={() => toggleLogin()}>
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form
             style={{ width: "100%", marginTop: "1rem" }}
             onSubmit={handleSignUp}
            >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "8rem",
                      height: "8rem",
                      objectFit: "contain",
                    }}
                   src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                  {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Bio"
                name="bio"
                autoComplete="bio"
                autoFocus
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username.value}
                onChange={username.changeHandler}
              />

               {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
               <Typography textAlign={"center"} m={2}>
                OR
              </Typography>
              <Button
                variant="text"
                color="primary"
                type="button"
                fullWidth 
                onClick={() => toggleLogin()}>
                Sign In Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
    </div>
  );
};

export default Login;
