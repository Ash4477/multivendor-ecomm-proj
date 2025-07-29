import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Image, ImageDiv } from "../../../styled-comps/commonComps";
import { Input } from "../../../styled-comps/formComps";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import logoImg from "../../../assets/images/logo.png";
import { productData } from "../../../static/data";

const Container = styled.div`
  background-color: var(--color-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.h2`
  color: #ffcc00;
  font-family: Raleway, sans-serif;
  font-size: 2rem;
`;

const SearchDiv = styled.div`
  width: 600px;
  position: "absolute";
  background-color: white;
  display: flex;
  align-items: center;
  border: 2px solid var(--color-1);
  box-shadow: 0 4px 12px rgba(247, 55, 79, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding-right: 0.5rem;
`;

const SearchBox = styled.div`
  width: 600px;
  height: 100px;
  border: 1px solid grey;
  background-color: white;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  position: absolute;
  overflow: auto;
  top: 3.5rem;
`;

const SearchItemDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  gap: 0.5rem;
  font-size: 0.85rem;
`;

const SellerLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  font-family: Raleway, sans-serif;
  font-size: 1.2rem;
  padding: 0.7rem 1rem;
  border-radius: 15px;
`;

const UpperPart = () => {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState(null);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const filteredProducts = productData.filter(
      (prod) =>
        prod.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        prod.description?.toLowerCase().includes(searchText.toLowerCase()) ||
        prod.category?.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchData(filteredProducts);
  };

  return (
    <Container>
      <StyledLink to="/">
        <ImageDiv $height="50px" $width="100px">
          <Image src={logoImg} alt="logo" />
        </ImageDiv>
        <LogoText>Zayro</LogoText>
      </StyledLink>
      <SearchDiv>
        <Input
          $width="100%"
          $pass
          type="text"
          placeholder="Search Product..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <AiOutlineSearch size={25} />
        {searchData && searchText.length != 0 && searchData.length != 0 ? (
          <SearchBox>
            {searchData &&
              searchData.map((prod) => {
                const prodName = prod.name.replace(/\s+/g, "-");
                return (
                  <Link to={`/product/${prodName}`}>
                    <SearchItemDiv>
                      <ImageDiv $width="30px" $height="30px">
                        <Image src={logoImg} alt={prodName} />
                      </ImageDiv>
                      <p>{prod.name}</p>
                    </SearchItemDiv>
                  </Link>
                );
              })}
          </SearchBox>
        ) : null}
      </SearchDiv>
      <SellerLink to="seller">
        <p>Become a Seller</p> <IoIosArrowForward />
      </SellerLink>
    </Container>
  );
};

export default UpperPart;
