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
} from "../../../styled-comps/formComps";
import { Image } from "../../../styled-comps/commonComps";
import { SERVER_URL } from "../../../server";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../Layout/Loader/Loader";

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
  border-radius: 50%;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid grey;
  border-radius: 5px;
`;

const ShopCreate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("address", address);
    newForm.append("zipCode", zipCode);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("password", password);

    setIsLoading(true);
    axios
      .post(`${SERVER_URL}/shops`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setAddress("");
        setPhoneNumber("");
        setZipCode("");
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
      <H1>Register as a new seller</H1>
      <Form $minWid="600px" onSubmit={handleSubmit}>
        <InputDiv>
          <Label htmlFor="name">Shop Name</Label>
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
          <Label htmlFor="phone-number">Shop Phone Number</Label>
          <Input
            type="number"
            id="phone-number"
            name="phone-number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoComplete="phone"
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="address">Shop Address</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="address"
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="zipcode">Zip Code</Label>
          <Input
            type="number"
            id="zipcode"
            name="zipcode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            autoComplete="zipcode"
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
          {avatar ? (
            <AvatarDiv>
              <Image $rounded src={URL.createObjectURL(avatar)} alt="avatar" />
            </AvatarDiv>
          ) : (
            <RxAvatar size={30} />
          )}
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
        <SubmitBtn type="submit">
          {isLoading ? <Loader width="25px" /> : "Submit"}
        </SubmitBtn>
        <LinkP>
          Already have a seller account?{" "}
          <StyledLink to="/shop-login">Login here</StyledLink>
        </LinkP>
      </Form>
    </Container>
  );
};

export default ShopCreate;
