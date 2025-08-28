import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, ImageDiv } from "../../styled-comps/commonComps";
import styled from "styled-components";
import { BACKEND_URL } from "../../server";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Container = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: var(--color-5);
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: ${({ $jc }) => $jc || "space-around"};
  align-items: ${({ $ai }) => $ai || "center"};
  gap: 0.5rem;
`;

const TabText = styled.h3`
  cursor: pointer;
  font-size: 1.2rem;
  border-bottom: ${({ $active }) =>
    $active ? "2px solid var(--color-1)" : "2px solid transparent"};
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const FancyButton = styled.button`
  font-weight: bold;
  background-color: black;
  color: white;
  font-family: Raleway, sans-serif;
  padding: 0.3rem 1rem;
  border: none;
  border-radius: 5px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $jc }) => $jc || "center"};
  align-items: ${({ $ai }) => $ai || "start"};
  gap: 0.5rem;
`;

const ProductDetailsInfo = ({ data }) => {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();
  return (
    <Container>
      <FlexDiv>
        <TabText $active={activeTab === 1} onClick={() => setActiveTab(1)}>
          Product Details
        </TabText>
        <TabText $active={activeTab === 2} onClick={() => setActiveTab(2)}>
          Product Reviews
        </TabText>
        <TabText $active={activeTab === 3} onClick={() => setActiveTab(3)}>
          Seller Details
        </TabText>
      </FlexDiv>
      {activeTab === 1 ? (
        <InnerDiv>
          <p>{data.description}</p>
        </InnerDiv>
      ) : activeTab === 2 ? (
        <InnerDiv>
          {data.reviews && data.reviews.length === 0 ? (
            <p>No reviews yet!</p>
          ) : (
            data.reviews.map((rev, i) => (
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
                  <p>{rev.comment}</p>
                  <FlexDiv $jc="start">
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
                </Col>
              </FlexDiv>
            ))
          )}
        </InnerDiv>
      ) : (
        <FlexDiv
          style={{
            padding: "1rem",
            justifyContent: "space-between",
          }}
        >
          <InnerDiv style={{ alignItems: "flex-start" }}>
            <FlexDiv>
              <ImageDiv $height="50px" $width="50px" $rounded>
                <Image
                  src={`${BACKEND_URL}/${data.shop.avatar}`}
                  alt={data.shop.name}
                  $rounded
                  $imgFill
                />
              </ImageDiv>
              <InnerDiv>
                <h4>{data.shop.name}</h4>
                <h5>
                  {data.shop.ratings
                    ? `(${data.shop.rating}) Ratings`
                    : "No Ratings Yet"}
                </h5>
              </InnerDiv>
            </FlexDiv>
            <p>
              {data.shop.description ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, laboriosam! Dolor, eum. Molestias et porro animi ullam dolorum officia, totam hic corporis ducimus eaque ipsum voluptate veritatis eos, consequuntur perspiciatis!"}
            </p>
          </InnerDiv>
          <InnerDiv
            style={{
              minWidth: "200px",
              fontFamily: "Roboto, sans-serif",
              fontSize: "0.9rem",
              alignItems: "flex-start",
              gap: "0.5rem",
            }}
          >
            <p>
              <b>Joined on:</b> {data.shop.createdAt.slice(0, 10)}
            </p>
            <p>
              <b>Total Products:</b> {data.shop.totalProducts}
            </p>
            <p>
              <b>Total Reviews:</b> {data?.reviews.length || 0}
            </p>
            <FancyButton onClick={() => navigate(`/shop/${data.shop._id}`)}>
              Visit Shop
            </FancyButton>
          </InnerDiv>
        </FlexDiv>
      )}
    </Container>
  );
};

export default ProductDetailsInfo;
