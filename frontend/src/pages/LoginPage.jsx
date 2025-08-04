import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login/Login";

const LoginPage = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) navigate("/");
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <p>Loading...</p>;
  return <Login />;
};

export default LoginPage;
