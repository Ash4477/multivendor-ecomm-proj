import styled from "styled-components";
import Header from "../components/Layout/Header/Header";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { productData } from "../static/data";

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

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(d);

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {" "}
      <Header activeHeading={1} />
      {data && data.length === 0 ? (
        <H1>No Products Found</H1>
      ) : (
        <Content>
          {data.map((d, idx) => (
            <ProductCard data={d} key={idx} />
          ))}
        </Content>
      )}
    </>
  );
};

export default BestSellingPage;
