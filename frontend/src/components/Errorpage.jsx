import { Box, Stack, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const Errorpage = ({ message, normalHeight, styles }) => {
  return (
    <Box
      sx={{
        minHeight: normalHeight ? "" : "100dvh",
        display: "grid",
        placeItems: "center",
        ...styles,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "400px",
        }}
      >
        <ErrorIcon fontSize="large" sx={{ color: "error.main" }} />

        <Typography variant="h5" maxWidth="sm" textAlign="center">
          {message
            ? message
            : "Oops! There was an error, please try again later"}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Errorpage;
