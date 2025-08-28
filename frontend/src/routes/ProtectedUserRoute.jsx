import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AnimationLoader from "../components/Layout/Loader/AnimationLoader";

const ProtectedUserRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) return <AnimationLoader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedUserRoute;
