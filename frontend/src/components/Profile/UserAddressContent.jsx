import { AiOutlineDelete } from "react-icons/ai";
import { FancyButton } from "../../styled-comps/commonComps";
import styled from "styled-components";

const Container = styled.div`
  margin-left: 2rem;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainDiv = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlexDiv = styled.div`
  background-color: var(--color-5);
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: "space-between";
  gap: 1rem;
  font-family: Roboto, sans-serif;
`;

const StyledBtn = styled.button`
  background: transparent;
  border: none;
  color: white;

  &:hover {
    color: var(--color-1);
  }
`;

const addresses = [
  {
    type: "Default",
    address: "494 Erdman Passage, New Zoietown, Paraguay",
    contactNum: "(213) 840 9416",
  },
];

const UserAddressContent = () => {
  return (
    <Container>
      <HeaderDiv>
        <h1>My Addresses</h1>
        <FancyButton $pad="0.8rem 2rem">Add New</FancyButton>
      </HeaderDiv>
      <MainDiv>
        {addresses.map((add) => (
          <FlexDiv>
            <p>{add.type}</p>
            <p>{add.address}</p>
            <p>{add.contactNum}</p>
            <StyledBtn>
              <AiOutlineDelete size={20} />
            </StyledBtn>
          </FlexDiv>
        ))}
      </MainDiv>
    </Container>
  );
};

export default UserAddressContent;
