import Header from "../components/Layout/Header/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts";
import Events from "../components/Route/Events/Events";
import Sponsored from "../components/Route/Sponsored/Sponsored";
import Footer from "../components/Layout/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header activeHeading={0} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
    </>
  );
};

export default HomePage;
