import { useDispatch } from "react-redux";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import {
  decreaseQuantity,
  deleteCartItem,
  increaseQuantity,
} from "../../store/slices/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: { xs: 0.5, md: 2 },
        bgcolor: "secondary.main",
        p: { xs: 0.5, md: 2 },
        borderRadius: 0.5,
      }}
    >
      <Box
        component="img"
        src={
          item &&
          item.product &&
          item.product.image_name &&
          "http://127.0.0.1:8000" + item.product.image_name
        }
        alt="product image"
        sx={{
          width: { xs: "50px", md: "75px" },
          height: { xs: "50px", md: "75px" },
          objectFit: "cover",
        }}
      />

      <Typography
        variant="subtitle2"
        sx={{ fontSize: { xs: "caption.fontSize", sm: "subtitle2.fontSize" } }}
      >
        {item && item.product && item.product.title && item.product.title}
        <br />
        <Box component="span" sx={{ color: "gray" }}>
          {item && item.product && item.product.id && `id: #${item.product.id}`}
        </Box>
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ fontSize: { xs: "caption.fontSize", sm: "subtitle2.fontSize" } }}
      >
        {item && item.product && item.product.type && item.product.type}
      </Typography>

      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "caption.fontSize", sm: "subtitle2.fontSize" },
          }}
        >
          {item && item.quantity && item.quantity}
        </Typography>
        <Stack direction="column">
          <IconButton
            onClick={() => {
              dispatch(increaseQuantity(item.basket_id));
            }}
            sx={{ p: 0.5 }}
          >
            <Add fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(decreaseQuantity(item.basket_id));
            }}
            sx={{ p: 0.5 }}
          >
            <Remove fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Typography
        variant="subtitle2"
        sx={{ fontSize: { xs: "caption.fontSize", sm: "subtitle2.fontSize" } }}
      >
        $ {item && item.product && item.product.price && item.product.price}
      </Typography>

      <IconButton
        onClick={() => {
          dispatch(deleteCartItem(item.basket_id));
        }}
      >
        <Close fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default CartItem;
