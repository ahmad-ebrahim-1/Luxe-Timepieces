import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import store from "./store";
import { Provider } from "react-redux";

import Homepage from "./views/Homepage";
import Products from "./views/Products";
import Offers from "./views/Offers";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [isDark, setIsDark] = useState(false);

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
    <Provider store={store}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <main>
          <Navbar isDark={isDark} setIsDark={setIsDark} />
          <Routes>
            <Route path="/" element={<Homepage isDark={isDark} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </main>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
