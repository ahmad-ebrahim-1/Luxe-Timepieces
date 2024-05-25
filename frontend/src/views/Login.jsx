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
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const validateFields = () => {
    let invalid = false;

    if (email.length === 0) {
      setEmailError("Email is required");
      invalid = true;
    } else if (!email.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setEmailError("Please enter a valid email");
      invalid = true;
    } else {
      setEmailError("");
      invalid = false;
    }

    if (password.length === 0) {
      setPassError("Password is required");
      invalid = true;
    } else if (password.length < 8) {
      setPassError("Password should be at least 8 characters");
      invalid = true;
    } else {
      setPassError("");
      invalid = false;
    }

    return invalid;
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!validateFields()) {
      console.log(email);
      console.log(password);
    }
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
      <Box
        component="form"
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
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            sx={{ color: "black" }}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            error={!!emailError}
            helperText={emailError ? emailError : ""}
          />
          <TextField
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="standard"
            fullWidth
            sx={{ color: "black" }}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            error={!!passError}
            helperText={passError ? passError : ""}
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
          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
        <Typography variant="subtitle2" sx={{ mt: 3, textAlign: "center" }}>
          <span>{`Don't have an account ? `}</span>
          <a href="/signup">Sign Up</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
