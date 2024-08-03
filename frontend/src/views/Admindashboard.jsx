import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  productOperationCompleted,
} from "../store/slices/products/productsSlice";
import {
  getUsers,
  usersOperationCompleted,
} from "../store/slices/users/usersSlice";
import { Box, Button, Stack, Typography } from "@mui/material";
import Loader from "../components/Loader";
import Errorpage from "../components/Errorpage";
import DashboardProduct from "../components/admin/DashboardProduct";
import DashboardUser from "../components/admin/DashboardUser";
import OperationAlert from "../components/operation-alert/OperationAlert";

const Admindashboard = () => {
  const [listType, setListType] = useState("products");

  const { user } = useSelector((state) => state.auth);

  const {
    products,
    isLoading: productsLoading,
    error: productsError,
    status: productStatus,
    operationError: productOperationError,
    operationLoading: productOperationLoading,
  } = useSelector((state) => state.products);
  const {
    users,
    isLoading: usersLoading,
    error: usersError,
    status: userStatus,
    operationError: userOperationError,
    operationLoading: userOperationLoading,
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (listType === "products") dispatch(getProducts());
  }, [dispatch, listType]);

  useEffect(() => {
    if (listType === "users") dispatch(getUsers());
  }, [dispatch, listType]);

  useEffect(() => {
    if (user?.userType !== "admin") {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  return (
    <Box component="div" sx={{ minHeight: "100dvh", mt: 11, p: 2 }}>
      <OperationAlert
        status={productStatus}
        error={productOperationError}
        messageOnSuccess="The product deleted successfuly"
        messageOnError="Oops! There was an error please try again later"
        completedAction={productOperationCompleted}
      />
      <OperationAlert
        status={userStatus}
        error={userOperationError}
        messageOnSuccess="The user deleted successfuly"
        messageOnError="Oops! There was an error please try again later"
        completedAction={usersOperationCompleted}
      />

      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Welcome to admin dashboard {user && user.first_name && user.first_name}{" "}
        !
      </Typography>
      <Stack direction={"row"} sx={{ mt: 4, borderBottom: "1px solid" }}>
        <Button
          variant="text"
          size="large"
          onClick={() => setListType("products")}
          sx={{
            borderRadius: "0px",
            borderBottom: listType === "products" ? "2.5px solid" : "",
            borderColor: listType === "products" ? "primary.main" : "",
          }}
        >
          Manage Products
        </Button>
        <Button
          variant="text"
          size="large"
          onClick={() => setListType("users")}
          sx={{
            borderRadius: "0px",
            borderBottom: listType === "users" ? "2.5px solid" : "",
            borderColor: listType === "users" ? "primary.main" : "",
          }}
        >
          Manage Users
        </Button>
      </Stack>

      <Box component="div" sx={{ mt: 4 }}>
        {listType === "products" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {productsLoading ? (
              <Loader normalHeight styles={{ mt: 2 }} />
            ) : productsError ? (
              <Errorpage normalHeight styles={{ mt: 2 }} />
            ) : (
              <>
                <Stack
                  direction="row"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Typography variant="h6">
                    Add, edit and delete products
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/admin-dashboard/add-product")}
                  >
                    Add new product
                  </Button>
                </Stack>
                {products.map((product) => (
                  <DashboardProduct product={product} key={product.id} />
                ))}
              </>
            )}
          </Box>
        )}

        {listType === "users" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {usersLoading ? (
              <Loader normalHeight styles={{ mt: 2 }} />
            ) : usersError ? (
              <Errorpage normalHeight styles={{ mt: 2 }} />
            ) : (
              <>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Remove users and edit users permissions
                </Typography>

                {users.map((user) => (
                  <DashboardUser user={user} key={user.id} />
                ))}
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Admindashboard;
