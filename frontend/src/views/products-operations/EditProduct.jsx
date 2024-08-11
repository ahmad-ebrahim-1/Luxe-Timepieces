import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ProductOperation } from "../../components/products/ProductOperation";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  getProductDetails,
  productOperationCompleted,
} from "../../store/slices/products/productsSlice";
import Loader from "../../components/Loader";
import Errorpage from "../../components/Errorpage";
import { ArrowBack } from "@mui/icons-material";
import OperationAlert from "../../components/operation-alert/OperationAlert";
import BackdropLoading from "../../components/backdrop-loading/BackdropLoading";

const EditProduct = () => {
  const location = useLocation();
  const { product_id } = location.state;

  const { user } = useSelector((state) => state.auth);
  const {
    productDetails,
    isLoading,
    error,
    status,
    operationError,
    operationLoading,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userType !== "admin") {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  useEffect(() => {
    if (product_id) dispatch(getProductDetails(product_id));
  }, [dispatch, product_id]);

  let initialValues;
  if (productDetails)
    initialValues = {
      title: productDetails?.title ? productDetails.title : "",
      brand: productDetails?.brand ? productDetails.brand : "",
      type: productDetails?.type ? productDetails.type : "",
      price: productDetails?.price ? productDetails.price : null,
      description: productDetails?.description
        ? productDetails.description
        : "",
      image_name: productDetails?.image_name ? productDetails.image_name : null,
    };

  const submitHandler = (values) => {
    const data = values;

    dispatch(editProduct({ id: productDetails.id, data: data }));
  };

  if (isLoading) return <Loader />;

  if (error) return <Errorpage />;

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
        messageOnSuccess="The product edited successfuly"
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
          Edit Product
        </Typography>
      </Toolbar>

      <ProductOperation
        initialValues={initialValues}
        submitHandler={submitHandler}
        op="edit"
      />
    </Box>
  );
};

export default EditProduct;
