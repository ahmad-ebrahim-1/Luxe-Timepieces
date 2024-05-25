import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite, ShoppingCart } from "@mui/icons-material";

const Product = ({ product }) => {
  return (
    <Card variant="outlined">
      <CardMedia
        sx={{
          height: "250px",
          width: "250px",
          marginInline: "auto",
          aspectRatio: "3 / 4",
          objectFit: "cover",
          marginBottom: "1rem",
        }}
        image={product.url}
        product={product.title}
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBlock: "8px",
        }}
      >
        <Typography variant="subtitle1">{product.title}</Typography>
        <Typography variant="subtitle2">$ 100</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          component="div"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            width: "100%",
          }}
        >
          <Button variant="text" aria-label="Show more">
            Show details
          </Button>
          <IconButton aria-label="favorite button">
            <Favorite />
          </IconButton>
        </Box>
        <Button
          variant="outlined"
          endIcon={<ShoppingCart />}
          fullWidth
          sx={{ margin: "0 !important" }}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
