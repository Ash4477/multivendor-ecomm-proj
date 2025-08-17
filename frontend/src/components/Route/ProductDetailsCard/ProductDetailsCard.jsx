import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { ImageDiv, Image } from "../../../styled-comps/commonComps";
import PriceDiv from "../../Route/PriceDiv/PriceDiv";
import styled from "styled-components";
import { BACKEND_URL } from "../../../server";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* dim background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  overflow-y: scroll;
  background-color: var(--color-4);
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  max-height: 90vh;
  width: 90%;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: ${({ $align }) => ($align ? $align : "center")};
  justify-content: ${({ $justify }) => ($justify ? $justify : undefined)};
  gap: ${({ $gap }) => ($gap ? $gap : "1rem")};
`;

const FlexDivCol = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ $fullW }) => ($fullW ? "100%" : undefined)};
`;

const StyledRxCross = styled(RxCross1)`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const SubTitle = styled.h2`
  font-size: 1rem;
`;

const SubTitle2 = styled.h3`
  font-size: 0.8rem;
`;

const FancyButton = styled.button`
  margin-top: 1rem;
  width: max-content;
  font-size: 0.8rem;
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

const CounterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
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
const CounterView = styled.span`
  background-color: var(--color-5);
  width: 100%;
  padding: 0 1rem;
`;

const Button = styled.button`
  background: transparent;
  border: 0;
  color: white;
`;

const ProductDetailsCard = ({
  setOpen,
  data,
  addToCartHandler,
  addToWishlistHandler,
  removeFromWishlistHandler,
  isInWishlist,
}) => {
  const [count, setCount] = useState(1);

  const handleMessageSubmit = () => {};

  return (
    <Container>
      {data ? (
        <Modal>
          <StyledRxCross size={30} onClick={() => setOpen(false)} />
          <FlexDiv style={{ marginBottom: "1rem" }}>
            {" "}
            <ImageDiv $width="50%" $height="50%" style={{ flex: "1" }}>
              <Image
                src={`${BACKEND_URL}/uploads/${data.images[0]}`}
                alt={data.name}
              />
            </ImageDiv>
            <FlexDivCol style={{ flex: "2" }}>
              {" "}
              <Title>{data.name}</Title>
              <p>{data.description.slice(0, 500)}</p>
              <PriceDiv
                discount_price={data.discountPrice}
                price={data.originalPrice}
                total_sell={data.sold_out}
              />
            </FlexDivCol>
          </FlexDiv>
          <FlexDiv $gap="5.5rem">
            <FlexDivCol>
              <FlexDiv>
                <ImageDiv $height="50px" $width="50px" $rounded>
                  <Image
                    src={`${BACKEND_URL}/${data.shop.avatar}`}
                    alt={data.shop.name}
                    $rounded
                    $imgFill
                  />
                </ImageDiv>
                <FlexDivCol>
                  <SubTitle>{data.shop.name}</SubTitle>
                  <SubTitle2>
                    {data.ratings
                      ? `(${data.shop.ratings}) Ratings`
                      : "Not Rated Yet"}
                  </SubTitle2>
                </FlexDivCol>
              </FlexDiv>
              <FancyButton onClick={handleMessageSubmit}>
                Send Message <AiOutlineMessage size={20} />{" "}
              </FancyButton>
            </FlexDivCol>
            <FlexDivCol $fullW>
              <FlexDiv $justify="space-between">
                <CounterDiv>
                  <CounterButton
                    onClick={() => {
                      if (count > 1) setCount((prevCount) => prevCount - 1);
                    }}
                  >
                    -
                  </CounterButton>
                  <CounterView>{count}</CounterView>
                  <CounterButton
                    onClick={() => setCount((prevCount) => prevCount + 1)}
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
              <FancyButton
                style={{ alignSelf: "flex-end" }}
                onClick={() => addToCartHandler(data._id, count)}
              >
                Add to Cart <AiOutlineShoppingCart size={20} />
              </FancyButton>
            </FlexDivCol>
          </FlexDiv>
        </Modal>
      ) : null}
    </Container>
  );
};

export default ProductDetailsCard;
