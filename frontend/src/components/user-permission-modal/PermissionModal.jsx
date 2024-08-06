import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { changeUserType } from "../../store/slices/users/usersSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "50%", lg: "50%" },
  maxHeight: "90dvh",
  overflowY: "scroll",
  bgcolor: "background.default",
  boxShadow: 24,
  p: 4,
};

const PermissionModal = ({ isOpen, setIsOpen, user }) => {
  const [userPermission, setUserPermission] = React.useState(user.userType);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setUserPermission(event.target.value);
  };

  const handleChangePermission = () => {
    dispatch(
      changeUserType({ id: user.id, data: { userType: userPermission } })
    );
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={style}>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Change {user.first_name + " " + user.last_name} permission
          </Typography>

          <FormControl>
            <FormLabel id="user-permission">Permissions</FormLabel>
            <RadioGroup
              aria-labelledby="user-permission-group"
              name="user-permission"
              value={userPermission}
              onChange={handleChange}
            >
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel value="user" control={<Radio />} label="User" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" onClick={handleChangePermission}>
            Change permission
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PermissionModal;
