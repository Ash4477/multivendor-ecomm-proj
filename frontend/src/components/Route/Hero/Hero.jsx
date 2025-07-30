import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-image: url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;

  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;

  padding: 0.5rem 2rem;
  border-radius: 10px;
`;

const H1 = styled.h1`
  font-size: 3rem;
  color: #3d3a3a;
`;

const Hero = () => {
  return (
    <Container>
      <MainDiv>
        <H1>
          Best Collection for <br /> Home Decoration
        </H1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          tenetur facere praesentium sunt laudantium nobis, rem quae, quis est
          aliquam dolorum sapiente voluptatem cupiditate vel. Dignissimos eos
          aliquid quidem eaque.
        </p>
        <StyledLink to="/products">Shop Now</StyledLink>
      </MainDiv>
    </Container>
  );
};

export default Hero;
