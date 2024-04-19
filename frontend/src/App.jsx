import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import Navbar from "./components/Navbar";

import Homepage from "./views/Homepage";

function App() {
  const [isDark, setIsDark] = useState(false);

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#053B50",
      },
    },
    typography: {
      fontFamily: "'Nunito', 'Lexend', 'Roboto'",
    },
  });
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#64CCC5",
      },
    },
    typography: {
      fontFamily: "'Nunito', 'Lexend', 'Roboto'",
    },
  });

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <main>
          <Navbar isDark={isDark} setIsDark={setIsDark} />
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
