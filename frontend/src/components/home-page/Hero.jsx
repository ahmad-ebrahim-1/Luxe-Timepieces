import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Facebook, Instagram, WhatsApp, X } from "@mui/icons-material";
import watchImage from "/hero-watch.png";

const socials = [
  {
    icon: <Facebook />,
    title: "Facebook",
    color: "#1877F2",
  },
  {
    icon: <Instagram />,
    title: "Instagram",
    color: "#cd486b",
  },
  {
    icon: <WhatsApp />,
    title: "WhatsApp",
    color: "#075E54",
  },
  {
    icon: <X />,
    title: "X",
    color: "#000",
  },
];

const Hero = ({ isDark }) => {
  return (
    <Box component="div" sx={{ position: "relative", minHeight: "100dvh" }}>
      <Box
        component="div"
        sx={{
          filter: "blur(16px)",
          height: "100dvh",
          width: "100%",
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
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-around" },
          alignItems: "center",
          gap: 4,
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

          <Stack direction="row" spacing={2}>
            {socials.map((s) => (
              <IconButton key={s.title} sx={{ ":hover": { color: s.color } }}>
                {s.icon}
              </IconButton>
            ))}
          </Stack>
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
    </Box>
  );
};

export default Hero;
