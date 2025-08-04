import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import CartItem from "./CartItem";
import LeftSidebar from "../LeftSidebar";

const cartData = [
  {
    id: 1,
    name: "Iphone 14 pro max 256gb ssd and 8gb ram silver color",
    description: "test",
    imageUrl: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    price: 999,
  },
  {
    id: 2,
    name: "Iphone 14 pro max 256gb ssd and 8gb ram silver color",
    description: "test",
    imageUrl: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",

    price: 245,
  },
  {
    id: 3,
    name: "Iphone 14 pro max 256gb ssd and 8gb ram silver color",
    description: "test",
    imageUrl: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    price: 645,
  },
];

const CloseButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: none;
  color: white;
`;

const CartList = styled.ul`
  padding: 0;
  margin: 1rem 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: end;
  gap: 0.5rem;
`;

const CheckoutBtn = styled.button`
  background-color: var(--color-1);
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;

  &:hover {
    background-color: var(--color-1-dim);
  }
`;

const Cart = ({ setIsCartOpen }) => {
  const [cart, setCart] = useState(cartData);
  const navigate = useNavigate();

  const deleteCartItem = (id) => {
    setCart(cart.filter((data) => data.id != id));
  };

  return (
    <LeftSidebar>
      <CloseButton onClick={() => setIsCartOpen(false)}>
        <RxCross1 size={25} />
      </CloseButton>
      <FlexDiv>
        <IoBagHandleOutline size={25} /> <h4>{cart.length} Items</h4>
      </FlexDiv>
      {cart && cart.length > 0 ? (
        <CartList>
          {cart.map((data) => (
            <CartItem
              key={data.id}
              data={data}
              handleDeleteItem={deleteCartItem}
            />
          ))}
        </CartList>
      ) : (
        <h3 style={{ textAlign: "center" }}>
          🥺 <br /> No items added to cart yet!
        </h3>
      )}
      <CheckoutBtn onClick={() => navigate("/checkout")}>
        Checkout Now (USD $1080)
      </CheckoutBtn>
    </LeftSidebar>
  );
};

export default Cart;
