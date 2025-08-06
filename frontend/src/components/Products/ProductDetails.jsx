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
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleMessageSubmit = () => {};

  useEffect(() => {
    if (data?.image_Url?.[0]) {
      setSelectedImage(data.image_Url[0]);
    }
  }, [data]);

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
              src={selectedImage ? selectedImage.url : null}
              alt="product image"
            />
          </ImageDiv>
          <FlexDiv $justify="center">
            {data.image_Url.map((img, idx) => (
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
                  src={img.url}
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
            {data.description}
          </p>
          <PriceDiv
            discount_price={data.discount_price}
            price={data.price}
            total_sell={data.total_sell}
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
                onClick={() => setQuantity((prevCount) => prevCount + 1)}
              >
                +
              </CounterButton>
            </CounterDiv>
            <Button onClick={() => setIsAddedToWishlist(!isAddedToWishlist)}>
              {isAddedToWishlist ? (
                <AiFillHeart
                  color="red"
                  size={30}
                  title="Remove from wishlist"
                />
              ) : (
                <AiOutlineHeart size={30} title="Add to wishlist" />
              )}
            </Button>
          </FlexDiv>
          <FlexDiv $justify="space-between">
            <FancyButton>
              Add to Cart <AiOutlineShoppingCart size={20} />
            </FancyButton>
            <FlexDiv style={{ width: "max-content" }}>
              <ImageDiv $height="50px" $width="50px" $rounded>
                <Image
                  src={data.shop.shop_avatar.url}
                  alt={data.shop.name}
                  $rounded
                  $imgFill
                />
              </ImageDiv>
              <FlexColDiv>
                <SubTitle>{data.shop.name}</SubTitle>
                <SubTitle2>({data.shop.ratings}) Ratings</SubTitle2>
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
