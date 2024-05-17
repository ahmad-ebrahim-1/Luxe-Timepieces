import Hero from "../components/home-page/Hero";

const Homepage = ({ isDark }) => {
  return (
    <section style={{ display: "grid", placeItems: "centers" }}>
      <Hero isDark={isDark} />
    </section>
  );
};

export default Homepage;
