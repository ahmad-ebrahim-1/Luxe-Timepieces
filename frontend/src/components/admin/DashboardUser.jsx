import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../delete-modal/DeleteModal";
import { Delete, Edit } from "@mui/icons-material";
import PermissionModal from "../user-permission-modal/PermissionModal";
import { deleteUser } from "../../store/slices/users/usersSlice";

const DashboardUser = ({ user }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);

  const { operationLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        p: { xs: 2, md: 2.5 },
        bgcolor: "secondary.main",
        borderRadius: 1,
      }}
    >
      <DeleteModal
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        elementToDelete={user.first_name + " " + user.last_name}
        deleteAction={handleDelete}
        isLoading={operationLoading}
      />
      <PermissionModal
        isOpen={permissionModalOpen}
        setIsOpen={setPermissionModalOpen}
        user={user}
      />

      <Typography variant="subtitle1" sx={{ fontWeight: "semibold" }}>
        ID: #{user && user.id && user.id}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: "semibold" }}>
        {user &&
          user.first_name &&
          user.last_name &&
          `${user.first_name} ${user.last_name}`}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: "semibold" }}>
        {user && user.email && user.email}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: "semibold" }}>
        type: {user && user.userType && user.userType}
      </Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          endIcon={<Edit />}
          onClick={() => setPermissionModalOpen(true)}
        >
          Edit permission
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          endIcon={<Delete />}
          onClick={() => setDeleteModalOpen(true)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardUser;
