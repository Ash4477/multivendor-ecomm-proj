import styled, { keyframes } from "styled-components";
import { ImageDiv as ImgDiv, Image } from "../../styled-comps/commonComps";
import Spinner from "../../assets/images/spinner.png";

const spinningAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  margin: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageDiv = styled(ImgDiv)`
  animation: ${spinningAnimation} 2s linear infinite;
`;

const PaymentLoader = ({ width = "50px" }) => {
  return (
    <Container>
      <ImageDiv $width={width}>
        <Image src={Spinner} alt="loading" />
      </ImageDiv>
      <h1>Processing Payment</h1>
    </Container>
  );
};

export default PaymentLoader;
