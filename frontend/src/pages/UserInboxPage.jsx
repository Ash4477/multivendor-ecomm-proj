import Header from "../components/Layout/Header/Header.jsx";
import { Outlet } from "react-router-dom";

const UserInboxPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default UserInboxPage;
