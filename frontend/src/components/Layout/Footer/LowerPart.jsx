import { ImageDiv, Image } from "../../../styled-comps/commonComps";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import {
  footerProductLinks,
  footerSupportLinks,
  footerCompanyLinks,
} from "../../../static/data";
import LogoImg from "../../../assets/images/logo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: var(--color-3);
  color: #c2c0c0;
  padding: 2rem 3rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FlexDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const FlexDivCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-family: Raleway, sans-serif;
`;

const Title2 = styled.h3`
  color: white;
`;

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const LowerPart = () => {
  return (
    <Container>
      <FlexDiv style={{ width: "100%" }}>
        <FlexDivCol style={{ color: "white" }}>
          <FlexDiv>
            <ImageDiv $height="50px" $width="100px">
              <Image src={LogoImg} alt="logo" />
            </ImageDiv>
            <Title>Zayro</Title>
          </FlexDiv>
          <p>
            The home and elements needed to
            <br />
            create beautiful products.
          </p>
          <FlexDiv>
            <AiFillFacebook size={25} />
            <AiOutlineTwitter size={25} />
            <AiFillInstagram size={25} />
            <AiFillYoutube size={25} />
          </FlexDiv>
        </FlexDivCol>
        <FlexDiv style={{ flex: "2", justifyContent: "space-evenly" }}>
          <FlexDivCol>
            <Title2>Company</Title2>
            <StyledUl>
              {footerCompanyLinks.map((data) => (
                <li key={data.name}>
                  <Link to={data.link}>{data.name}</Link>
                </li>
              ))}
            </StyledUl>
          </FlexDivCol>
          <FlexDivCol>
            <Title2>Shop</Title2>
            <StyledUl>
              {footerProductLinks.map((data) => (
                <li key={data.name}>
                  <Link to={data.link}>{data.name}</Link>
                </li>
              ))}
            </StyledUl>
          </FlexDivCol>
          <FlexDivCol>
            <Title2>Support</Title2>
            <StyledUl>
              {footerSupportLinks.map((data) => (
                <li key={data.name}>
                  <Link to={data.link}>{data.name}</Link>
                </li>
              ))}
            </StyledUl>
          </FlexDivCol>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <span>&copy; Adil Feroze. All rights reserved.</span>
        <span>Terms . Privacy Policy</span>
        <FlexDiv>
          <ImageDiv>
            <Image
              src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
              alt="partner credit cards"
            ></Image>
          </ImageDiv>
        </FlexDiv>
      </FlexDiv>
    </Container>
  );
};

export default LowerPart;
