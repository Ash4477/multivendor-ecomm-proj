import styled from "styled-components";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../components/Shop/Layout/DashboardSidebar";

const MainDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const ShopDashboardPage = () => {
  const [active, setActive] = useState(1);
  return (
    <>
      <DashboardHeader />
      <MainDiv>
        <div style={{ flex: "1" }}>
          <DashboardSidebar active={active} setActive={setActive} />
        </div>
        <div style={{ flex: "4" }}>
          <Outlet active={active} setActive={setActive} />
        </div>
      </MainDiv>
    </>
  );
};

export default ShopDashboardPage;
