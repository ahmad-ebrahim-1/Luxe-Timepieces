import { Box, Stack, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

import Fullscreen from "./Fullscreen";

const Errorpage = ({ message }) => {
  return (
    <Fullscreen>
      <Box sx={{ minHeight: "inherit", display: "grid", placeItems: "center" }}>
        <Stack
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <ErrorIcon fontSize="large" sx={{ color: "error.main" }} />

          <Typography variant="h5" maxWidth="sm" textAlign="center">
            {message}
          </Typography>
        </Stack>
      </Box>
    </Fullscreen>
  );
};

export default Errorpage;
