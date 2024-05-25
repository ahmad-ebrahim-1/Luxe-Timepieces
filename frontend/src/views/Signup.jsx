import { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as yup from "yup";
import OperationAlert from "../components/operation-alert/OperationAlert";
import { authOperationCompleted } from "../store/slices/auth/authSlice";
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

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { error, status, isLoading } = useSelector((state) => state.auth);

  const loginSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
    confirm_password: yup
      .string()
      .required("Confirm password is required")
      .test("confirm-password", "Password does not match", function (value) {
        const { password } = this.parent;
        return value === password;
      }),
  });

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const submitHandler = (values) => {
    delete values["confirm_password"];
    console.log(values);
  };

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
                  Create an account
                </Typography>

                <Stack direction="column" spacing={3.5}>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      name="first_name"
                      id="first_name"
                      label="First name"
                      variant="standard"
                      onChange={(event) => {
                        props.values.first_name = event.target.value;
                      }}
                      error={!!props.errors.first_name}
                      helperText={
                        props.errors.first_name ? props.errors.first_name : ""
                      }
                    />
                    <TextField
                      name="last_name"
                      id="last_name"
                      label="Last name"
                      variant="standard"
                      onChange={(event) => {
                        props.values.last_name = event.target.value;
                      }}
                      error={!!props.errors.last_name}
                      helperText={
                        props.errors.last_name ? props.errors.last_name : ""
                      }
                    />
                  </Stack>
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
                  <TextField
                    name="confirm_password"
                    id="confirm_password"
                    type={showPassword ? "text" : "password"}
                    label="Confirm password"
                    variant="standard"
                    fullWidth
                    onChange={(event) => {
                      props.values.confirm_password = event.target.value;
                    }}
                    error={!!props.errors.confirm_password}
                    helperText={
                      props.errors.confirm_password
                        ? props.errors.confirm_password
                        : ""
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
                    Register
                  </Button>
                </Stack>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Signup;
