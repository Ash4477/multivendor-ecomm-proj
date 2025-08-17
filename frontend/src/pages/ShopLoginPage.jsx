import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ShopLogin from "../components/Shop/ShopLogin/ShopLogin";

const ShopLoginPage = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.shop);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) navigate(`/dashboard`);
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <ShopLogin />
    </>
  );
};

export default ShopLoginPage;
