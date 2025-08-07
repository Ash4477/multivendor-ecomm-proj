import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import styled from "styled-components";
import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";

const Container = styled.ul`
  list-style-type: none;
  background-color: var(--color-5);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  { id: 1, tabName: "Profile", tabIcon: <RxPerson size={20} /> },
  { id: 2, tabName: "Orders", tabIcon: <HiOutlineShoppingBag size={20} /> },
  { id: 3, tabName: "Refunds", tabIcon: <HiOutlineReceiptRefund size={20} /> },
  { id: 4, tabName: "Inbox", tabIcon: <AiOutlineMessage size={20} /> },
  {
    id: 5,
    tabName: "Track Order",
    tabIcon: <MdOutlineTrackChanges size={20} />,
  },
  {
    id: 6,
    tabName: "Payment Methods",
    tabIcon: <AiOutlineCreditCard size={20} />,
  },
  {
    id: 7,
    tabName: "Address",
    tabIcon: <TbAddressBook size={20} />,
  },
  {
    id: 8,
    tabName: "Logout",
    tabIcon: <AiOutlineLogin size={20} />,
  },
];

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  return (
    <Container>
      {tabs.map((tab) => (
        <ListItem
          key={tab.id}
          $active={active === tab.id}
          onClick={() => setActive(tab.id)}
        >
          <p>{tab.tabName}</p>
          {tab.tabIcon}
        </ListItem>
      ))}
    </Container>
  );
};

export default ProfileSidebar;
