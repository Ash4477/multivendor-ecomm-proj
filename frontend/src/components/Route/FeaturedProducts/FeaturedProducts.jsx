import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 3rem;
  padding: 0 3rem;
`;

const ItemsDiv = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  grid-template-columns: repeat(5, 1fr);
  overflow-x: auto;
  gap: 1rem;
`;

const FeaturedProducts = () => {
  return (
    <Container>
      <h2>Featured Products</h2>
      <ItemsDiv>
        {productData.map((data, idx) => (
          <ProductCard data={data} key={idx} />
        ))}
      </ItemsDiv>
    </Container>
  );
};

export default FeaturedProducts;
