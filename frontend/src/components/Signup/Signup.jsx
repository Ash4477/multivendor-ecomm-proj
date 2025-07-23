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
import styled from "styled-components";

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const FileInput = styled.input`
  display: none;
`;

const AvatarDiv = styled.div`
  max-width: 40px;
  border: ${(props) => (props.avatar ? "1px solid grey" : "")};
  border-radius: ${(props) => (props.avatar ? "50%" : "")};
`;

const StyledLabel = styled.label`
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid grey;
  border-radius: 5px;
`;

const Image = styled.img`
  object-fit: cover;
  border-radius: 50%;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("TODO");
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
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
              password
              type={visible ? "text" : "password"}
              id="password"
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
          <Label htmlFor="avatar">
            <AvatarDiv avatar={avatar}>
              {avatar ? (
                <Image src={URL.createObjectURL(avatar)} alt="avatar" />
              ) : (
                <RxAvatar size={30} />
              )}
            </AvatarDiv>
          </Label>{" "}
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
        <SubmitBtn type="submit">Submit</SubmitBtn>
        <LinkP>
          Already have an account?{" "}
          <StyledLink to="/login">Login here</StyledLink>
        </LinkP>
      </Form>
    </Container>
  );
};

export default Signup;
