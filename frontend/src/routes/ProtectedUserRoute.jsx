import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader/Loader";

const ProtectedUserRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) return <Loader />;

  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedUserRoute;
