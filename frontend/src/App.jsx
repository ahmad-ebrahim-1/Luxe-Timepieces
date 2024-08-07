import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import {
  getAuthenticatedUser,
  authOperationCompleted,
} from "./store/slices/auth/authSlice";
import { getFavorites } from "./store/slices/favs/favsSlice";
import Cookies from "universal-cookie";

import Homepage from "./views/Homepage";
import Products from "./views/Products";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favs from "./views/Favs";
import OperationAlert from "./components/operation-alert/OperationAlert";
import { getCartItems } from "./store/slices/cart/cartSlice";
import ProductDetails from "./views/ProductDetails";
import Admindashboard from "./views/Admindashboard";
import AddProduct from "./views/products-operations/AddProduct";
import EditProduct from "./views/products-operations/EditProduct";

function App() {
  const [isDark, setIsDark] = useState(false);

  const { user, error, status, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const cookie = new Cookies();
  const token = cookie.get("access_token");

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#16697A",
      },
      secondary: {
        main: "#DAD9D5",
      },
      background: {
        default: "#F0EFEB",
      },
    },
    typography: {
      fontFamily: "'Outfit', 'Roboto'",
    },
  });
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#AEE6E6",
      },
      secondary: {
        main: "#222222",
      },
      background: {
        default: "#292929",
      },
    },
    typography: {
      fontFamily: "'Outfit', 'Roboto'",
    },
  });

  useEffect(() => {
    if (!user && token) {
      dispatch(getAuthenticatedUser());
    }
  }, [user, token]);

  useEffect(() => {
    if (user) {
      dispatch(getFavorites());
      dispatch(getCartItems());
    }
  }, [user]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <main>
        <OperationAlert
          status={status}
          error={error}
          messageOnSuccess={message}
          messageOnError={message}
          completedAction={authOperationCompleted}
        />

        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <Routes>
          <Route path="/" element={<Homepage isDark={isDark} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorites" element={<Favs />} />
          <Route path="/products/details" element={<ProductDetails />} />
          <Route path="/admin-dashboard" element={<Admindashboard />} />
          <Route path="/admin-dashboard/add-product" element={<AddProduct />} />
          <Route
            path="/admin-dashboard/edit-product"
            element={<EditProduct />}
          />
        </Routes>
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
