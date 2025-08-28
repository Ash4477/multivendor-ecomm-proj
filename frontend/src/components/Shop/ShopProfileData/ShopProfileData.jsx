import styled from "styled-components";
import { useEffect, useState } from "react";
import { FancyButton } from "../../../styled-comps/commonComps";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopEvents } from "../../../redux/actions/events";
import { getAllShopProducts } from "../../../redux/actions/product";
import { ImageDiv, Image } from "../../../styled-comps/commonComps";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import EventCard from "../../Route/Events/EventCard";
import ProductCard from "../../Route/ProductCard/ProductCard";
import Loader from "../../Layout/Loader/Loader";

const Container = styled.div`
  flex: 3;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ $jc }) => $jc || undefined};
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
const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $jc }) => $jc || "center"};
  align-items: ${({ $ai }) => $ai || "start"};
  gap: 0.5rem;
`;

const ShopProfileData = ({ isOwner, shopId }) => {
  const [activeTab, setActiveTab] = useState(1);
  const { products, loading } = useSelector((state) => state.product);
  const { events, loading: loading2 } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (shopId) {
      dispatch(getAllShopProducts(shopId));
      dispatch(getAllShopEvents(shopId));
    }
  }, [shopId, dispatch]);

  if (loading || loading2) return <Loader />;

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

      {activeTab === 2 && (
        <MainDiv>
          {events.map((ev) => (
            <EventCard data={ev} key={ev._id} />
          ))}
        </MainDiv>
      )}

      {activeTab === 3 && (
        <MainDiv style={{ gap: 0 }}>
          {products.map((product) => {
            return product.reviews.map((rev, i) => (
              <FlexDiv
                $jc="start"
                $ai="space-between"
                key={i}
                style={{
                  width: "100%",
                  gap: "1rem",
                  borderTop: "1px solid grey",
                  padding: "0.5rem 0",
                }}
              >
                <Col $ai="center" style={{ minWidth: "80px" }}>
                  <ImageDiv $rounded $width="50px" $height="50px">
                    <Image
                      src={`${BACKEND_URL}/${rev.user?.avatar}`}
                      alt="user profile image"
                    />
                  </ImageDiv>
                  <p>{rev.user?.name}</p>
                </Col>
                <Col style={{ flex: "1" }}>
                  <FlexDiv $jc="start" style={{ gap: 0 }}>
                    {[1, 2, 3, 4, 5].map((num, idx) =>
                      num <= rev.rating ? (
                        <AiFillStar
                          key={idx}
                          size={25}
                          color="rgb(246,186,0)"
                        />
                      ) : (
                        <AiOutlineStar
                          key={idx}
                          size={25}
                          color="rgb(246,186,0)"
                        />
                      )
                    )}
                  </FlexDiv>
                  <p>{rev.comment}</p>
                </Col>
              </FlexDiv>
            ));
          })}
        </MainDiv>
      )}
    </Container>
  );
};

export default ShopProfileData;
