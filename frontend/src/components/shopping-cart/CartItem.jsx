import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../store/slices/cart/cartSlice";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";

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
        src={item.url}
        sx={{
          width: { xs: "50px", md: "75px" },
          height: { xs: "50px", md: "75px" },
        }}
      />

      <Typography
        variant="subtitle2"
        sx={{ fontSize: { xs: "caption.fontSize", sm: "subtitle2.fontSize" } }}
      >
        {item.title} <br />{" "}
        <Box component="span" sx={{ color: "gray" }}>
          id: #{item.id}
        </Box>
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ fontSize: { xs: "caption.fontSize", sm: "subtitle2.fontSize" } }}
      >
        {item.type}
      </Typography>

      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "caption.fontSize", sm: "subtitle2.fontSize" },
          }}
        >
          {item.quantity}
        </Typography>
        <Stack direction="column">
          <IconButton
            onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}
            sx={{ p: 0.5 }}
          >
            <Add fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() =>
              dispatch(updateQuantity({ id: item.id, amount: -1 }))
            }
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
        $ {item.finalPrice}
      </Typography>

      <IconButton onClick={() => dispatch(removeItem(item.id))}>
        <Close fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default CartItem;
