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
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={error ? "error" : "success"}
        variant="outlined"
        sx={{ width: "100%", bgcolor: "background.default" }}
      >
        {error ? messageOnError : messageOnSuccess}
      </Alert>
    </Snackbar>
  );
};

export default OperationAlert;
