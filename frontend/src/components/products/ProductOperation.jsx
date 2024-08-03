import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ImageUploader from "../image-uploader/ImageUploader";

const productSchema = yup.object().shape({
  title: yup.string().required("Product title is required"),
  brand: yup.string().required("Product brand is required"),
  type: yup.string().required("Product type is required"),
  price: yup.number().required("Product price is required"),
  description: yup.string().required("Product description is required"),
  image_name: yup.mixed().nullable(),
});

export const ProductOperation = ({ initialValues, submitHandler, op }) => {
  return (
    <Box
      component="div"
      sx={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        mt: 3.5,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={productSchema}
        onSubmit={submitHandler}
      >
        {(props) => (
          <Form>
            <Box
              component="div"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                minWidth: { xs: "100%", sm: "550px" },
                minHeight: "400px",
                padding: "2rem",
                bgcolor: "secondary.main",
              }}
            >
              <TextField
                name="title"
                id="title"
                label="Title *"
                variant="filled"
                fullWidth
                onChange={(event) => {
                  props.values.title = event.target.value;
                }}
                defaultValue={props.values?.title && props.values.title}
                error={!!props.errors.title}
                helperText={props.errors.title ? props.errors.title : ""}
              />

              <TextField
                name="brand"
                id="brand"
                label="Brand *"
                variant="filled"
                fullWidth
                onChange={(event) => {
                  props.values.brand = event.target.value;
                }}
                defaultValue={props.values?.brand && props.values.brand}
                error={!!props.errors.brand}
                helperText={props.errors.brand ? props.errors.brand : ""}
              />

              <FormControl
                variant="filled"
                sx={{ minWidth: "100%" }}
                error={!!props.errors.type}
              >
                <InputLabel id="type-select">Type *</InputLabel>
                <Select
                  name="type"
                  labelId="type-select"
                  id="type-select"
                  variant="filled"
                  defaultValue={props.values?.type && props.values.type}
                  onChange={(e) => (props.values.type = e.target.value)}
                >
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Smart">Smart</MenuItem>
                </Select>
                <Typography
                  color="error"
                  sx={{ mt: 0.5, ml: 2, fontSize: "12px" }}
                >
                  {props.errors.type ? props.errors.type : ""}
                </Typography>
              </FormControl>

              <TextField
                type="number"
                name="price"
                id="price"
                label="Price *"
                variant="filled"
                fullWidth
                onChange={(event) => {
                  props.values.price = event.target.value;
                }}
                defaultValue={props.values?.price && props.values.price}
                error={!!props.errors.price}
                helperText={props.errors.price ? props.errors.price : ""}
              />

              <TextField
                multiline
                minRows={2}
                name="description"
                id="description"
                label="Description *"
                variant="filled"
                fullWidth
                onChange={(event) => {
                  props.values.description = event.target.value;
                }}
                defaultValue={
                  props.values?.description && props.values.description
                }
                error={!!props.errors.description}
                helperText={
                  props.errors.description ? props.errors.description : ""
                }
              />

              <ImageUploader
                formikProps={props}
                defaultImage={props.values?.image_name}
              />

              <Button variant="contained" type="submit" fullWidth size="large">
                {op === "add" ? "Add product" : "Edit product"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
