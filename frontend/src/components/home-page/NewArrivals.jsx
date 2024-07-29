import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  productOperationCompleted,
} from "../../store/slices/products/productsSlice";

import OperationAlert from "../operation-alert/OperationAlert";
import Product from "../products/Product";
import { Error } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Box, CircularProgress, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";

const NewArrivals = () => {
  const { products, isLoading, error, status, operationError } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <OperationAlert
        status={status}
        error={operationError}
        messageOnSuccess="The operation was completed successfuly"
        messageOnError="There was an error, please try again later"
        completedAction={productOperationCompleted}
      />

      <Typography
        variant="h2"
        sx={{
          maxWidth: "900px",
          textAlign: "center",
          fontWeight: "700",
          fontSize: {
            xs: "h5.fontSize",
            sm: "h3.fontSize",
          },
        }}
      >
        Discover our Exquisite New{` `}
        <Box component="span" sx={{ color: "primary.main" }}>
          Watch Collection
        </Box>{" "}
      </Typography>

      <Box
        component="div"
        sx={{
          maxWidth: "100%",
          paddingInline: { xs: 0, sm: 0.5, md: 1, lg: 7 },
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Box component="div" sx={{ textAlign: "center" }}>
            <Error />
            <Typography variant="h6">
              Oops! There was an error fetching the products
            </Typography>
            <Typography variant="h6" sx={{ mt: 1.6 }}>
              Please try again later...
            </Typography>
          </Box>
        ) : (
          <Swiper
            // loop={true}
            autoplay={{
              delay: 2500,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                spaceBetween: 0,
                slidesPerView: 1,
              },
              600: {
                spaceBetween: 20,
                slidesPerView: 2,
              },
              900: {
                spaceBetween: 30,
                slidesPerView: 3,
              },
              1200: {
                spaceBetween: 40,
                slidesPerView: 4,
              },
            }}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {products.map((p, index) => (
              <SwiperSlide key={index}>
                <Product product={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  );
};

export default NewArrivals;
