import { AiOutlineDelete } from "react-icons/ai";
import { FancyButton, Image, ImageDiv } from "../../styled-comps/commonComps";
import styled from "styled-components";

const Container = styled.div`
  margin-left: 2rem;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainDiv = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $justCont }) => $justCont || undefined};
  gap: 1rem;
  font-family: Roboto, sans-serif;
`;

const StyledBtn = styled.button`
  background: transparent;
  border: none;
  color: white;

  &:hover {
    color: var(--color-1);
  }
`;

const cards = [
  {
    name: "Adil Feroze",
    cardNum: "1234 **** **** ****",
    cardExpiry: "08/2027",
  },
];

const PaymentMethodsContent = () => {
  return (
    <Container>
      <HeaderDiv>
        <h1>Payment Methods</h1>
        <FancyButton $pad="0.8rem 2rem">Add New</FancyButton>
      </HeaderDiv>
      <MainDiv>
        {cards.map((card) => (
          <FlexDiv
            $justCont="space-between"
            style={{
              backgroundColor: "var(--color-5)",
              borderRadius: "5px",
              padding: "1rem",
            }}
          >
            <FlexDiv>
              <ImageDiv $width="30px">
                <Image
                  src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
                  alt="visa card logo"
                />
              </ImageDiv>
              <p>{card.name}</p>
            </FlexDiv>
            <FlexDiv>
              <p>{card.cardNum}</p>
              <p>{card.cardExpiry}</p>
            </FlexDiv>
            <StyledBtn>
              <AiOutlineDelete size={20} />
            </StyledBtn>
          </FlexDiv>
        ))}
      </MainDiv>
    </Container>
  );
};

export default PaymentMethodsContent;
