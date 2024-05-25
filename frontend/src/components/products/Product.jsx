import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cart/cartSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Check, Favorite, ShoppingCartOutlined } from "@mui/icons-material";

const Product = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    const checkIfAddedToCart = () => {
      let added = items.find((item) => item.id === product.id);

      if (added) {
        setAddedToCart(true);
      } else {
        setAddedToCart(false);
      }
    };

    checkIfAddedToCart();
  }, [items]);

  return (
    <Card variant="outlined">
      <CardMedia
        sx={{
          height: "250px",
          width: "250px",
          marginInline: "auto",
          aspectRatio: "3 / 4",
          objectFit: "cover",
          marginBottom: "1rem",
        }}
        image={product.url}
        title={product.title}
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBlock: "8px",
        }}
      >
        <Typography variant="subtitle1">{product.title}</Typography>
        <Typography variant="subtitle2">$ {product.price}</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          component="div"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            width: "100%",
          }}
        >
          <Button variant="text" aria-label="Show more">
            Show details
          </Button>
          <IconButton aria-label="favorite button">
            <Favorite />
          </IconButton>
        </Box>
        <Button
          variant="outlined"
          endIcon={addedToCart ? <Check /> : <ShoppingCartOutlined />}
          disabled={addedToCart}
          fullWidth
          sx={{ margin: "0 !important" }}
          onClick={() => dispatch(addToCart(product))}
        >
          {addedToCart ? "Added" : "Add to cart"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
