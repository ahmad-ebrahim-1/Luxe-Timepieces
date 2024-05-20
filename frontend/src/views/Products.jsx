import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

//TMP
import image1 from "../assets/images/watch1.jpg";
import image2 from "../assets/images/watch2.jpg";
import image3 from "../assets/images/watch3.jpg";

export const products = [
  { url: image1, title: "Watch" },
  { url: image2, title: "Watch" },
  { url: image3, title: "Watch" },
  { url: image1, title: "Watch" },
  { url: image2, title: "Watch" },
  { url: image3, title: "Watch" },
];

const Products = () => {
  const [resultsType, setResultsType] = useState("basic");

  const navigate = useNavigate();

  return (
    <>
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
            <MenuItem value="basic">Basic</MenuItem>
            <MenuItem value="smart">Smart</MenuItem>
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
        {products.map((product, index) => (
          <Grid item key={index}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Products;
