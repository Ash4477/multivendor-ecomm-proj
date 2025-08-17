import { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import styled from "styled-components";
import axios from "axios";
import { SERVER_URL } from "../../server";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader/Loader";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}/products?category=${category}`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch(() => toast.error("Server is down"))
      .finally(() => setIsLoading(false));
  }, [category]);

  if (isLoading) return <Loader />;

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
