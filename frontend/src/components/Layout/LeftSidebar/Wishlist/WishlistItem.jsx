import { Image, ImageDiv } from "../../../../styled-comps/commonComps";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import styled from "styled-components";
import { BACKEND_URL } from "../../../../server";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/actions/cart";
import { toast } from "react-toastify";

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

const IconBtn = styled.button`
  background: transparent;
  color: white;
  border: none;
`;

const WishlistItem = ({ data, handleDeleteItem }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.info("Item already in cart");
      return;
    }
    dispatch(addToCart({ ...data, quantity: 1 }));
    toast.success("Item added to cart");
  };

  return (
    <Container>
      <IconBtn onClick={addToCartHandler}>
        <BsCartPlus size={25} />
      </IconBtn>
      <ImageDiv $width="50px" $height="50px">
        <Image
          src={`${BACKEND_URL}/uploads/${data.images[0]}`}
          alt="product image"
        />
      </ImageDiv>
      <FlexColDiv $at="start" $gap="0.1rem">
        <p>{data.name}</p>
        <p>US ${data.discountPrice}</p>
      </FlexColDiv>
      <IconBtn onClick={handleDeleteItem}>
        <AiOutlineDelete size={25} />
      </IconBtn>
    </Container>
  );
};

export default WishlistItem;
