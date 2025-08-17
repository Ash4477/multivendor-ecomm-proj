import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
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
import { Image } from "../../styled-comps/commonComps";
import { SERVER_URL } from "../../server";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader/Loader";

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const FileInput = styled.input`
  display: none;
`;

const AvatarDiv = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid grey;
  border-radius: 50%;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid grey;
  border-radius: 5px;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post(`${SERVER_URL}/users`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Container>
      <H1>Register as a new user</H1>
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="name"
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
        <FlexDiv>
          <AvatarDiv>
            {avatar ? (
              <Image $rounded src={URL.createObjectURL(avatar)} alt="avatar" />
            ) : (
              <RxAvatar size={30} />
            )}
          </AvatarDiv>
          <StyledLabel htmlFor="file-input">
            <span>Upload photo</span>
            <FileInput
              type="file"
              id="file-input"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileInputChange}
              placeholder="Upload a File"
            />
          </StyledLabel>
        </FlexDiv>
        <SubmitBtn type="submit">{isLoading ? <Loader /> : "Submit"}</SubmitBtn>
        <LinkP>
          Already have an account?{" "}
          <StyledLink to="/login">Login here</StyledLink>
        </LinkP>
      </Form>
    </Container>
  );
};

export default Signup;
