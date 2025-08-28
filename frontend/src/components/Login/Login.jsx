import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../server";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  Container,
  H1,
  Form,
  InputDiv,
  PassDiv,
  Input,
  Label,
  SubmitBtn,
  LinkP,
  StyledLink,
} from "../../styled-comps/formComps";
import Loader from "../Layout/Loader/Loader";

const CheckDiv = styled.div`
  display: flex;
  font-size: 0.85rem;
  justify-content: space-between;
  align-items: center;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        `${SERVER_URL}/users/login`,
        { email, password },
        { withCredentials: true }
      );
      toast.success("Login Successful");
      navigate("/");
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <H1>Login to your account</H1>
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="password">Password</Label>
          <PassDiv>
            <Input
              $pass
              type={visible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              minLength={6}
            />
            {visible ? (
              <AiOutlineEye
                size={25}
                onClick={() => setVisible(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <AiOutlineEyeInvisible
                size={25}
                onClick={() => setVisible(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </PassDiv>
        </InputDiv>
        <CheckDiv>
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
          >
            <input type="checkbox" id="remember-me" name="remember-me" />{" "}
            <Label htmlFor="remember-me">Remember Me</Label>
          </span>
          <StyledLink to="/">Forgot your password?</StyledLink>
        </CheckDiv>
        <SubmitBtn type="submit" disabled={isLoading}>
          {isLoading ? <Loader width="25px" /> : "Submit"}
        </SubmitBtn>
        <LinkP>
          Don't have an account yet?{" "}
          <StyledLink to="/sign-up">Sign up here!</StyledLink>
        </LinkP>
      </Form>
    </Container>
  );
};

export default Login;
