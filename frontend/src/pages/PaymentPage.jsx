import styled from "styled-components";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Header from "../components/Layout/Header/Header";
import PaymentContent from "../components/Payment/PaymentContent";

const PriceContent = styled.div`
  height: max-content;
  background-color: var(--color-5);
  padding: 2rem;
  border-radius: 5px;
  min-width: 250px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const PaymentPage = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    try {
      setOrderData(JSON.parse(localStorage.getItem("latestOrder")));
    } catch (error) {
      toast(error);
    }
  }, []);

  if (!orderData) return <p>Loading</p>;

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
        <PaymentContent orderData={orderData} />
        <PriceContent>
          <span>
            <p>subtotal:</p>
            <p>${orderData.subTotalPrice}</p>
          </span>
          <span>
            <p>shipping:</p>
            <p>${orderData.shippingPrice}</p>
          </span>
          <span>
            <p>discount:</p>
            <p>${orderData.discount.toFixed(2)}</p>
          </span>
          <span>
            <p>total:</p>
            <p>${orderData.totalPrice}</p>
          </span>
        </PriceContent>
      </div>
    </>
  );
};

export default PaymentPage;
