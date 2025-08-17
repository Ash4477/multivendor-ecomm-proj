import { useSelector } from "react-redux";
import { Link as L } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BACKEND_URL } from "../../../server";
import { ImageDiv, Image } from "../../../styled-comps/commonComps";
import styled from "styled-components";
import LogoImg from "../../../assets/images/logo.png";

const Container = styled.div`
  background-color: var(--color-3);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlexSpan = styled.span`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Link = styled(L)`
  cursor: pointer;
`;

const DashboardHeader = () => {
  const { shop } = useSelector((state) => state.shop);

  return (
    <Container>
      <ImageDiv $width="80px">
        <Image src={LogoImg} alt="logo" />
      </ImageDiv>
      <FlexSpan>
        <Link to="/dashboard/coupons">
          <AiOutlineGift size={30} />
        </Link>
        <Link to="/dashboard/events">
          <MdOutlineLocalOffer size={30} />
        </Link>
        <Link to="/dashboard/products">
          <FiShoppingBag size={30} />
        </Link>
        <Link to="/dashboard/orders">
          <FiPackage size={30} />
        </Link>
        <Link to="/dashboard/messages">
          <BiMessageSquareDetail size={30} />
        </Link>
        <Link to={`/shop/${shop._id}`}>
          <ImageDiv $width="35px" $height="35px" $rounded>
            <Image
              $rounded
              $imgFill
              src={`${BACKEND_URL}/${shop.avatar}`}
              alt="logo"
            />
          </ImageDiv>
        </Link>
      </FlexSpan>
    </Container>
  );
};

export default DashboardHeader;
