import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";

import logo from "../assets/OIG1.jpg";

// Routes data
const links = [
  {
    name: "link1",
    path: "/",
    icon: <InfoIcon />,
  },
  {
    name: "link2",
    path: "/",
    icon: <InfoIcon />,
  },
  {
    name: "link3",
    path: "/",
    icon: <InfoIcon />,
  },
  {
    name: "link4",
    path: "/",
    icon: <InfoIcon />,
  },
];

export default function Navbar({ isDark, setIsDark }) {
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);

  // Appbar buttons
  const appBarBtns = [
    {
      name: "theme button",
      icon: isDark ? <LightMode /> : <DarkMode />,
      action: () => setIsDark(!isDark),
    },
    {
      name: "menu button",
      icon: <MenuIcon />,
      action: () => setDrawerIsVisible(!drawerIsVisible),
    },
  ];

  return (
    <nav>
      {/* app bar */}
      <AppBar position="fixed">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignSelf: "center",
            width: "100%",
            maxWidth: "1400px",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Box
              component="img"
              sx={{
                height: "28px",
                borderRadius: "100%",
                alignSelf: "center",
              }}
              alt="Logo"
              src={logo}
            />
            <Typography variant="h6" sx={{ fontFamily: "" }}>
              Luxe Timepieces
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {links.map((link) => (
              <NavLink
                to={link.path}
                key={link.name}
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive ? "1px solid #FFF" : "",
                  };
                }}
              >
                <Button
                  aria-label={link.name}
                  variant="text"
                  startIcon={link.icon}
                  sx={{
                    color: "#FFF",
                    ":hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                  }}
                >
                  {link.name}
                </Button>
              </NavLink>
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            {appBarBtns.map((btn) => (
              <IconButton
                key={btn.name}
                aria-label={btn.name}
                sx={{
                  color: "#FFF",
                  ":hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                  display: {
                    md: `${btn.name === "menu button" && "none"}`,
                  },
                }}
                onClick={() => btn.action()}
              >
                {btn.icon}
              </IconButton>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      {/* drawer */}
      <Drawer
        anchor="right"
        open={drawerIsVisible}
        onClose={() => setDrawerIsVisible(false)}
      >
        <List
          sx={{
            width: { xs: "65vw", sm: "50vw" },
            paddingTop: "1rem",
          }}
        >
          <Typography variant="h5" sx={{ padding: "1rem" }}>
            Menu
          </Typography>
          <Divider />
          {links.map((link) => (
            <ListItem key={link.name}>
              <NavLink
                to={link.path}
                style={({ isActive }) => {
                  return {
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit",
                    backgroundColor: isActive ? "rgba(0, 0, 0, .1)" : "",
                  };
                }}
              >
                <ListItemButton
                  aria-label={link.name}
                  onClick={() => setDrawerIsVisible(false)}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText>{link.name.toUpperCase()}</ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </nav>
  );
}
