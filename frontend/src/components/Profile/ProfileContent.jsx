import { useState } from "react";
import { useSelector } from "react-redux";
import { Image, ImageDiv } from "../../styled-comps/commonComps";
import {
  Input,
  InputDiv,
  Label as L,
  SubmitBtn,
} from "../../styled-comps/formComps";
import { AiOutlineCamera } from "react-icons/ai";
import { BACKEND_URL } from "../../server";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CamDiv = styled.div`
  position: relative;
`;

const CamBtn = styled.button`
  background-color: var(--color-5);
  color: black;
  border-radius: 50%;
  padding: 5px;
  position: absolute;
  bottom: 0;
  right: 10px;
`;

const Form = styled.form`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Label = styled(L)`
  color: white;
`;

const ProfileContent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { user, loading } = useSelector((state) => state.user);

  const handleUpdate = (e) => {
    e.preventDefault();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Container>
        <CamDiv>
          <ImageDiv
            $width="150px"
            $rounded
            style={{
              border: "3px solid var(--color-1)",
            }}
          >
            <Image src={`${BACKEND_URL}/${user.avatar}`} alt="avatar" />
          </ImageDiv>
          <CamBtn>
            <AiOutlineCamera size={20} />
          </CamBtn>
        </CamDiv>

        <Form onSubmit={handleUpdate}>
          <InputDiv>
            <Label htmlFor="f-name">Full Name</Label>
            <Input
              id="f-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="contactNum">Contact Number</Label>
            <Input
              id="contactNum"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              $width="100%"
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="address1">Address 1</Label>
            <Input
              id="address1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="address2">Address 2</Label>
            <Input
              id="address2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </InputDiv>
          <SubmitBtn type="submit" style={{ gridColumn: "1/-1" }}>
            Update
          </SubmitBtn>
        </Form>
      </Container>
    </>
  );
};

export default ProfileContent;
