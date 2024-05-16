import { Favorite } from "@mui/icons-material";
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

const CustomCard = ({ product }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: "300px",
        marginTop: "1rem",
      }}
    >
      <CardMedia
        sx={{
          height: "250px",
          width: "250px",
          aspectRatio: "3 / 4",
          objectFit: "cover",
          margin: "20px",
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
        <Button aria-label="Show more">Show more</Button>
        <IconButton aria-label="favorite button">
          <Favorite />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
