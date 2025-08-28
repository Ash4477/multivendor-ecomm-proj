import styled from "styled-components";

const StatusDiv = styled.div`
  display: flex;
  align-items: center;
`;

const BubbleSpan = styled.span`
  font-weight: bold;
  padding: 0.2rem 1rem;
  border-radius: 2.5rem;
  background-color: ${({ $active }) => ($active ? "#f63b60" : "#FDE1E6")};
  color: ${({ $active }) => ($active ? "white" : "#f63b60")};
`;

const LineSpan = styled.span`
  display: inline-block;
  width: 50px;
  border-bottom: 2px solid var(--color-1);
  margin: 8px 0;
`;
const ShippingStatus = ({ active }) => {
  return (
    <StatusDiv>
      <BubbleSpan $active={active >= 1}>Shipping</BubbleSpan>
      <LineSpan></LineSpan>
      <BubbleSpan $active={active >= 2}>Payment</BubbleSpan>
      <LineSpan></LineSpan>
      <BubbleSpan $active={active >= 3}>Success</BubbleSpan>
    </StatusDiv>
  );
};

export default ShippingStatus;
