import { useState } from "react";
import styled from "styled-components";
import DropDown from "./DropDown";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { categoriesData } from "../../../static/data";

const Container = styled.div`
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 10px 10px 0 0;
  min-width: 270px;
`;

const DropDownHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const CategoriesDropDown = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <Container>
      <DropDownHeader>
        <BiMenuAltLeft size={25} />
        <Button onClick={() => setDropDown(!dropDown)}>
          <p>All Categories</p> <IoIosArrowDown size={20} />
        </Button>
      </DropDownHeader>
      {dropDown ? (
        <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
      ) : null}
    </Container>
  );
};

export default CategoriesDropDown;
