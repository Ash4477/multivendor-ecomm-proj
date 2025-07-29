import styled from "styled-components";
import { navItems } from "../../../static/data";
import { Link } from "react-router-dom";

const Container = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  ${({ $active }) =>
    $active &&
    `
  font-weight: bold;
  text-decoration: underline;
`}
`;

const NavBar = ({ activeHeading }) => {
  return (
    <Container>
      {navItems.map((navItem, idx) => (
        <StyledLink key={idx} to={navItem.url} $active={activeHeading === idx}>
          {navItem.title}
        </StyledLink>
      ))}
    </Container>
  );
};

export default NavBar;
