import UpperPart from "./UpperPart";
import LowerPart from "./LowerPart";
import styled from "styled-components";

const Container = styled.div`
  background-color: var(--color-2);
  width: 100%;
`;

const Footer = () => {
  return (
    <Container>
      <UpperPart />
      <LowerPart />
    </Container>
  );
};

export default Footer;
