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
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { getCartItems } from "./store/slices/cart/cartSlice";
import ProductDetails from "./views/ProductDetails";

function App() {
  const [isDark, setIsDark] = useState(false);

  const { user, error, status, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const cookie = new Cookies();
  const token = cookie.get("access_token");

  useEffect(() => {
    if (!user && token) {
      dispatch(getAuthenticatedUser());
    }
  }, [user, token]);

  useEffect(() => {
    // fetch user favorites and baskete to update the UI
    dispatch(getFavorites());
    dispatch(getCartItems());
  }, [user]);

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
        main: "#454545",
      },
      background: {
        default: "#292929",
      },
    },
    typography: {
      fontFamily: "'Outfit', 'Roboto'",
    },
  });

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
        </Routes>
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
