import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 3rem;
  background-color: var(--color-4);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 1.5rem;
`;

const Form = styled.form`
  min-width: ${({ $minWid }) => $minWid || undefined};
  background-color: white;
  color: black;
  padding: 1.5rem;
  margin-top: 1rem;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(233, 230, 230, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: grey;
  font-weight: 500;
`;

const Input = styled.input`
  width: ${({ $width }) => ($width ? $width : undefined)};
  min-width: 300px;
  padding: 0.2rem 0.5rem;
  border: ${(props) => (props.$pass ? "none" : "1px solid grey")};
  border-radius: 5px;
  outline: none;
`;

const Select = styled.select`
  width: ${({ $width }) => ($width ? $width : undefined)};
  min-width: 300px;
  padding: 0.2rem 0.5rem;
  border: "1px solid grey";
  border-radius: 5px;
  outline: none;
`;

const TextArea = styled.textarea`
  width: ${({ $width }) => ($width ? $width : undefined)};
  min-width: 300px;
  padding: 0.2rem 0.5rem;
  border: "1px solid grey";
  border-radius: 5px;
  outline: none;
`;

const PassDiv = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid grey;
  border-radius: 5px;
  padding-right: 0.5rem;
`;

const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-weight: bold;
  background-color: #0165f0ff;
  color: white;
  outline: none;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #2379f2ff;
  }
`;

const LinkP = styled.p`
  font-size: 0.9rem;
`;

const StyledLink = styled(Link)`
  color: #0165f0ff;
  font-weight: bold;
`;

export {
  Container,
  H1,
  Form,
  InputDiv,
  PassDiv,
  Input,
  Select,
  TextArea,
  Label,
  StyledLink,
  LinkP,
  SubmitBtn,
};
