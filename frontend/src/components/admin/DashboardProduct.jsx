import { Box, Button, Typography } from "@mui/material";
import DeleteModal from "../delete-modal/DeleteModal";
import { useState } from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../store/slices/products/productsSlice";

const DashboardProduct = ({ product }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { operationLoading } = useSelector((state) => state.products);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        gap: 2,
        p: { xs: 2, md: 2.5 },
        bgcolor: "secondary.main",
        borderRadius: 1,
      }}
    >
      <DeleteModal
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        elementToDelete={product.title}
        deleteAction={handleDelete}
        isLoading={operationLoading}
      />
      <Box
        component="img"
        src={
          product &&
          product.image_name &&
          "http://127.0.0.1:8000" + product.image_name
        }
        alt="product image"
        sx={{ width: "125px", height: "125px", objectFit: "cover" }}
      />
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {product && product.title && product.title}
        </Typography>
        <Typography variant="subtitle2">
          Brand: {product && product.brand && product.brand}
        </Typography>
        <Typography variant="body2">
          Id: #{product && product.id && product.id}
        </Typography>
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography variant="subtitle1">
          Price: ${product && product.price && product.price}
        </Typography>
        <Typography variant="body2">
          Watch type: {product && product.type && product.type}
        </Typography>
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          endIcon={<ArrowForwardIcon />}
          onClick={() =>
            navigate("/products/details", {
              state: {
                product_id: product.id,
              },
            })
          }
        >
          Show details
        </Button>
        <Button
          variant="outlined"
          size="small"
          endIcon={<EditIcon />}
          onClick={() =>
            navigate("/admin-dashboard/edit-product", {
              state: {
                product_id: product.id,
              },
            })
          }
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          endIcon={<DeleteIcon />}
          onClick={() => setDeleteModalOpen(true)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardProduct;
