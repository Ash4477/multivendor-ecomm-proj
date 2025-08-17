import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader/Loader";

const ProtectedShopRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.shop);

  if (loading) return <Loader />;

  if (!isAuthenticated && !loading)
    return <Navigate to="/shop-login" replace />;

  return children;
};

export default ProtectedShopRoute;
