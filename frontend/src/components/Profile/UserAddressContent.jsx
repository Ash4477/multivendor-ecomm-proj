import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { FancyButton } from "../../styled-comps/commonComps";
import {
  InputDiv,
  Select,
  Input,
  Label as L,
} from "../../styled-comps/formComps";
import { Country, City } from "country-state-city";
import {
  deleteUserAddress,
  updateUserAddresses,
} from "../../redux/actions/user";
import Loader from "../Layout/Loader/Loader";

const Container = styled.div`
  margin-left: 2rem;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainDiv = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlexDiv = styled.div`
  background-color: var(--color-5);
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  font-family: Roboto, sans-serif;
`;

const StyledBtn = styled.button`
  background: transparent;
  border: none;
  color: white;

  &:hover {
    color: var(--color-1);
  }
`;

const ModalContainer = styled.div`
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

const Modal = styled.div`
  max-width: 800px;
  max-height: 90vh;
  width: 90%;
  background-color: var(--color-4);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 2rem;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled(L)`
  color: white;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  font-size: 14px;
`;

const UserAddressContent = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user, addressLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all fields!");
    } else {
      const zipCode = Number(zipcode);
      dispatch(
        updateUserAddresses({
          country,
          city,
          address1,
          address2,
          addressType,
          zipCode,
        })
      );
      setOpen(false);
      setCity("");
      setCountry("");
      setAddress1("");
      setAddress2("");
      setAddressType("");
      setZipcode("");
    }
  };

  const handleDelete = (addressId) => {
    dispatch(deleteUserAddress(addressId, user._id));
  };

  if (addressLoading) return <Loader />;

  return (
    <Container>
      {open && (
        <ModalContainer>
          <Modal>
            <button
              style={{
                background: "transparent",
                border: "none",
                height: "20px",
                alignSelf: "flex-end",
                color: "white",
              }}
              onClick={() => setOpen(false)}
            >
              <RxCross1 size={30} />
            </button>
            <h1>Add New Address</h1>
            <form
              aria-required
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <InputDiv>
                <Label htmlFor="country">Country</Label>
                <Select
                  id="country"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Choose your country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </InputDiv>
              <InputDiv>
                <Label htmlFor="city">City</Label>
                <Select
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Choose your city</option>
                  {City &&
                    City.getCitiesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </InputDiv>
              <InputDiv>
                <Label htmlFor="zipcode">ZipCode</Label>
                <Input
                  id="zipcode"
                  name="zipcode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  type="number"
                  required
                />
              </InputDiv>
              <InputDiv>
                <Label htmlFor="address1">Address 1</Label>
                <Input
                  id="address1"
                  name="address1"
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                />
              </InputDiv>
              <InputDiv>
                <Label htmlFor="address2">Address 2</Label>
                <Input
                  id="address2"
                  name="address2"
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  required
                />
              </InputDiv>
              <InputDiv>
                <Label htmlFor="address-type">Address Type</Label>
                <Select
                  id="address-type"
                  name="address-type"
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                >
                  <option value="">Choose address type</option>
                  {addressTypeData &&
                    addressTypeData.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </InputDiv>
              <FancyButton $pad="0.5rem" type="submit">
                Add Address
              </FancyButton>
            </form>
          </Modal>
        </ModalContainer>
      )}
      <HeaderDiv>
        <h1>My Addresses</h1>
        <FancyButton $pad="0.8rem 2rem" onClick={() => setOpen(true)}>
          Add New
        </FancyButton>
      </HeaderDiv>
      <MainDiv>
        {user && user.addresses.length === 0 ? (
          <Text>No address added yet !</Text>
        ) : (
          user.addresses.map((add) => (
            <FlexDiv key={add._id}>
              <Text>{add.addressType}</Text>
              <Text>{add.country}</Text>
              <Text>{add.city}</Text>
              <Text>{add.address1}</Text>
              <Text>{add.address2}</Text>
              <Text>{add.zipCode}</Text>
              <StyledBtn>
                <AiOutlineDelete
                  size={20}
                  onClick={() => handleDelete(add._id)}
                />
              </StyledBtn>
            </FlexDiv>
          ))
        )}
      </MainDiv>
    </Container>
  );
};

export default UserAddressContent;
