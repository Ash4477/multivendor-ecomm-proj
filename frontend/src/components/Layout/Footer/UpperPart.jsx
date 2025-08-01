import { Input } from "../../../styled-comps/formComps";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: var(--color-1);
  color: white;
  padding: 0.2rem 0.5rem;
  border: 0;
  border-radius: 5px;
`;

const UpperPart = () => {
  return (
    <Container>
      <h2 style={{ fontSize: "2rem" }}>
        <span style={{ color: "var(--color-1)" }}>Subscribe</span> us to get
        news <br />
        events and offers
      </h2>
      <FlexDiv>
        <Input type="text" required placeholder="Enter your email..." />
        <Button>Submit</Button>
      </FlexDiv>
    </Container>
  );
};

export default UpperPart;
