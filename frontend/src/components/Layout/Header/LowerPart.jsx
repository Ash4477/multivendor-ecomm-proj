import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImageDiv, Image } from "../../../styled-comps/commonComps";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BACKEND_URL } from "../../../server";
import styled from "styled-components";
import NavBar from "./NavBar";
import CategoriesDropDown from "./CategoriesDropDown";
import Cart from "../LeftSidebar/Cart/Cart";
import Wishlist from "../LeftSidebar/Wishlist/Wishlist";

const Container = styled.div`
  font-weight: 500;
  padding: 0 3rem;
  background-color: var(--color-1);
  color: white;

  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;

  ${({ $active }) =>
    $active &&
    `
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `}
`;

const ButtonsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconLink = styled(Link)`
  position: relative;
`;

const IconDiv = styled.div`
  position: relative;
  cursor: pointer;
`;

const IconSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  height: 15px;
  width: 15px;
  font-size: 0.7rem;
  border-radius: 50%;

  position: absolute;
  top: -3px;
  right: -7px;
`;

const LowerPart = ({ activeHeading }) => {
  const [active, setActive] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 90);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <p>loading...</p>;

  return (
    <Container $active={active} className="lower">
      <CategoriesDropDown></CategoriesDropDown>
      <NavBar activeHeading={activeHeading} />
      <ButtonsDiv>
        <IconDiv onClick={() => setIsWishlistOpen(true)}>
          <AiOutlineHeart size={50} />
          <IconSpan>0</IconSpan>
        </IconDiv>
        <IconDiv onClick={() => setIsCartOpen(true)}>
          <AiOutlineShoppingCart size={50} />
          <IconSpan>0</IconSpan>
        </IconDiv>
        {isAuthenticated ? (
          <IconLink to="/profile">
            <ImageDiv $width="30px" $rounded>
              <Image src={`${BACKEND_URL}/${user.avatar}`} alt="avatar" />
            </ImageDiv>
          </IconLink>
        ) : (
          <IconLink to="/login">
            <CgProfile size={50} />
          </IconLink>
        )}
      </ButtonsDiv>

      {isCartOpen ? <Cart setIsCartOpen={setIsCartOpen} /> : null}
      {isWishlistOpen ? (
        <Wishlist setIsWishlistOpen={setIsWishlistOpen} />
      ) : null}
    </Container>
  );
};

export default LowerPart;
