import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import CartItem from "./CartItem";
import { ArrowBack, Error, Payment } from "@mui/icons-material";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import { useEffect } from "react";
import { getCartItems } from "../../store/slices/cart/cartSlice";

const ShoppingCart = ({ isOpen, setIsOpen }) => {
  const { items, isLoading, operationLoading, error, totalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) dispatch(getCartItems());
  }, [dispatch, isOpen]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "95%", sm: "75%", lg: "75%" },
    maxHeight: "90dvh",
    overflowY: "scroll",
    bgcolor: "background.default",
    boxShadow: 24,
    p: { xs: 1, sm: 2, lg: 4 },
    paddingBottom: { xs: 0, sm: 0, lg: 0 },
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={style}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ p: 2, marginBottom: 2 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              fontSize: {
                xs: "h6.fontSize",
                sm: "h5.fontSize",
              },
            }}
          >
            Shopping Cart
          </Typography>
          {operationLoading ? <CircularProgress size="30px" /> : <CartIcon />}
        </Stack>
        <Stack spacing={1}>
          {error ? (
            <Box component="div" sx={{ p: 6, textAlign: "center" }}>
              <Error />
              <Typography variant="h6">
                Oops! There was an error getting cart items please try again
                later
              </Typography>
            </Box>
          ) : isLoading ? (
            <Box
              component="div"
              sx={{ p: 6, display: "grid", placeItems: "center" }}
            >
              <CircularProgress />
            </Box>
          ) : items.length > 0 ? (
            items.map((item) => <CartItem item={item} key={item.basket_id} />)
          ) : (
            <Box
              component="div"
              sx={{ display: "grid", placeItems: "center", p: 7, gap: 2 }}
            >
              <ProductionQuantityLimitsOutlinedIcon fontSize="large" />
              <Typography variant="h6">Your cart is empty!</Typography>
            </Box>
          )}
        </Stack>

        <Box
          component="div"
          sx={{
            width: "100%",
            paddingBlock: { xs: 1.5, sm: 2.5 },
            position: "sticky",
            bottom: 0,
            left: 0,
            bgcolor: "background.default",
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={() => setIsOpen(false)}
          >
            Back to shop
          </Button>

          <Typography
            variant="subtitle2"
            sx={{
              fontSize: {
                xs: "subtitle2.fontSize",
                sm: "subtitle1.fontSize",
              },
              textAlign: "center",
            }}
          >
            Total price: $ {totalPrice}
          </Typography>

          <Button
            sx={{ width: { xs: "100%", sm: "fit-content" } }}
            disabled={!items.length}
            variant="contained"
            endIcon={<Payment />}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShoppingCart;
