import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";

const Product = ({ product }) => {
  return (
    <Card variant="outlined">
      <CardMedia
        sx={{
          height: "250px",
          width: "250px",
          aspectRatio: "3 / 4",
          objectFit: "cover",
          marginBottom: "1rem",
        }}
        image={product.url}
        product={product.title}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.title}
        </Typography>
        <Divider />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button variant="text" aria-label="Show more">
          Show more
        </Button>
        <IconButton aria-label="favorite button">
          <Favorite />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
