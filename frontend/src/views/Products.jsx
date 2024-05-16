import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowBack } from "@mui/icons-material";

import FullScreen from "../components/FullScreen";
import CustomCard from "../components/CustomCard";
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

import image1 from "../assets/items/watch1.jpg";
import image2 from "../assets/items/watch2.jpg";
import image3 from "../assets/items/watch3.jpg";

const products = [
  { url: image1, title: "Galaxy" },
  { url: image2, title: "Galaxy" },
  { url: image3, title: "Galaxy" },
  { url: image1, title: "Galaxy" },
  { url: image2, title: "Galaxy" },
  { url: image3, title: "Galaxy" },
];

const Products = () => {
  const [resultsType, setResultsType] = useState("basic");

  const navigate = useNavigate();

  return (
    <FullScreen>
      <Toolbar
        sx={{
          pt: { xs: "5rem", sm: "6rem" },
          paddingInline: { xs: "0", sm: "16px" },
          justifyContent: "space-between",
          alignItems: "end",
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
            fontFamily: "Lexend",
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
          paddingBlock: "1rem",
          justifyContent: "center",
        }}
      >
        {products.map((product, index) => (
          <Grid item key={index}>
            <CustomCard product={product} />
          </Grid>
        ))}
      </Grid>
    </FullScreen>
  );
};

export default Products;
