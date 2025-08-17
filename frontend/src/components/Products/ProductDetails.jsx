import { useEffect, useState } from "react";
import { Image, ImageDiv } from "../../styled-comps/commonComps";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styled from "styled-components";
import PriceDiv from "../Route/PriceDiv/PriceDiv";
import ProductDetailsInfo from "./ProductDetailsInfo";
import { BACKEND_URL } from "../../server";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 2rem 3rem;
`;

const FlexColDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: ${({ $align }) => ($align ? $align : "center")};
  justify-content: ${({ $justify }) => ($justify ? $justify : undefined)};
  gap: ${({ $gap }) => ($gap ? $gap : "1rem")};
`;

const BoldSpan = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;

const CounterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const Button = styled.button`
  background: transparent;
  border: 0;
  color: white;
`;

const CounterView = styled.span`
  background-color: var(--color-5);
  width: 100%;
  padding: 0 1rem;
`;

const CounterButton = styled.button`
  background-color: var(--color-1);
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 0 1rem;

  &:hover {
    background-color: var(--color-1-dim);
  }
`;

const FancyButton = styled.button`
  margin-top: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: black;
  color: white;
  font-family: Raleway, sans-serif;
  padding: 0.7rem 1rem;
  border-radius: 5px;
`;

const SubTitle = styled.h2`
  font-size: 1rem;
`;

const SubTitle2 = styled.h3`
  font-size: 0.8rem;
`;

const ProductDetails = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.images[0]) {
      setSelectedImage(data.images[0]);
    }
  }, [data]);

  const isInWishlist = wishlist.some((i) => i._id === data._id);

  const handleMessageSubmit = () => {};

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

  const removeFromWishlistHandler = () => {
    dispatch(removeFromWishlist(data._id));
  };

  const addToWishlistHandler = () => {
    dispatch(addToWishlist(data));
  };

  if (!data)
    return (
      <Container>
        <p>No Such Product Exists</p>
      </Container>
    );

  return (
    <Container>
      <FlexDiv>
        {" "}
        <FlexColDiv style={{ flex: "1", gap: "1rem" }}>
          <ImageDiv $width="100%" $height="300px">
            <Image
              src={`${BACKEND_URL}/uploads/${selectedImage}`}
              alt="product image"
            />
          </ImageDiv>
          <FlexDiv $justify="center">
            {data.images.map((img, idx) => (
              <ImageDiv
                key={idx}
                $height="100px"
                style={{
                  border: `${
                    img === selectedImage
                      ? "2px solid var(--color-1)"
                      : "2px solid grey"
                  }`,
                }}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={`${BACKEND_URL}/uploads/${img}`}
                  alt="product image"
                  style={{ objectFit: "cover" }}
                />
              </ImageDiv>
            ))}
          </FlexDiv>
        </FlexColDiv>
        <FlexColDiv style={{ flex: "2" }}>
          <h1>{data.name}</h1>
          <p>
            <BoldSpan>Description:</BoldSpan> <br />
            {data.description.slice(0, 1000)} ... (full details below)
          </p>
          <PriceDiv
            discount_price={data.discountPrice}
            price={data.originalPrice}
            total_sell={data.sold_out}
            fontSize={"1.5rem"}
          />
          <FlexDiv $justify="space-between">
            <CounterDiv>
              <CounterButton
                onClick={() => {
                  if (quantity > 1) setQuantity((prevCount) => prevCount - 1);
                }}
              >
                -
              </CounterButton>
              <CounterView>{quantity}</CounterView>
              <CounterButton
                onClick={() => {
                  if (quantity < data.stock)
                    setQuantity((prevCount) => prevCount + 1);
                  else toast.info("Limited Stock");
                }}
              >
                +
              </CounterButton>
            </CounterDiv>
            <Button>
              {isInWishlist ? (
                <AiFillHeart
                  color="red"
                  size={30}
                  title="Remove from wishlist"
                  onClick={removeFromWishlistHandler}
                />
              ) : (
                <AiOutlineHeart
                  size={30}
                  title="Add to wishlist"
                  onClick={addToWishlistHandler}
                />
              )}
            </Button>
          </FlexDiv>
          <FlexDiv $justify="space-between">
            <FancyButton onClick={() => addToCartHandler(data._id, quantity)}>
              Add to Cart <AiOutlineShoppingCart size={20} />
            </FancyButton>
            <FlexDiv style={{ width: "max-content" }}>
              <Link to={`/shop/${data.shopId}`}>
                <ImageDiv $height="50px" $width="50px" $rounded>
                  <Image
                    src={`${BACKEND_URL}/${data.shop.avatar}`}
                    alt={data.shop.name}
                    $rounded
                    $imgFill
                  />
                </ImageDiv>
              </Link>
              <FlexColDiv>
                <Link to={`/shop/${data.shopId}`}>
                  <SubTitle>{data.shop.name}</SubTitle>{" "}
                </Link>
                {data.shop.ratings ? (
                  <SubTitle2>({data.shop.ratings}) Ratings</SubTitle2>
                ) : (
                  <SubTitle2>No Ratings Yet</SubTitle2>
                )}
              </FlexColDiv>
              <FancyButton onClick={handleMessageSubmit}>
                Send Message <AiOutlineMessage size={20} />{" "}
              </FancyButton>
            </FlexDiv>
          </FlexDiv>
        </FlexColDiv>
      </FlexDiv>
      <ProductDetailsInfo data={data} />
    </Container>
  );
};

export default ProductDetails;
