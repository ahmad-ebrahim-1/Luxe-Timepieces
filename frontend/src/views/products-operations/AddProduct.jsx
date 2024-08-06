import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ProductOperation } from "../../components/products/ProductOperation";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  productOperationCompleted,
} from "../../store/slices/products/productsSlice";
import OperationAlert from "../../components/operation-alert/OperationAlert";
import BackdropLoading from "../../components/backdrop-loading/BackdropLoading";

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);

  const { status, operationLoading, operationError } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userType !== "admin") {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  const initialValues = {
    title: "",
    brand: "",
    type: "",
    price: null,
    description: "",
    image_name: null,
  };

  const submitHandler = (values) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    dispatch(addProduct(formData));
  };

  return (
    <Box
      component="div"
      sx={{
        minHeight: "100dvh",
      }}
    >
      <OperationAlert
        status={status}
        error={operationError}
        messageOnSuccess="The product added successfuly"
        messageOnError="Oops! There was an error please try again later"
        completedAction={productOperationCompleted}
      />

      <BackdropLoading isLoading={operationLoading} />

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
          Add New Product
        </Typography>
      </Toolbar>

      <ProductOperation
        initialValues={initialValues}
        submitHandler={submitHandler}
        op="add"
      />
    </Box>
  );
};

export default AddProduct;
