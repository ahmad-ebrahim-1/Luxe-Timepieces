import { Box } from "@mui/material";
import FullScreen from "./FullScreen";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <FullScreen>
      <Box
        component="div"
        sx={{ minHeight: "inherit", display: "grid", placeItems: "center" }}
      >
        <CircularProgress />
      </Box>
    </FullScreen>
  );
};

export default Loader;
