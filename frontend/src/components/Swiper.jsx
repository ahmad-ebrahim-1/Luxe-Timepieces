import { Box } from "@mui/material";
import React from "react";

const Swiper = ({ slides }) => {
  return (
    <Box component="div" className="logos-slider">
      <Box component="div" className="logos-slide">
        {slides.map((slide) => (
          <Box
            component="img"
            src={slide.url}
            alt={slide.title}
            sx={{ height: "75px", margin: "0 75px" }}
          />
        ))}
      </Box>
      <Box component="div" className="logos-slide">
        {slides.map((slide) => (
          <Box
            component="img"
            src={slide.url}
            alt={slide.title}
            sx={{ height: "75px", margin: "0 75px" }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Swiper;
