import Hero from "../components/home-page/Hero";
import Logos from "../components/home-page/Logos";

const Homepage = ({ isDark }) => {
  return (
    <section
      style={{ display: "grid", placeItems: "centers", overflow: "hidden" }}
    >
      <Hero isDark={isDark} />
      <Logos />
    </section>
  );
};

export default Homepage;
