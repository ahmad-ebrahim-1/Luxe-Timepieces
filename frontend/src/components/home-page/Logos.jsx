import { Box, Typography } from "@mui/material";
import Swiper from "../Swiper";
import { logos } from "../../utils/logos";

const Logos = () => {
  return (
    <Box
      sx={{
        overflowX: "hidden",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          maxWidth: "900px",
          textAlign: "center",
          fontWeight: "700",
          fontSize: {
            xs: "h5.fontSize",
            sm: "h3.fontSize",
          },
        }}
      >
        Embark on a Journey of{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          Discovery
        </Box>{" "}
        with our{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          Revered Partners
        </Box>
      </Typography>

      <Swiper slides={logos} />
    </Box>
  );
};

export default Logos;
