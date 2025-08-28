import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL, SERVER_URL } from "../../../server";
import {
  ImageDiv,
  Image,
  FancyButton as FB,
} from "../../../styled-comps/commonComps";
import Loader from "../../Layout/Loader/Loader";
import { getAllShopProducts } from "../../../redux/actions/product";

const Container = styled.div`
  flex: 1;
  background-color: var(--color-5);
  padding: 1rem;
  border-radius: 5px;

  h3 {
    font-size: 1rem;
  }

  p {
    font-size: 0.9rem;
    font-family: Roboto, sans-serif;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;
`;

const FancyButton = styled(FB)`
  font-size: 1rem;
  border-radius: 5px;
  padding: 0.7rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const ShopInfo = ({ isOwner, shop }) => {
  const { products, loading } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopProducts());
  }, [dispatch]);

  const logoutHandler = () => {
    axios
      .post(`${SERVER_URL}/shops/logout`, {}, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
        navigate("/shop-login");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Logout failed");
      });
  };

  if (loading) return <Loader />;

  return (
    <Container>
      <HeaderDiv>
        <ImageDiv $width="100px" $height="100px" $rounded>
          <Image $imgFill src={`${BACKEND_URL}/${shop?.avatar}`} />
        </ImageDiv>
        <h1>{shop.name}</h1>
        <p>{shop.description}</p>
      </HeaderDiv>
      <ContentDiv>
        <div>
          <h3>Address</h3>
          <p>{shop.address}</p>
        </div>
        <div>
          <h3>Phone Number</h3>
          <p>{shop.phoneNumber}</p>
        </div>
        <div>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div>
          <h3>Shop Ratings</h3>
          <p>{shop?.rating || "Not Rated Yet"}</p>
        </div>
        <div>
          <h3>Joined On</h3>
          <p>{shop.createdAt.slice(0, 10)}</p>
        </div>
        {isOwner && (
          <div>
            <FancyButton onClick={() => navigate("/settings")}>
              Edit Shop
            </FancyButton>
            <FancyButton onClick={logoutHandler}>Logout</FancyButton>
          </div>
        )}
      </ContentDiv>
    </Container>
  );
};

export default ShopInfo;
