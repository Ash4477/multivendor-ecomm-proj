import styled from "styled-components";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/actions/cart";
import { useNavigate } from "react-router-dom";
import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FancyButton } from "../../styled-comps/commonComps";
import { Input, InputDiv, Label as L } from "../../styled-comps/formComps";

import axios from "axios";
import { PAYPAL_CLIENT_ID, SERVER_URL } from "../../server";
import ShippingStatus from "../Checkout/ShippingStatus";
import PaymentLoader from "./PaymentLoader";
import { RxCross1 } from "react-icons/rx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: start;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PayOptionDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled(L)`
  color: white;
`;

const CardPayForm = styled.form`
  margin-left: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const CardInputDiv = styled.div`
  background-color: white;
  min-width: 300px;
  padding: 0.2rem 0.5rem;
  border: 1px solid grey;
  border-radius: 5px;
  outline: none;
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
  background-color: var(--color-4);
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  max-height: 90vh;
  width: 90%;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentContent = ({ orderData }) => {
  const { user } = useSelector((state) => state.user);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [selected, setSelected] = useState(1);
  const [name, setName] = useState(user.name || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const paymentData = {
    amount: Math.round(orderData.totalPrice * 100),
  };

  const order = {
    cart: orderData.cart,
    shippingAddress: orderData.shippingAddress,
    totalPrice: orderData.totalPrice,
    discount: orderData.discount,
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: { currency_code: "USD", value: orderData.totalPrice },
          },
        ],
        application_context: {
          shipping_preferences: "NO SHIPPING",
        },
      })
      .then((orderId) => orderId);
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      let paymentInfo = payer;
      if (paymentInfo !== undefined) {
        handlePaypalPayment(paymentInfo);
      }
    });
  };

  const handleCreditCardPayment = async (e) => {
    e.preventDefault();
    setIsPaymentProcessing(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${SERVER_URL}/payments/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios.post(`${SERVER_URL}/orders`, order, config);
          navigate("/order-success");
          toast.success("Order successful!");
          dispatch(clearCart());
          localStorage.removeItem("latestOrder");
        }
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  const handlePaypalPayment = async (paymentInfo) => {
    setIsPaymentProcessing(true);
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    try {
      await axios.post(`${SERVER_URL}/orders`, order, config);
    } catch (error) {
      toast.error(error);
    }
    setIsPaymentProcessing(false);
    dispatch(clearCart());
    localStorage.removeItem("latestOrder");
    navigate("/order-success");
  };

  const handleCODPayment = async () => {
    setIsPaymentProcessing(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    try {
      await axios.post(`${SERVER_URL}/orders`, order, config);
      navigate("/order-success");
      toast.success("Order successful!");
      dispatch(clearCart());
      localStorage.removeItem("latestOrder");
    } catch (error) {
      toast.error(error.response.data.message || "Order Failed!");
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  return (
    <Container>
      <ShippingStatus active={2} />
      {isPaymentProcessing && (
        <ModalContainer>
          <Modal>
            <PaymentLoader />
          </Modal>
        </ModalContainer>
      )}
      <Main>
        <PayOptionDiv>
          <input
            checked={selected === 1}
            type="radio"
            name="payment-option"
            id="payment-1"
            onChange={() => setSelected(1)}
          />
          <Label htmlFor="payment-1">Pay with Debit/Credit Card</Label>
        </PayOptionDiv>
        {selected === 1 && (
          <CardPayForm onSubmit={handleCreditCardPayment}>
            <InputDiv>
              <Label htmlFor="name">Name on Card</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={user && user.name}
                required
              />
            </InputDiv>
            <InputDiv>
              <Label htmlFor="card">Card Number</Label>
              <CardInputDiv id="card">
                <CardNumberElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        lineHeight: 1.5,
                        color: "black",
                      },
                      empty: {
                        color: "white",
                        "::placeholder": {
                          color: "#b9b9b9",
                        },
                      },
                      invalid: {
                        color: "#f10606",
                      },
                    },
                  }}
                />
              </CardInputDiv>
            </InputDiv>
            <InputDiv>
              <Label htmlFor="exp">Expiry Date</Label>
              <CardInputDiv id="exp">
                <CardExpiryElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        lineHeight: 1.5,
                        color: "black",
                      },
                      empty: {
                        color: "white",
                        "::placeholder": {
                          color: "#b9b9b9",
                        },
                      },
                      invalid: {
                        color: "#f10606",
                      },
                    },
                  }}
                />
              </CardInputDiv>
            </InputDiv>
            <InputDiv>
              <Label htmlFor="cvc">CVC</Label>
              <CardInputDiv id="cvc">
                <CardCvcElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        lineHeight: 1.5,
                        color: "black",
                      },
                      empty: {
                        color: "white",
                        "::placeholder": {
                          color: "#b9b9b9",
                        },
                      },
                      invalid: {
                        color: "#f10606",
                      },
                    },
                  }}
                />
              </CardInputDiv>
            </InputDiv>
            <FancyButton type="submit" $bRad="5px" $pad="0.5rem">
              Order Now
            </FancyButton>
          </CardPayForm>
        )}
        <PayOptionDiv>
          <input
            type="radio"
            name="payment-option"
            id="payment-2"
            onChange={() => setSelected(2)}
            checked={selected === 2}
          />
          <Label htmlFor="payment-2">Pay with Paypal</Label>
        </PayOptionDiv>
        {selected === 2 && (
          <ModalContainer>
            <Modal>
              <RxCross1
                size={25}
                style={{ alignSelf: "flex-end", cursor: "pointer" }}
                onClick={() => setSelected(3)}
              />
              <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  onApprove={onApprove}
                  createOrder={createOrder}
                ></PayPalButtons>
              </PayPalScriptProvider>
            </Modal>
          </ModalContainer>
        )}
        <PayOptionDiv>
          <input
            type="radio"
            name="payment-option"
            id="payment-3"
            onChange={() => setSelected(3)}
            checked={selected === 3}
          />
          <Label htmlFor="payment-3">Cash on Delivery</Label>
        </PayOptionDiv>
        {selected === 3 && (
          <FancyButton $bRad="5px" $pad="0.5rem" onClick={handleCODPayment}>
            Order Now
          </FancyButton>
        )}
      </Main>
    </Container>
  );
};

export default PaymentContent;
