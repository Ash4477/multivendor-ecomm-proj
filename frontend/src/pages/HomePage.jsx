import { useState, useEffect } from "react";
import { SERVER_URL } from "../server";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Layout/Loader/Loader";
import Header from "../components/Layout/Header/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts";
import Events from "../components/Route/Events/Events";
import Sponsored from "../components/Route/Sponsored/Sponsored";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}/products`)
      .then((res) => setData(res.data.products))
      .catch((err) => toast.error(err.response?.data?.message || "Server down"))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header activeHeading={0} />
      <Hero />
      <Categories />
      <BestDeals data={data} />
      <Events />
      <FeaturedProducts data={data} />
      <Sponsored />
    </>
  );
};

export default HomePage;
