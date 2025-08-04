import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* dim background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  background-color: var(--color-5);
  position: fixed;
  top: 0;
  right: 0;
  min-width: 15rem;
  max-width: 400px;
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LeftSidebar = ({ children }) => {
  return (
    <Overlay>
      <Container>{children}</Container>
    </Overlay>
  );
};

export default LeftSidebar;
