import { Image, ImageDiv } from "../../../../styled-comps/commonComps";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
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

const IconBtn = styled.button`
  background: transparent;
  color: white;
  border: none;
`;

const WishlistItem = ({ data, handleDeleteItem }) => {
  return (
    <Container>
      <IconBtn onClick={() => console.log("added to cart")}>
        <BsCartPlus size={25} />
      </IconBtn>
      <ImageDiv $width="50px" $height="50px">
        <Image src={data.imageUrl} alt="product image" />
      </ImageDiv>
      <FlexColDiv $at="start" $gap="0.1rem">
        <p>{data.name}</p>
        <p>US ${data.price}</p>
      </FlexColDiv>
      <IconBtn onClick={() => handleDeleteItem(data.id)}>
        <AiOutlineDelete size={25} />
      </IconBtn>
    </Container>
  );
};

export default WishlistItem;
