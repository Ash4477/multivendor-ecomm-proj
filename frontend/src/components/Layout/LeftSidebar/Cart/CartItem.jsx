import { useState } from "react";
import { Image, ImageDiv } from "../../../../styled-comps/commonComps";
import { AiOutlineDelete } from "react-icons/ai";
import styled from "styled-components";

const Container = styled.li`
  font-family: Roboto, sans-serif;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FlexColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ $at }) => ($at ? $at : "center")};
  gap: ${({ $gap }) => ($gap ? $gap : "")};
`;

const CounterBtn = styled.button`
  color: white;
  font-size: 1.5rem;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $deactivate }) =>
    $deactivate ? "grey" : "var(--color-1)"};
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: none;
`;

const DeleteBtn = styled.button`
  background: transparent;
  color: white;
  border: none;
`;

const TextSpan = styled.span`
  font-size: 0.7rem;
  color: white;
`;

const PriceText = styled.span`
  color: var(--color-1);
`;

const CartItem = ({ data, handleDeleteItem }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  return (
    <Container>
      <FlexColDiv>
        <CounterBtn onClick={increaseQuantity}>+</CounterBtn>
        <span>{quantity}</span>
        <CounterBtn $deactivate={quantity <= 1} onClick={decreaseQuantity}>
          -
        </CounterBtn>
      </FlexColDiv>
      <ImageDiv $width="50px" $height="50px">
        <Image src={data.imageUrl} alt="product image" />
      </ImageDiv>
      <FlexColDiv $at="start" $gap="0.1rem">
        <p>{data.name}</p>
        <TextSpan>
          ( $ {data.price} x {quantity} )
        </TextSpan>
        <PriceText>US ${data.price * quantity}</PriceText>
      </FlexColDiv>
      <DeleteBtn onClick={() => handleDeleteItem(data.id)}>
        <AiOutlineDelete size={25} />
      </DeleteBtn>
    </Container>
  );
};

export default CartItem;
