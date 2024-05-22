import { Copyright } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { links } from "./Navbar";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="div"
      sx={{
        minHeight: "275px",
        width: "100%",
        bgcolor: "secondary.main",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        marginTop: "2.5rem",
        paddingInline: "1rem",
      }}
    >
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography variant="subtitle1">
          Luxe Timepieces | All rights reserved
        </Typography>
        <Copyright />
      </Stack>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            style={({ isActive }) => {
              return {
                color: "inherit",
                opacity: isActive ? "0.6" : "10",
              };
            }}
          >
            <Typography variant="subtitle2">{link.name}</Typography>
          </NavLink>
        ))}
      </Stack>
    </Box>
  );
};

export default Footer;
