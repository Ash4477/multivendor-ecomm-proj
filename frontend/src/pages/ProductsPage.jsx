import styled from "styled-components";
import Header from "../components/Layout/Header/Header";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Loader from "../components/Layout/Loader/Loader";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../server";
import { toast } from "react-toastify";
import axios from "axios";

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

const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${SERVER_URL}/products${
          categoryData ? `?category=${categoryData}` : ""
        }`
      )
      .then((res) => setData(res.data.products))
      .catch(() => toast.error("Server down"))
      .finally(() => setIsLoading(false));

    window.scrollTo(0, 0);
  }, [categoryData]);

  if (isLoading) return <Loader />;

  return (
    <>
      {" "}
      <Header activeHeading={2} />
      {data && data.length === 0 ? (
        <H1>No Products Found</H1>
      ) : (
        <>
          <h1 style={{ paddingTop: "1rem", paddingLeft: "3rem" }}>
            {categoryData
              ? `Products in category: ${categoryData}`
              : "All Products"}
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

export default ProductsPage;
