import { Fragment, useEffect, useState } from "react";
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
import { toggleFavorite } from "../../store/slices/favs/favsSlice";

const Product = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { favs } = useSelector((state) => state.favs);

  // useEffect(() => {
  //   const checkIfAddedToCart = () => {
  //     let added = items.find((item) => item.id === product.id);

  //     if (added) {
  //       setAddedToCart(true);
  //     } else {
  //       setAddedToCart(false);
  //     }
  //   };

  //   checkIfAddedToCart();
  // }, [items]);

  useEffect(() => {
    const checkIfIsFavorite = () => {
      let isFav = favs.find((fav) => fav.id === product.id);

      if (isFav) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    };

    checkIfIsFavorite();
  }, [favs]);

  const handleFavorite = () => {
    dispatch(toggleFavorite({ ...product }));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
  };

  return (
    <Fragment>
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
            <IconButton
              aria-label="favorite button"
              onClick={handleFavorite}
              sx={isFavorite ? { color: "red" } : { color: "gray" }}
            >
              <Favorite />
            </IconButton>
          </Box>
          <Button
            variant="outlined"
            endIcon={addedToCart ? <Check /> : <ShoppingCartOutlined />}
            disabled={addedToCart}
            fullWidth
            sx={{ margin: "0 !important" }}
            onClick={handleAddToCart}
          >
            {addedToCart ? "Added" : "Add to cart"}
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default Product;
