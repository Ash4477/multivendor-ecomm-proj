import { Link } from "react-router-dom";
import { Image, ImageDiv } from "../../../styled-comps/commonComps";
import PriceDiv from "../PriceDiv/PriceDiv";
import Countdonwn from "./Countdown";
import styled from "styled-components";

const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const FancyButton = styled.button`
  margin-top: 1rem;
  font-weight: bold;
  background-color: black;
  color: white;
  font-family: Raleway, sans-serif;
  padding: 0.7rem 2rem;
  border-radius: 5px;
`;

const EventCard = () => {
  return (
    <Container>
      <ImageDiv style={{ flex: "1" }}>
        <Image
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          $rounded
        />
      </ImageDiv>
      <div style={{ flex: "2" }}>
        <Title>Iphone 14 Pro Max 8/256gb</Title>
        <p style={{ marginBottom: "1rem" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea porro
          eligendi necessitatibus error quod? Saepe quisquam nobis nisi maiores
          similique maxime laboriosam aliquid quae accusantium est, eaque sit
          quidem minus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Sapiente eum deserunt numquam, delectus rerum necessitatibus sequi
          recusandae non, nobis porro id neque quas atque cumque temporibus? Quo
          esse voluptate saepe!
        </p>
        <PriceDiv
          discount_price={999}
          price={1099}
          total_sell={120}
          fontSize={"2rem"}
        />
        <Countdonwn />
        <FlexDiv
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <FlexDiv>
            <FancyButton>See Details</FancyButton>
            <FancyButton>Buy Now </FancyButton>
          </FlexDiv>
          <Link to="" style={{ fontWeight: "bold" }}>
            See More Events -&gt;
          </Link>
        </FlexDiv>
      </div>
    </Container>
  );
};

export default EventCard;
