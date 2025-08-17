import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Image, ImageDiv } from "../../../styled-comps/commonComps";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import PriceDiv from "../../Route/PriceDiv/PriceDiv";
import styled from "styled-components";
import { BACKEND_URL } from "../../../server";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { toast } from "react-toastify";

const Container = styled.div`
  position: relative;
  max-width: 250px;
  background-color: var(--color-5);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: ${({ $open }) => !$open && "pointer"};
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Title = styled.h3`
  font-size: 0.9rem;
  font-weight: normal;
`;

const StarsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;
const OptionsDiv = styled.div`
  background-color: var(--color-4);
  color: white;
  padding: 0.3rem;
  border-radius: 5px;

  position: absolute;
  right: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const ProductCard = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(false);
  const dispatch = useDispatch();

  const addToCartHandler = (id, quantity) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.info("Item already in cart");
      return;
    }
    const cartData = { ...data, quantity };
    dispatch(addToCart(cartData));
    toast.success("Item added to cart successfully");
  };

  const isInWishlist = wishlist.some((i) => i._id === data._id);

  const removeFromWishlistHandler = () => {
    dispatch(removeFromWishlist(data._id));
  };

  const addToWishlistHandler = () => {
    dispatch(addToWishlist(data));
  };

  return (
    <Container $open={open}>
      <Link to={`/products/${data._id}`}>
        <ImageDiv $width="100%" $height="170px">
          {/* <Image src={data.image_Url[0].url} alt={data.name} $rounded /> */}
          <Image
            src={`${BACKEND_URL}/uploads/${data.images[0]}`}
            alt={data.name}
            $rounded
          />
        </ImageDiv>
      </Link>
      <Link to={`/shop/${data.shopId}`}>
        <h5>{data.shop.name}</h5>
      </Link>
      <Link to={`/products/${data._id}`}>
        <Title>
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </Title>
      </Link>
      <StarsDiv>
        <AiFillStar color="#ffce08" size={20} />
        <AiFillStar color="#ffce08" size={20} />
        <AiFillStar color="#ffce08" size={20} />
        <AiFillStar size={20} />
        <AiFillStar size={20} />
      </StarsDiv>
      <PriceDiv
        discount_price={data.discountPrice}
        price={data.originalPrice}
        total_sell={data.sold_out}
      />
      <OptionsDiv>
        <SlOptionsVertical size={20} onClick={() => setOptions(!options)} />
        {options ? (
          <>
            {" "}
            {isInWishlist ? (
              <AiFillHeart
                size={20}
                style={{ cursor: "pointer", color: "red" }}
                onClick={removeFromWishlistHandler}
                title="Remove from  wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={20}
                style={{ cursor: "pointer" }}
                onClick={addToWishlistHandler}
                title="Add to  wishlist"
              />
            )}
            <AiOutlineEye
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(!open)}
              title="Quick view"
            />
            <AiOutlineShoppingCart
              size={20}
              style={{ cursor: "pointer" }}
              title="Add to cart"
              onClick={() => addToCartHandler(data._id, 1)}
            />
          </>
        ) : null}
      </OptionsDiv>
      {open ? (
        <ProductDetailsCard
          addToCartHandler={addToCartHandler}
          addToWishlistHandler={addToWishlistHandler}
          removeFromWishlistHandler={removeFromWishlistHandler}
          isInWishlist={isInWishlist}
          setOpen={setOpen}
          data={data}
        />
      ) : null}
    </Container>
  );
};

export default ProductCard;
