import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

const Container = styled.div`
  position: relative;
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
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(false);

  const productName = useMemo(() => {
    return data.name.replace(/\s+/g, "-");
  }, [data.name]);

  return (
    <Container $open={open}>
      <Link to={`/products/${productName}`}>
        <ImageDiv $width="100%" $height="170px">
          <Image src={data.image_Url[0].url} alt={data.name} $rounded />
        </ImageDiv>
      </Link>
      <Link to={`/`}>
        <h5>{data.shop.name}</h5>
      </Link>
      <Link>
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
        discount_price={data.discount_price}
        price={data.price}
        total_sell={data.total_sell}
      />
      <OptionsDiv>
        <SlOptionsVertical size={20} onClick={() => setOptions(!options)} />
        {options ? (
          <>
            {" "}
            {click ? (
              <AiFillHeart
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => setClick(!click)}
                title="Remove from  wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => setClick(!click)}
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
            />
          </>
        ) : null}
      </OptionsDiv>
      {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
    </Container>
  );
};

export default ProductCard;
