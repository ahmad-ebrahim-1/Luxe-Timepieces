import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const OperationAlert = ({
  status,
  error,
  messageOnSuccess,
  messageOnError,
  completedAction,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(completedAction());
  };

  useEffect(() => {
    if (status) {
      setOpen(true);
    }
  }, [status, setOpen]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      // transitionDuration={0}
      open={open}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={error ? "error" : "success"}
        variant="filled"
        sx={{ color: "#FFF" }}
      >
        {error ? messageOnError : messageOnSuccess}
      </Alert>
    </Snackbar>
  );
};

export default OperationAlert;
