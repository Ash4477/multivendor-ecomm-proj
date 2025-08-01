import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubTitle = styled.h4`
  position: relative;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const SubTSpan = styled.span`
  font-size: 0.7rem;
  font-weight: normal;
  color: var(--color-1);
  text-decoration: line-through;

  position: absolute;
  top: 0;
  left: 110%;
`;
const PriceDiv = ({ discount_price, price, total_sell, fontSize }) => {
  return (
    <Container>
      <SubTitle style={{ fontSize }}>
        {price === 0 ? price : discount_price} $
        <SubTSpan>{price ? price + "$" : null}</SubTSpan>
      </SubTitle>
      <span
        style={{
          color: "#00ec00",
          fontSize: "0.9rem",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        {total_sell} sold
      </span>
    </Container>
  );
};

export default PriceDiv;
