import { Box, Typography } from "@mui/material";
import FullScreen from "../FullScreen";
import Swiper from "../Swiper";
import { logos } from "../../utils/logos";

const Logos = () => {
  return (
    <FullScreen>
      <Box
        sx={{
          minHeight: "inherit",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: {
              xs: "h5.fontSize",
              sm: "h3.fontSize",
            },
            maxWidth: { xs: "100vw", md: "900px" },
            paddingInline: 2,
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
    </FullScreen>
  );
};

export default Logos;
