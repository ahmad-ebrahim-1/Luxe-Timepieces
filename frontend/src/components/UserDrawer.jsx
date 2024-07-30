import { Favorite, Logout } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/auth/authSlice";

const UserDrawer = ({ isOpen, setOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => setOpen(false)}>
      <List
        sx={{
          backgroundColor: "secondary.main",
          height: "100%",
          minWidth: "275px",
          paddingTop: "1rem",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" padding={2}>
          <Avatar />
          <Typography variant="subtitle2">
            {user &&
              user.first_name &&
              user.last_name &&
              `${user.first_name} ${user.last_name}`}
          </Typography>
          <Typography variant="body2" sx={{ color: "primary.main" }}>
            {user && user.userType && user.userType}
          </Typography>
        </Stack>
        <Divider />
        <ListItem>
          <NavLink
            to="/favorites"
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
              aria-label="favorites button"
              onClick={() => {
                setOpen(false);
              }}
            >
              <ListItemIcon>{<Favorite />}</ListItemIcon>
              <ListItemText>Favorites</ListItemText>
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemButton
            aria-label="logout button"
            onClick={() => {
              dispatch(logout());
              setOpen(false);
            }}
          >
            <ListItemIcon>{<Logout />}</ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default UserDrawer;
