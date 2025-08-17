import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ShopCreate from "../components/Shop/ShopCreate/ShopCreate";

const ShopCreatePage = () => {
  const { isAuthenticated, shop, loading } = useSelector((state) => state.shop);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) navigate(`/shop/${shop._id}`);
  }, [isAuthenticated, loading, shop, navigate]);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <ShopCreate />
    </>
  );
};

export default ShopCreatePage;
