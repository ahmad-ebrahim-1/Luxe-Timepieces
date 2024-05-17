import { Box } from "@mui/material";
import Hero from "../components/home-page/Hero";
import Logos from "../components/home-page/Logos";
import Services from "../components/home-page/services/Services";

const Homepage = ({ isDark }) => {
  return (
    <Box component="section" sx={{ paddingInline: { xs: 2, xl: 0 } }}>
      <Hero isDark={isDark} />
      <Logos />
      <Services />
    </Box>
  );
};

export default Homepage;
