import { Image, ImageDiv } from "../../../../styled-comps/commonComps";
import { AiOutlineDelete } from "react-icons/ai";
import { BACKEND_URL } from "../../../../server";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/actions/cart";

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
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    const updatedCartItem = { ...data, quantity: data.quantity + 1 };
    dispatch(addToCart(updatedCartItem));
  };

  const decreaseQuantity = () => {
    if (data.quantity > 1) {
      const updatedCartItem = { ...data, quantity: data.quantity - 1 };
      dispatch(addToCart(updatedCartItem));
    }
  };

  return (
    <Container>
      <FlexColDiv>
        <CounterBtn onClick={increaseQuantity}>+</CounterBtn>
        <span>{data.quantity}</span>
        <CounterBtn $deactivate={data.quantity <= 1} onClick={decreaseQuantity}>
          -
        </CounterBtn>
      </FlexColDiv>
      <ImageDiv $width="50px" $height="50px">
        <Image
          src={`${BACKEND_URL}/uploads/${data.images[0]}`}
          alt="product image"
        />
      </ImageDiv>
      <FlexColDiv $at="start" $gap="0.1rem">
        <p>{data.name}</p>
        <TextSpan>
          ( $ {data.discountPrice} x {data.quantity} )
        </TextSpan>
        <PriceText>US ${data.discountPrice * data.quantity}</PriceText>
      </FlexColDiv>
      <DeleteBtn onClick={() => handleDeleteItem(data._id)}>
        <AiOutlineDelete size={25} />
      </DeleteBtn>
    </Container>
  );
};

export default CartItem;
