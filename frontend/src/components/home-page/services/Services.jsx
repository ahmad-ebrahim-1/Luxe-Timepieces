import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Build, Diamond, Shield } from "@mui/icons-material";
import Service from "./Service";

export const servicesData = [
  {
    title: "Watch Engraving",
    caption:
      "Personalize your timepiece with our custom watch engraving service. Add a special message, initials, or a memorable date to create a unique and meaningful accessory that reflects your style.",
    icon: <Diamond />,
  },
  {
    title: "Watch Appraisal & Authentication",
    caption:
      "Ensure the authenticity and value of your watch with our professional appraisal and authentication services. Our experts will carefully examine your timepiece to provide a detailed assessment and certification.",
    icon: <Shield />,
  },
  {
    title: "Watch Repair & Maintenance Plans",
    caption:
      "Protect your investment with our watch repair and maintenance plans. Choose from different levels of coverage to receive regular servicing, repairs, and inspections to keep your watches in top condition for years to come.",
    icon: <Build />,
  },
];

const Services = () => {
  return (
    <Box
      component="div"
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: 4,
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
        {` Our Expert `}
        <Box component="span" sx={{ color: "primary.main" }}>
          Services
        </Box>
      </Typography>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        {servicesData.map((service) => (
          <Service service={service} key={service.title} />
        ))}
      </Stack>
    </Box>
  );
};

export default Services;
