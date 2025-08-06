import { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem 3rem;
`;
const StyledDiv = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const RelatedProducts = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productList =
      productData && productData.filter((prod) => prod.category === category);

    setProducts(productList);
  }, [category]);

  return (
    <Container>
      <h2>Related Products</h2>
      <StyledDiv>
        {products.length !== 0 ? (
          products.map((data, idx) => <ProductCard key={idx} data={data} />)
        ) : (
          <p>No suggestions at the moment</p>
        )}
      </StyledDiv>
    </Container>
  );
};

export default RelatedProducts;
