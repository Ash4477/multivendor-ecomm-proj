import { useState } from "react";
import styled from "styled-components";
import {
  Input,
  InputDiv,
  Select,
  Label as L,
} from "../../styled-comps/formComps";
import ShippingStatus from "./ShippingStatus";
import { Country, City } from "country-state-city";
import { FancyButton } from "../../styled-comps/commonComps";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Label = styled(L)`
  color: white;
`;

const ShippingContent = ({ handlePayment }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { user } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (country === "" || city === "" || address1 === "" || address2 === "") {
      toast.error("Please fill all fields!");
      return;
    }

    handlePayment({
      name,
      email,
      phoneNumber,
      zipCode,
      country,
      city,
      address1,
      address2,
    });

    setName("");
    setEmail("");
    setPhoneNumber("");
    setZipCode("");
    setCity("");
    setCountry("");
    setAddress1("");
    setAddress2("");
  };

  const handleSavedAddressSelection = (add) => {
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setZipCode(add.zipCode);
    setCity(add.city);
    setCountry(add.country);
    setAddress1(add.address1);
    setAddress2(add.address2);
  };

  return (
    <Container>
      <ShippingStatus active={1} />
      <Form onSubmit={handleSubmit}>
        <h1 style={{ gridColumn: "1/-1" }}>Shipping Address</h1>
        <InputDiv>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            type="number"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="country">Country</Label>
          <Select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option default value="">
              Choose your country
            </option>
            {Country &&
              Country.getAllCountries().map((c) => (
                <option value={c.isoCode} key={c.isoCode}>
                  {c.name}
                </option>
              ))}
          </Select>
        </InputDiv>
        <InputDiv>
          <Label htmlFor="city">City</Label>
          <Select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option default value="">
              Choose your city
            </option>
            {City &&
              City.getCitiesOfCountry(country).map((c, idx) => (
                <option value={c.name} key={c.stateCode + idx}>
                  {c.name}
                </option>
              ))}
          </Select>
        </InputDiv>
        <InputDiv>
          <Label htmlFor="add1">Address 1</Label>
          <Input
            id="add1"
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="add2">Address 2</Label>
          <Input
            id="add2"
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            required
          />
        </InputDiv>
        <InputDiv style={{ gridColumn: "1/-1" }}>
          <h4> Choose one of your saved addresses</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {user &&
              user.addresses.map((add) => (
                <div
                  key={add._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Label>{add.addressType}</Label>
                  <input
                    type="radio"
                    name="saved-address"
                    onClick={() => handleSavedAddressSelection(add)}
                  />
                </div>
              ))}
          </div>
        </InputDiv>
        <FancyButton id="submit" type="submit" $bRad="5px" $pad="1rem">
          Go To Payment
        </FancyButton>
      </Form>
    </Container>
  );
};

export default ShippingContent;
