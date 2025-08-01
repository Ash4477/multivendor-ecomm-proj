import { useState, useEffect } from "react";
import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 3rem;
`;

const ItemsDiv = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  overflow-x: auto;
  gap: 1rem;
`;

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      productData &&
        productData.sort((a, b) => b.total_sell - a.total_sell).slice(0, 5)
    );
  }, []);

  return (
    <Container>
      <h2>Best Deals</h2>
      <ItemsDiv>
        {data.map((data, idx) => (
          <ProductCard data={data} key={idx} />
        ))}
      </ItemsDiv>
    </Container>
  );
};

export default BestDeals;
