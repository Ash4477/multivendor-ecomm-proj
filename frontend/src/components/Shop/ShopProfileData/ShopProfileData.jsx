import styled from "styled-components";
import { useEffect, useState } from "react";
import { FancyButton } from "../../../styled-comps/commonComps";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../Route/ProductCard/ProductCard";
import Loader from "../../Layout/Loader/Loader";
import axios from "axios";
import { SERVER_URL } from "../../../server";
import { toast } from "react-toastify";

const Container = styled.div`
  flex: 3;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

const MainDiv = styled.div`
  overflow: auto;

  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  max-height: 113vh;
`;

const TabHeader = styled.h2`
  cursor: pointer;
  ${({ $active }) =>
    $active &&
    `
    color: var(--color-1);
  `};
`;

const ShopProfileData = ({ isOwner, shopId }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}/products/shop/${shopId}`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch(() => toast.error("Server is down"))
      .finally(() => setIsLoading(false));
  }, [shopId]);

  if (isLoading) return <Loader />;

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexDiv>
          <TabHeader $active={activeTab === 1} onClick={() => setActiveTab(1)}>
            Shop Products
          </TabHeader>
          <TabHeader $active={activeTab === 2} onClick={() => setActiveTab(2)}>
            Running Events
          </TabHeader>
          <TabHeader $active={activeTab === 3} onClick={() => setActiveTab(3)}>
            Shop Reviews
          </TabHeader>
        </FlexDiv>
        {isOwner && (
          <FancyButton
            $pad="0.5rem 1rem"
            $bRad="5px"
            onClick={() => navigate("/dashboard")}
          >
            Go To Dashboard
          </FancyButton>
        )}
      </div>

      {activeTab === 1 && (
        <MainDiv>
          {products.length <= 0 ? (
            <p>This shop has no products yet!</p>
          ) : (
            products.map((p, idx) => <ProductCard data={p} key={idx} />)
          )}
        </MainDiv>
      )}
    </Container>
  );
};

export default ShopProfileData;
