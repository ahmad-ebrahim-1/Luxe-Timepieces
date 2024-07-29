import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Typography, Grid, Toolbar, IconButton } from "@mui/material";
import Product from "../components/products/Product";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../store/slices/favs/favsSlice";
import { cartOperationCompleted } from "../store/slices/cart/cartSlice";
import Loader from "../components/Loader";
import Errorpage from "../components/Errorpage";
import OperationAlert from "../components/operation-alert/OperationAlert";

const Favs = () => {
  const navigate = useNavigate();

  const { error, isLoading, favs } = useSelector((state) => state.favs);
  const { status: cartStatus, operationError: cartOperationError } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  if (error) return <Errorpage />;

  return (
    <>
      <OperationAlert
        status={cartStatus}
        error={cartOperationError}
        messageOnSuccess="The operation was completed successfuly"
        messageOnError="There was an error, please try again later"
        completedAction={cartOperationCompleted}
      />

      <Toolbar
        sx={{
          pt: { xs: "5rem", sm: "6rem" },
          paddingInline: { xs: "0", sm: "16px" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label="arrow back button"
          onClick={() => navigate(-1)}
          size="large"
        >
          <ArrowBack />
        </IconButton>

        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.25rem", sm: "h5.fontSize" },
          }}
        >
          Your Favorites
        </Typography>
      </Toolbar>

      <Grid
        container
        spacing={4}
        sx={{
          marginBlock: "1rem",
          justifyContent: "center",
        }}
      >
        {favs.map((product, index) => (
          <Grid item key={index}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Favs;
