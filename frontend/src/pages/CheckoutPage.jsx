import Header from "../components/Layout/Header/Header";
import ShippingContent from "../components/Checkout/ShippingContent";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Input } from "../styled-comps/formComps";
import { toast } from "react-toastify";
import axios from "axios";
import { SERVER_URL } from "../server";
import { useNavigate } from "react-router-dom";

const PriceContent = styled.div`
  height: max-content;
  background-color: var(--color-5);
  padding: 2rem;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Btn = styled.button`
  background-color: var(--color-4);
  border: 2px solid #f63b60;
  padding: 0.5rem;
  color: white;
  font-weight: bold;
`;

const CheckoutPage = () => {
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subTotalPrice = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.discountPrice * item.quantity,
      0
    );
  }, [cart]);

  const handleCouponCode = () => {
    if (couponCode === "") {
      toast.error("Enter coupon code");
      return;
    }
    axios
      .get(`${SERVER_URL}/coupons/${couponCode}`)
      .then((res) => {
        let eligibleAmount = 0;
        cart.forEach((item) => {
          if (item.shop._id == res.data.couponCode.shop)
            eligibleAmount += item.discountPrice * item.quantity;
        });
        if (eligibleAmount === 0) {
          toast.error("This coupon is not valid for selected shop items.");
          setCouponCode("");
          return;
        }
        toast.success("Code Approved");
        const discountPrice =
          eligibleAmount * (res.data.couponCode.value / 100);
        setDiscount(discountPrice);
      })
      .catch((err) =>
        toast.error(err?.response?.data?.message || "Something went wrong")
      );
  };

  const shippingPrice = Number((subTotalPrice * 0.05).toFixed(2));

  const totalPrice = subTotalPrice + shippingPrice - discount;

  const handlePayment = (data) => {
    const {
      zipCode,
      country,
      city,
      address1,
      address2,
      name,
      email,
      phoneNumber,
    } = data;

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shippingPrice,
      discount,
      shippingAddress: { zipCode, country, city, address1, address2 },
      orderUserInfo: { name, email, phoneNumber },
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          padding: "3rem",
          gap: "2rem",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <ShippingContent handlePayment={handlePayment} />
        <PriceContent>
          <span>
            <p>subtotal:</p>
            <p>${subTotalPrice}</p>
          </span>
          <span>
            <p>shipping:</p>
            <p>+ ${shippingPrice}</p>
          </span>
          <span>
            <p>discount:</p>
            <p>- ${discount.toFixed(2)}</p>
          </span>
          <span>
            <p>total:</p>
            <p>${totalPrice}</p>
          </span>
          <Input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Btn onClick={handleCouponCode}>Apply Code</Btn>
        </PriceContent>
      </div>
    </>
  );
};

export default CheckoutPage;
