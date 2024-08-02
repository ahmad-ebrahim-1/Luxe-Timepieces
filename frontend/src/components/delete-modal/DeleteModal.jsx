import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

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

const DeleteModal = ({
  isOpen,
  setIsOpen,
  elementToDelete,
  deleteAction,
  isLoading,
}) => {
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
            Are you sure you want to delete '{elementToDelete}'
          </Typography>
          <Button variant="contained" color="error" onClick={deleteAction}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
