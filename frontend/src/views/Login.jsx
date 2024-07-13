import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as yup from "yup";
import OperationAlert from "../components/operation-alert/OperationAlert";
import { authOperationCompleted, login } from "../store/slices/auth/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { error, status, isLoading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
    dispatch(login({ email: values.email, password: values.password }));
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <>
      <OperationAlert
        status={status}
        error={error}
        messageOnSuccess="The operation was completed successfuly"
        messageOnError="There was an error, please try again later"
        completedAction={authOperationCompleted}
      />

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
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center", mb: 4 }}>
                  Login to your account
                </Typography>

                <Stack direction="column" spacing={3.5}>
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
                  sx={{
                    textAlign: "center",
                    marginTop: 3.5,
                  }}
                >
                  <Box component="span">{`Don't have an account? `}</Box>
                  <NavLink to="/signup" style={{ textDecoration: "none" }}>
                    <Box
                      component="span"
                      sx={{
                        color: "primary.main",
                        borderBottom: "1px solid",
                      }}
                    >
                      Sign Up
                    </Box>
                  </NavLink>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Login;
