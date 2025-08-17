import styled from "styled-components";
import ShopInfo from "../components/Shop/ShopInfo/ShopInfo";
import ShopProfileData from "../components/Shop/ShopProfileData/ShopProfileData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../server";
import { toast } from "react-toastify";
import Loader from "../components/Layout/Loader/Loader";

const Container = styled.div`
  padding: 2rem 3rem;
  display: flex;
  align-items: start;
  gap: 1.5rem;
`;

const ShopHomePage = () => {
  const [shop, setShop] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { shop_id } = useParams();
  const { shop: s, loading } = useSelector((state) => state.shop);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}/shops/${shop_id}`)
      .then((res) => {
        setShop(res.data.shop);
      })
      .catch((e) => toast.error(e.response.data.message))
      .finally(() => setIsLoading(false));
  }, [shop_id]);

  if (loading || isLoading) return <Loader />;

  if (!shop) return <h1 style={{ padding: "3rem" }}>No Shop with this id</h1>;

  return (
    <Container>
      <ShopInfo isOwner={s && s._id == shop_id} shop={shop} />
      <ShopProfileData isOwner={s && s._id == shop_id} shopId={shop_id} />
    </Container>
  );
};

export default ShopHomePage;
