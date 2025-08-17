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

const FeaturedProducts = ({ data }) => {
  return (
    <Container>
      <h2>Featured Products</h2>
      <ItemsDiv>
        {data.map((prod, idx) => (
          <ProductCard data={prod} key={idx} />
        ))}
      </ItemsDiv>
    </Container>
  );
};

export default FeaturedProducts;
