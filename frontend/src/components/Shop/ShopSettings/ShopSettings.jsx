import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Input,
  InputDiv,
  Label as L,
  SubmitBtn,
  TextArea,
} from "../../../styled-comps/formComps";
import { ImageDiv, Image } from "../../../styled-comps/commonComps";
import {
  loadShop,
  updateShopInfo,
  clearErrors,
  clearSuccessMessage,
} from "../../../redux/actions/shop";
import { AiOutlineCamera } from "react-icons/ai";
import { BACKEND_URL, SERVER_URL } from "../../../server";
import Loader from "../../Layout/Loader/Loader";

const Container = styled.div`
  padding: 2rem 3rem;
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

const ShopSettings = () => {
  const { shop, loading, error, successMessage } = useSelector(
    (state) => state.shop
  );
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(shop?.name || "");
  const [email, setEmail] = useState(shop?.email || "");
  const [contactNumber, setContactNumber] = useState(shop?.phoneNumber || "");
  const [zipCode, setZipCode] = useState(shop?.zipCode || "");
  const [description, setDescription] = useState(shop?.description || "");
  const [address, setAddress] = useState(shop?.address || "");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [error, successMessage, dispatch]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      toast.error("Passwords don't match");
      return;
    }
    const data = {
      name,
      email,
      phoneNumber: contactNumber,
      password,
      zipCode,
      address,
      description,
    };
    dispatch(updateShopInfo(data));
    dispatch(loadShop());
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    axios
      .put(`${SERVER_URL}/shops/update-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then(() => {
        toast.success("Shop Profile Image Updated");
        dispatch(loadShop());
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
          <Image src={`${BACKEND_URL}/${shop?.avatar}`} alt="avatar" />
        </ImageDiv>
        <CamBtn>
          <label htmlFor="image">
            <AiOutlineCamera size={20} />
          </label>
          <input
            type="file"
            id="image"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </CamBtn>
      </CamDiv>
      <Form onSubmit={handleUpdate}>
        <InputDiv>
          <Label htmlFor="f-name">Shop Name</Label>
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
        <InputDiv style={{ gridColumn: "1/-1" }}>
          <Label htmlFor="description">Shop Description</Label>
          <TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <InputDiv>
          <Label htmlFor="zipcode">Zip Code</Label>
          <Input
            id="zipcode"
            type="number"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </InputDiv>
        <InputDiv style={{ gridColumn: "1/-1" }}>
          <Label htmlFor="address">Address</Label>
          <TextArea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </InputDiv>
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

export default ShopSettings;
