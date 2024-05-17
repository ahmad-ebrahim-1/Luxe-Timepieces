import { Box, Button, Typography } from "@mui/material";
import Fullscreen from "../components/Fullscreen";

import watchImage from "../assets/watch-hero.png";
import { ArrowRightAlt } from "@mui/icons-material";

const Hero = ({ isDark }) => {
  return (
    <Fullscreen>
      <Box
        component="div"
        sx={{
          minHeight: "100%",
          width: "100vw",
          filter: "blur(16px)",
          zIndex: -9999,
        }}
        className={isDark ? "pattern-dark" : "pattern-light"}
      ></Box>
      <Box
        component="div"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          minHeight: "100%",
          width: "100vw",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-around" },
          alignItems: "center",
          gap: 4,
          padding: { xs: 2, xl: 0 },
        }}
      >
        <Box
          component="div"
          sx={{
            maxWidth: 650,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: { xs: 2, sm: 4 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "700",
              fontSize: {
                xs: "h5.fontSize",
                sm: "h3.fontSize",
              },
            }}
          >
            <Box component="span" sx={{ color: "primary.main" }}>
              Elevate
            </Box>
            {` Your Style with Timeless `}
            <Box component="span" sx={{ color: "primary.main" }}>
              Elegance
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: "caption.fontSize",
                sm: "body1.fontSize",
              },
            }}
          >
            Discover the essence of luxury with Luxe Timepieces. Crafted with
            precision and sophistication, our watches are a symbol of timeless
            elegance and exquisite craftsmanship. Explore our collection and
            make a statement with every moment.
          </Typography>

          <Button variant="contained" endIcon={<ArrowRightAlt />}>
            Show more
          </Button>
        </Box>

        <Box
          component="img"
          sx={{
            height: { xs: "275px", md: "500px" },
            objectFit: "cover",
          }}
          alt="luxury watch image"
          src={watchImage}
        />
      </Box>
    </Fullscreen>
  );
};

export default Hero;
