import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import UserDrawer from "./UserDrawer";
import Cart from "./shopping-cart/ShoppingCart";
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
import MenuIcon from "@mui/icons-material/Menu";
import {
  LightModeOutlined,
  DarkModeOutlined,
  ShoppingCartOutlined,
  PersonOutline,
  HomeOutlined,
  WatchOutlined,
  AccountCircleOutlined,
  Dashboard,
} from "@mui/icons-material";

import logo from "/logo.jpg";

export default function Navbar({ isDark, setIsDark }) {
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);
  const [userDrawerIsVisible, setUserDrawerIsVisible] = useState(false);
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // Routes data
  const links = [
    {
      name: "Home",
      path: "/",
      icon: <HomeOutlined />,
      isPrivate: false,
    },
    {
      name: "Products",
      path: "/products",
      icon: <WatchOutlined />,
      isPrivate: false,
    },
    {
      name: "Login",
      path: "/login",
      icon: <AccountCircleOutlined />,
      isPrivate: true,
    },
  ];

  // Appbar buttons
  const appBarBtns = [
    {
      name: "theme button",
      icon: isDark ? <LightModeOutlined /> : <DarkModeOutlined />,
      action: () => setIsDark(!isDark),
      isPrivate: false,
    },
    {
      name: "cart button",
      icon: <ShoppingCartOutlined />,
      action: () => setCartIsVisible(true),
      isPrivate: true,
    },
    {
      name: "user button",
      icon: <PersonOutline />,
      action: () => setUserDrawerIsVisible(true),
      isPrivate: true,
    },
    {
      name: "menu button",
      icon: <MenuIcon />,
      action: () => setDrawerIsVisible(true),
      isPrivate: false,
    },
  ];

  return (
    <nav>
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
            {links.map((link) => {
              if (!link.isPrivate || (link.isPrivate && user === null)) {
                return (
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
                );
              }
            })}
            {user?.userType === "admin" && (
              <NavLink
                to="/admin-dashboard"
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive
                      ? `${isDark ? "1px solid #fff" : "1px solid #000"}`
                      : "",
                  };
                }}
              >
                <Button
                  aria-label="Dashboard"
                  variant="text"
                  startIcon={<Dashboard />}
                  sx={{
                    color: `${isDark ? "#fff" : "#000"}`,
                    ":hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                  }}
                >
                  <Typography variant="body2">Dashboard</Typography>
                </Button>
              </NavLink>
            )}
          </Stack>
          <Stack direction="row" spacing={1}>
            {appBarBtns.map((btn) => {
              if (!btn.isPrivate || (btn.isPrivate && user !== null))
                return (
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
                );
            })}
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerIsVisible}
        onClose={() => setDrawerIsVisible(false)}
      >
        <List
          sx={{
            backgroundColor: "secondary.main",
            height: "100%",
            minWidth: "275px",
            paddingTop: "1rem",
          }}
        >
          <Typography variant="h5" sx={{ padding: "1rem" }}>
            Menu
          </Typography>
          <Divider />
          {links.map((link) => {
            if (!link.isPrivate || (link.isPrivate && user === null))
              return (
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
              );
          })}
          {user?.userType === "admin" && (
            <ListItem>
              <NavLink
                to="/admin-dashboard"
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
                  aria-label="admin-dashboard"
                  onClick={() => setDrawerIsVisible(false)}
                >
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText>{"dashboard".toUpperCase()}</ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>
          )}
        </List>
      </Drawer>

      <UserDrawer
        isOpen={userDrawerIsVisible}
        setOpen={setUserDrawerIsVisible}
      />

      <Cart isOpen={cartIsVisible} setIsOpen={setCartIsVisible} />
    </nav>
  );
}
