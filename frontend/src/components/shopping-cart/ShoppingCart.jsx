import { Box, Modal, Typography } from "@mui/material";

const ShoppingCart = ({ isOpen, setIsOpen }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "100%", sm: "75%" },
    bgcolor: "background.default",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Shopping cart
        </Typography>
        <Typography variant="body2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci
          ipsum dignissimos doloremque aliquam voluptas numquam fuga unde,
          expedita nisi ea! Debitis, fugit sunt optio maxime incidunt voluptate
          quasi provident minus.
        </Typography>
      </Box>
    </Modal>
  );
};

export default ShoppingCart;
