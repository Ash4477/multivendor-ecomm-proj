import { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import NavBar from "./NavBar";
import CategoriesDropDown from "./CategoriesDropDown";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container $active={active} className="lower">
      <CategoriesDropDown></CategoriesDropDown>
      <NavBar activeHeading={activeHeading} />
      <ButtonsDiv>
        <IconLink to="">
          <AiOutlineHeart size={45} />
          <IconSpan>0</IconSpan>
        </IconLink>
        <IconLink to="">
          <AiOutlineShoppingCart size={45} />
          <IconSpan>0</IconSpan>
        </IconLink>
        <IconLink to="/login">
          <CgProfile size={45} />
        </IconLink>
      </ButtonsDiv>
    </Container>
  );
};

export default LowerPart;
