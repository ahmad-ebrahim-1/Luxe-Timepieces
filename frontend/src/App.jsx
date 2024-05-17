import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Homepage from "./views/Homepage";
import Products from "./views/Products";
import Offers from "./views/Offers";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Navbar from "./components/Navbar";

function App() {
  const [isDark, setIsDark] = useState(false);

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#16697A",
      },
      secondary: {
        main: "#B7B7A4",
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
        main: "#B7B7A4",
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
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <main
          style={{ display: "grid", placeItems: "center", overflow: "hidden" }}
        >
          <Navbar isDark={isDark} setIsDark={setIsDark} />
          <Routes>
            <Route path="/" element={<Homepage isDark={isDark} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
