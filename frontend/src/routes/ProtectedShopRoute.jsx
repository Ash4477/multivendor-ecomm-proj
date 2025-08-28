import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AnimationLoader from "../components/Layout/Loader/AnimationLoader";

const ProtectedShopRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.shop);

  if (loading) {
    return <AnimationLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/shop-login" replace />;
  }

  return children;
};

export default ProtectedShopRoute;
