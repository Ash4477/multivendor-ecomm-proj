import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../../redux/actions/cart";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import CartItem from "./CartItem";
import LeftSidebar from "../LeftSidebar";
import { useMemo } from "react";

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
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = useMemo(() => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce(
      (acc, item) => acc + item.discountPrice * item.quantity,
      0
    );
  }, [cart]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <LeftSidebar>
      <CloseButton onClick={() => setIsCartOpen(false)}>
        <RxCross1 size={25} />
      </CloseButton>
      <FlexDiv>
        <IoBagHandleOutline size={25} /> <h4>{cart && cart.length} Items</h4>
      </FlexDiv>
      {cart && cart.length > 0 ? (
        <CartList>
          {cart.map((data) => (
            <CartItem
              key={data._id}
              data={data}
              handleDeleteItem={removeFromCartHandler}
            />
          ))}
        </CartList>
      ) : (
        <h3 style={{ textAlign: "center", margin: "1rem 0" }}>
          🥺 <br /> No items added to cart yet!
        </h3>
      )}
      <CheckoutBtn
        onClick={() => navigate("/checkout")}
        disabled={!cart || cart.length === 0}
      >
        {`Checkout Now (USD $${totalPrice})`}
      </CheckoutBtn>
    </LeftSidebar>
  );
};

export default Cart;
