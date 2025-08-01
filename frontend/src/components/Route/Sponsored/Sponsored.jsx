import { Image, ImageDiv } from "../../../styled-comps/commonComps";
import styled from "styled-components";

const Container = styled.div`
  margin: 3rem 0;
  padding: 0 3rem;
`;

const InnerDiv = styled.div`
  background-color: var(--color-5);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Sponsored = () => {
  return (
    <Container>
      <InnerDiv>
        <ImageDiv $width="10rem" $height="">
          <Image
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt="Sony Logo"
          />
        </ImageDiv>
        <ImageDiv $width="10rem">
          <Image
            src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png"
            alt="Dell Logo"
          />
        </ImageDiv>
        <ImageDiv $width="10rem">
          <Image
            src="https://png.pngtree.com/thumb_back/fw800/background/20220113/pngtree-closeup-picture-of-the-apple-logo-on-the-back-of-a-macbook-pro-with-a-backlit-feature-and-brushed-aluminum-texture-photo-image_35058238.jpg"
            alt="Apple Logo"
          />
        </ImageDiv>
        <ImageDiv $width="10rem">
          <Image
            src="https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen-1024x376.jpg"
            alt="Microsoft Logo"
          />
        </ImageDiv>
        <ImageDiv $width="10rem">
          <Image
            src="https://www.lg.com/content/dam/lge/global/our-brand/src/mocks/bs0009/download-detail--logo-02.png"
            alt="LG Logo"
          />
        </ImageDiv>
      </InnerDiv>
    </Container>
  );
};

export default Sponsored;
