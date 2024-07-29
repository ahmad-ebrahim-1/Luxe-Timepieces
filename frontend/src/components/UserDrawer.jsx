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
        <Stack direction="row" spacing={2} alignItems="center" padding={2}>
          <Avatar src="" alt="user profile image" />
          <Typography variant="subtitle1">
            {user && `${user.first_name} ${user.last_name}`}
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
            <ListItemButton aria-label="favorites button">
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
