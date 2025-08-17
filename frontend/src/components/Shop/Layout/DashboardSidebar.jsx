import { RxDashboard } from "react-icons/rx";
import { MdOutlineLocalOffer } from "react-icons/md";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { CiSettings, CiMoneyBill } from "react-icons/ci";
import { VscNewFile } from "react-icons/vsc";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link as L } from "react-router-dom";
import styled from "styled-components";

const Container = styled.ul`
  list-style-type: none;
  background-color: var(--color-5);
  padding: 0.5rem 1rem;
  margin: 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-around;
`;

const Link = styled(L)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Li = styled.li`
  cursor: pointer;
  width: max-content;
  ${({ $active }) =>
    $active &&
    ` 
    color: var(--color-1);
    background-color: var(--color-4);
    padding: 10px 15px;
    font-weight: bold;
    border-radius: 2.5rem;
    `};
`;

const tabs = [
  {
    id: 1,
    tabLink: (
      <Link to="/dashboard">
        <RxDashboard size={20} /> Dashboard
      </Link>
    ),
  },
  {
    id: 2,
    tabLink: (
      <Link to="/dashboard/all-orders">
        <HiOutlineShoppingBag size={20} /> All Orders
      </Link>
    ),
  },
  {
    id: 3,
    tabLink: (
      <Link to="/dashboard/all-products">
        <FiPackage size={20} /> All Products
      </Link>
    ),
  },
  {
    id: 4,
    tabLink: (
      <Link to="/dashboard/create-product">
        <AiOutlineFolderAdd size={20} /> Create Product
      </Link>
    ),
  },
  {
    id: 5,
    tabLink: (
      <Link to="/dashboard/all-events">
        <MdOutlineLocalOffer size={20} /> All Events
      </Link>
    ),
  },
  {
    id: 6,
    tabLink: (
      <Link to="/dashboard/create-event">
        <VscNewFile size={20} /> Create Event
      </Link>
    ),
  },
  {
    id: 7,
    tabLink: (
      <Link to="/dashboard/withdraw">
        <CiMoneyBill size={20} /> Withdraw Money
      </Link>
    ),
  },
  {
    id: 8,
    tabLink: (
      <Link to="/dashboard/inbox">
        <BiMessageSquareDetail size={20} /> Inbox
      </Link>
    ),
  },
  {
    id: 9,
    tabLink: (
      <Link to="/dashboard/coupons">
        <AiOutlineGift size={20} /> Codes
      </Link>
    ),
  },
  {
    id: 10,
    tabLink: (
      <Link to="/dashboard/refunds">
        <HiOutlineReceiptRefund size={20} /> Refunds
      </Link>
    ),
  },
  {
    id: 11,
    tabLink: (
      <Link to="/dashboard/settings">
        <CiSettings size={20} /> Settings
      </Link>
    ),
  },
];

const DashboardSidebar = ({ active, setActive }) => {
  return (
    <Container>
      {tabs.map((tab) => (
        <Li
          onClick={() => setActive(tab.id)}
          $active={active == tab.id}
          key={tab.id}
        >
          {tab.tabLink}
        </Li>
      ))}
    </Container>
  );
};

export default DashboardSidebar;
