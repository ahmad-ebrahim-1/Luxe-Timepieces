import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <Box
      component="div"
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={submitHandler}
      >
        {(props) => (
          <Form>
            <Box
              component="div"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                minWidth: { xs: "100%", sm: "400px" },
                minHeight: "400px",
                padding: "2rem",
                bgcolor: "secondary.main",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                borderRadius: 1.5,
              }}
            >
              <Typography variant="h6" sx={{ textAlign: "center", mb: 3 }}>
                Login to your account
              </Typography>

              <Stack direction="column" spacing={3} sx={{}}>
                <TextField
                  name="email"
                  id="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  onChange={(event) => {
                    props.values.email = event.target.value;
                  }}
                  error={!!props.errors.email}
                  helperText={props.errors.email ? props.errors.email : ""}
                />
                <TextField
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="standard"
                  fullWidth
                  onChange={(event) => {
                    props.values.password = event.target.value;
                  }}
                  error={!!props.errors.password}
                  helperText={
                    props.errors.password ? props.errors.password : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="contained" type="submit" fullWidth>
                  Login
                </Button>
              </Stack>
              <Typography
                variant="subtitle2"
                sx={{ mt: 3, textAlign: "center" }}
              >
                <span>{`Don't have an account? `}</span>
                <NavLink to="/signup">Sign Up</NavLink>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
