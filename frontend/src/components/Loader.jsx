import { Box } from "@mui/material";
import Fullscreen from "./Fullscreen";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Fullscreen>
      <Box
        component="div"
        sx={{ minHeight: "inherit", display: "grid", placeItems: "center" }}
      >
        <CircularProgress />
      </Box>
    </Fullscreen>
  );
};

export default Loader;
