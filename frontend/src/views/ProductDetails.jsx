import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../store/slices/products/productsSlice";
import {
  addToCart,
  cartOperationCompleted,
} from "../store/slices/cart/cartSlice";
import { toggleFavorite } from "../store/slices/favs/favsSlice";

import Loader from "../components/Loader";
import Errorpage from "../components/Errorpage";
import OperationAlert from "../components/operation-alert/OperationAlert";
import { Box, Button, Typography } from "@mui/material";
import BackdropLoading from "../components/backdrop-loading/BackdropLoading";
import DateRangeIcon from "@mui/icons-material/DateRange";

function getLocalDate(date) {
  const localeDate = new Date(date);

  return localeDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ProductDetails = () => {
  const location = useLocation();
  const { product_id } = location.state;

  const [inCart, setInCart] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const { productDetails, error, isLoading } = useSelector(
    (state) => state.products
  );
  const {
    items,
    operationLoading: cartLoading,
    operationError: cartError,
    status: cartStatus,
  } = useSelector((state) => state.cart);
  const { favs, operationLoading } = useSelector((state) => state.favs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product_id) dispatch(getProductDetails(product_id));
  }, [dispatch, product_id]);

  useEffect(() => {
    let added;
    if (productDetails && productDetails.id)
      added = items.find((item) => item.product.id === productDetails.id);

    if (added) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [items, productDetails?.id]);

  useEffect(() => {
    let added;
    if (productDetails && productDetails.id)
      added = favs.find((fav) => fav.id === productDetails.id);

    if (added) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [favs, productDetails?.id]);

  if (isLoading) return <Loader />;

  if (error) return <Errorpage />;

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: { xs: "column", md: "row" },
        px: { xs: 2, sm: 0 },
      }}
    >
      <OperationAlert
        status={cartStatus}
        error={cartError}
        messageOnSuccess="Added to cart successfuly"
        messageOnError="Oops! There was error please try again later"
        completedAction={cartOperationCompleted}
      />

      <BackdropLoading isLoading={cartLoading || operationLoading} />

      <Box
        component="img"
        src={
          productDetails &&
          productDetails.image_name &&
          "http://127.0.0.1:8000" + productDetails.image_name
        }
        alt="product image"
        sx={{
          maxWidth: "400px",
          width: { xs: "100%", sm: "350px" },
          objectFit: "cover",
          mt: { xs: 11, md: 0 },
        }}
      />
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxWidth: { xs: "100%", sm: "400px" },
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {productDetails && productDetails.title && productDetails.title}
        </Typography>
        <Typography variant="h6" sx={{ color: "primary.main" }}>
          {productDetails && productDetails.brand && productDetails.brand}
          <Box
            component="span"
            sx={{
              fontSize: "14px",
              ml: 1,
              px: 1,
              py: 0.25,
              borderColor: "primary.main",
              border: "1px solid",
              borderRadius: "16px",
            }}
          >
            {productDetails &&
              productDetails.type &&
              `${productDetails.type} watch`}
          </Box>
        </Typography>
        <Typography variant="h6">
          {productDetails &&
            productDetails.price &&
            `$ ${productDetails.price}`}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1.5 }}>
          {productDetails &&
            productDetails.description &&
            productDetails.description}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          disabled={inCart}
          onClick={() => dispatch(addToCart(productDetails))}
        >
          {inCart ? "Added to cart" : "Add to cart"}
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 0.5 }}
          onClick={() => dispatch(toggleFavorite(productDetails))}
        >
          {isFav ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
        {/* {productDetails && productDetails.created_at && (
          <Box
            component="div"
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography variant="body2">Release date:</Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <DateRangeIcon fontSize="30px" />
              {getLocalDate(productDetails.created_at)}
            </Typography>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default ProductDetails;
