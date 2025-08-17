import styled from "styled-components";
import Header from "../components/Layout/Header/Header";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../server";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Layout/Loader/Loader";

const H1 = styled.h1`
  min-height: 70vh;
  width: 100%;
  text-align: center;
  padding: 3rem;
`;

const Content = styled.div`
  padding: 2rem 3rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  place-content: center;
  gap: 1rem;
`;

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}/products`)
      .then((res) => {
        const products = res.data.products;
        products.sort((a, b) => b.sold_out - a.sold_out);
        setData(products);
      })
      .catch(() => toast.error("Server down"))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header activeHeading={1} />
      {data && data.length === 0 ? (
        <H1>No Products Found</H1>
      ) : (
        <>
          <h1 style={{ paddingTop: "1rem", paddingLeft: "3rem" }}>
            Best Selling Products
          </h1>
          <Content>
            {data.map((d, idx) => (
              <ProductCard data={d} key={idx} />
            ))}
          </Content>
        </>
      )}
    </>
  );
};

export default BestSellingPage;
