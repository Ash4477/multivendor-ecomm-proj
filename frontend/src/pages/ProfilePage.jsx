import Header from "../components/Layout/Header/Header";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import OrdersContent from "../components/Profile/OrdersContent";
import RefundsContent from "../components/Profile/RefundsContent";
import TrackOrderContent from "../components/Profile/TrackOrderContent";
import UserAddressContent from "../components/Profile/UserAddressContent";
import ChangePasswordContent from "../components/Profile/ChangePasswordContent";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, clearSuccessMessage } from "../redux/actions/user";

const Container = styled.div`
  padding: 2rem 3rem;
  display: flex;
  align-items: stretch;
`;

const MainDiv = styled.div`
  flex: 4;
`;

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const { error, successMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [error, successMessage, dispatch]);

  return (
    <>
      <Header />
      <Container>
        <div style={{ flex: "1", minHeight: "80vh" }}>
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        {active === 1 && (
          <MainDiv>
            <ProfileContent />
          </MainDiv>
        )}
        {active === 2 && (
          <MainDiv>
            <OrdersContent />
          </MainDiv>
        )}
        {active === 3 && (
          <MainDiv>
            <RefundsContent />
          </MainDiv>
        )}
        {/* active === 4 => INBOX LATER */}
        {active === 5 && (
          <MainDiv>
            <TrackOrderContent />
          </MainDiv>
        )}
        {active === 6 && (
          <MainDiv>
            <ChangePasswordContent />
          </MainDiv>
        )}
        {active === 7 && (
          <MainDiv>
            <UserAddressContent />
          </MainDiv>
        )}
      </Container>
    </>
  );
};

export default ProfilePage;
