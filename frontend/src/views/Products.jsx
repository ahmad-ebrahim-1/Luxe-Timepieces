import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../store/slices/products/productsSlice";
import { cartOperationCompleted } from "../store/slices/cart/cartSlice";
import { ArrowBack } from "@mui/icons-material";
import {
  Typography,
  Grid,
  Toolbar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Product from "../components/products/Product";
import Loader from "../components/Loader";
import Errorpage from "../components/Errorpage";
import OperationAlert from "../components/operation-alert/OperationAlert";

const Products = () => {
  const [resultsType, setResultsType] = useState("All");
  const navigate = useNavigate();

  const { error, isLoading, products } = useSelector((state) => state.products);
  const { status: cartStatus, operationError: cartOperationError } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const memoizedProducts = useMemo(() => {
    if (resultsType === "All") return products;

    return products.filter((product) => product.type === resultsType);
  }, [products, resultsType]);

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
          Featured Products
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: { xs: 100, sm: 120 } }}>
          <InputLabel id="filtring-select">type</InputLabel>
          <Select
            labelId="filtring-select"
            id="type-filtring-select"
            variant="standard"
            value={resultsType}
            onChange={(e) => setResultsType(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Basic">Basic</MenuItem>
            <MenuItem value="Smart">Smart</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>

      <Grid
        container
        spacing={4}
        sx={{
          marginBlock: "1rem",
          justifyContent: "center",
        }}
      >
        {memoizedProducts.map((product) => (
          <Grid item key={product.id}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Products;
