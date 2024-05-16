import { Box } from "@mui/material";

const Fullscreen = ({ children, gradientBG }) => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        minHeight: "100vh",
        paddingInline: {
          xs: "0.6rem",
          xl: "0",
        },
        background: gradientBG
          ? "linear-gradient(to left top, #16697A, #FFF)"
          : "",
      }}
    >
      {children}
    </Box>
  );
};

export default Fullscreen;
