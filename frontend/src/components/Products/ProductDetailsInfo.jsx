import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, ImageDiv } from "../../styled-comps/commonComps";
import styled from "styled-components";
import { BACKEND_URL } from "../../server";

const Container = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: var(--color-5);
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
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
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio,
            consequuntur error voluptatibus quia itaque sed corrupti rerum
            voluptate rem at vitae minima a dolore quis nemo. Nihil perferendis
            tempora magni?Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. A odio tempora, voluptas vel, illum consequuntur quas dolores
            esse adipisci magnam voluptatum magni tempore, nobis pariatur
            necessitatibus soluta dolor non in. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Perferendis dolore vitae dolor. Nam
            quidem velit aperiam, ex quis totam aliquid modi consequuntur
            facilis nostrum a voluptates est praesentium. Expedita, eos.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio,
            consequuntur error voluptatibus quia itaque sed corrupti rerum
            voluptate rem at vitae minima a dolore quis nemo. Nihil perferendis
            tempora magni?Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. A odio tempora, voluptas vel, illum consequuntur quas dolores
            esse adipisci magnam voluptatum magni tempore, nobis pariatur
            necessitatibus soluta dolor non in. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Perferendis dolore vitae dolor. Nam
            quidem velit aperiam, ex quis totam aliquid modi consequuntur
            facilis nostrum a voluptates est praesentium. Expedita, eos.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio,
            consequuntur error voluptatibus quia itaque sed corrupti rerum
            voluptate rem at vitae minima a dolore quis nemo. Nihil perferendis
            tempora magni?Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. A odio tempora, voluptas vel, illum consequuntur quas dolores
            esse adipisci magnam voluptatum magni tempore, nobis pariatur
            necessitatibus soluta dolor non in. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Perferendis dolore vitae dolor. Nam
            quidem velit aperiam, ex quis totam aliquid modi consequuntur
            facilis nostrum a voluptates est praesentium. Expedita, eos.
          </p>
        </InnerDiv>
      ) : activeTab === 2 ? (
        <InnerDiv>
          <p>No reviews yet!</p>
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
                    ? `(${data.shop.ratings}) Ratings`
                    : "No Ratings Yet"}
                </h5>
              </InnerDiv>
            </FlexDiv>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              perspiciatis dignissimos dolore velit possimus incidunt atque iste
              repudiandae officia illo. Commodi dolor soluta, ex similique nobis
              maiores odit necessitatibus ...
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
              <b>Total Products:</b> 1,221
            </p>
            <p>
              <b>Total Reviews:</b> 131
            </p>
            <FancyButton onClick={() => navigate(`/shop/${data.shopId}`)}>
              Visit Shop
            </FancyButton>
          </InnerDiv>
        </FlexDiv>
      )}
    </Container>
  );
};

export default ProductDetailsInfo;
