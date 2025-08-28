import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, ImageDiv } from "../../styled-comps/commonComps";
import {
  Input,
  InputDiv,
  Label as L,
  SubmitBtn,
} from "../../styled-comps/formComps";
import { AiOutlineCamera } from "react-icons/ai";
import { BACKEND_URL, SERVER_URL } from "../../server";
import styled from "styled-components";
import { loadUser, updateUserInfo } from "../../redux/actions/user";
import Loader from "../Layout/Loader/Loader";
import { toast } from "react-toastify";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CamDiv = styled.div`
  position: relative;
`;

const CamBtn = styled.button`
  cursor: pointer;
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
  const { user, loading } = useSelector((state) => state.user);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [contactNumber, setContactNumber] = useState(user.phoneNumber || "");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      toast.error("Passwords don't match");
      return;
    }
    const data = { name, email, phoneNumber: contactNumber, password };
    dispatch(updateUserInfo(data));
    dispatch(loadUser());
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    axios
      .put(`${SERVER_URL}/users/update-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then(() => {
        toast.success("Profile Image Updated");
        dispatch(loadUser());
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  return (
    <Container>
      <CamDiv>
        <ImageDiv
          $width="150px"
          $height="150px"
          $rounded
          style={{
            border: "3px solid var(--color-1)",
          }}
        >
          <Image src={`${BACKEND_URL}/${user.avatar}`} alt="avatar" />
        </ImageDiv>
        <CamBtn>
          <label htmlFor="image">
            <AiOutlineCamera size={20} />
          </label>
          <input
            type="file"
            id="image"
            style={{ display: "none" }}
            onChange={handleImage}
          />
        </CamBtn>
      </CamDiv>

      <Form onSubmit={handleUpdate}>
        <InputDiv>
          <Label htmlFor="f-name">Full Name</Label>
          <Input
            id="f-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="contactNum">Contact Number</Label>
          <Input
            id="contactNum"
            type="number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </InputDiv>
        <br />
        <InputDiv>
          <Label htmlFor="pass">Enter Password</Label>
          <Input
            id="pass"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="pass-conf">Re-Enter Password</Label>
          <Input
            id="pass-conf"
            value={confPassword}
            type="password"
            onChange={(e) => setConfPassword(e.target.value)}
          />
        </InputDiv>
        <SubmitBtn type="submit" style={{ gridColumn: "1/-1" }}>
          {loading ? <Loader /> : "Update"}
        </SubmitBtn>
      </Form>
    </Container>
  );
};

export default ProfileContent;
