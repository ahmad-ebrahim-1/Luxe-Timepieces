import { Box, Typography } from "@mui/material";
import React from "react";
import Product from "../products/Product";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { products } from "../../utils/products";

const NewArrivals = () => {
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
      </Box>
    </Box>
  );
};

export default NewArrivals;
