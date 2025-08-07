import Header from "../components/Layout/Header/Header";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import OrdersContent from "../components/Profile/OrdersContent";
import TrackOrderContent from "../components/Profile/TrackOrderContent";
import PaymentMethodsContent from "../components/Profile/PaymentMethodsContent";
import UserAddressContent from "../components/Profile/UserAddressContent";
import styled from "styled-components";
import { useState } from "react";

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
            <OrdersContent />
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
            <PaymentMethodsContent />
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
