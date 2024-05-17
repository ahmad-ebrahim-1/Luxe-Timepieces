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
import {
  LightMode,
  DarkMode,
  ShoppingCart,
  Person,
  Home,
  Watch,
  Discount,
  Login,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "/public/logo.jpg";

// Routes data
const links = [
  {
    name: "Home",
    path: "/",
    icon: <Home />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <Watch />,
  },
  {
    name: "Offers",
    path: "/offers",
    icon: <Discount />,
  },
];

export default function Navbar({ isDark, setIsDark }) {
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);
  const [userDrawerIsVisible, setUserDrawerIsVisible] = useState(false);
  const [cartIsVisible, setCartIsVisible] = useState(false);

  // Appbar buttons
  const appBarBtns = [
    {
      name: "theme button",
      icon: isDark ? <LightMode /> : <DarkMode />,
      action: () => setIsDark(!isDark),
    },
    {
      name: "cart button",
      icon: <ShoppingCart />,
      action: () => setCartIsVisible(true),
    },
    {
      name: "user button",
      icon: <Person />,
      action: () => setUserDrawerIsVisible(true),
    },
    {
      name: "menu button",
      icon: <MenuIcon />,
      action: () => setDrawerIsVisible(true),
    },
  ];

  return (
    <nav>
      {/* app bar */}
      <AppBar position="fixed" sx={{ backgroundColor: "background.default" }}>
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
                width: "28px",
                height: "28px",
                borderRadius: "100%",
                alignSelf: "center",
              }}
              alt="Logo"
              src={logo}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "400",
                display: { xs: "none", sm: "block" },
                color: `${isDark ? "#fff" : "#000"}`,
              }}
            >
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
                    borderBottom: isActive
                      ? `${isDark ? "1px solid #fff" : "1px solid #000"}`
                      : "",
                  };
                }}
              >
                <Button
                  aria-label={link.name}
                  variant="text"
                  startIcon={link.icon}
                  sx={{
                    color: `${isDark ? "#fff" : "#000"}`,
                    ":hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                  }}
                >
                  <Typography variant="body2">{link.name}</Typography>
                </Button>
              </NavLink>
            ))}
          </Stack>
          <Stack direction="row" spacing={1}>
            {appBarBtns.map((btn) => (
              <IconButton
                key={btn.name}
                aria-label={btn.name}
                sx={{
                  color: `${isDark ? "#fff" : "#000"}`,
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
      {/* menu drawer */}
      <Drawer
        anchor="right"
        open={drawerIsVisible}
        onClose={() => setDrawerIsVisible(false)}
      >
        <List
          sx={{
            backgroundColor: "background.default",
            height: "100%",
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
      {/* user drawer */}
      <Drawer
        anchor="top"
        open={userDrawerIsVisible}
        onClose={() => setUserDrawerIsVisible(false)}
      >
        <List
          sx={{
            backgroundColor: "background.default",
            height: "100%",
            width: "100%",
            paddingTop: "1rem",
          }}
        >
          <Typography variant="h5" sx={{ padding: "1rem" }}>
            User profile
          </Typography>
          <Divider />
          <ListItem>
            <NavLink
              to="/login"
              style={({ isActive }) => {
                return {
                  width: "fit",
                  textDecoration: "none",
                  color: "inherit",
                  backgroundColor: isActive ? "rgba(0, 0, 0, .1)" : "",
                };
              }}
            >
              <ListItemButton
                aria-label="login button"
                onClick={() => setUserDrawerIsVisible(false)}
              >
                <ListItemIcon>{<Login />}</ListItemIcon>
                <ListItemText>Login to your account</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
}
