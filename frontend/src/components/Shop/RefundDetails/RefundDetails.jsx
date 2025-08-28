import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShopOrders } from "../../../redux/actions/order";
import { SERVER_URL } from "../../../server";
import { Select } from "../../../styled-comps/formComps";
import { BsFillBagFill } from "react-icons/bs";
import AnimationLoader from "../../Layout/Loader/AnimationLoader";
import OrderListItem from "../OrderDetails/OrderListItem";

const Container = styled.div`
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: ${({ $ai }) => $ai || "center"};
  gap: 1rem;
  justify-content: ${({ $jc }) => $jc || undefined};
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledBtn = styled.button`
  padding: 0.2rem 1rem;
  background-color: var(--color-1);
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
`;

const orderStatuses = ["Processing Refund", "Refund Successful"];

const RefundDetails = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const { shopOrders, loading } = useSelector((state) => state.order);
  const { shop } = useSelector((state) => state.shop);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (shop?._id) {
      dispatch(getShopOrders(shop._id));
    }
  }, [dispatch, shop?._id]);

  const data = useMemo(() => {
    return shopOrders?.find((order) => order._id === id);
  }, [shopOrders, id]);

  useEffect(() => {
    if (data?._id && data?.user) {
      axios
        .get(`${SERVER_URL}/users/${data.user}`)
        .then((res) => setUser(res.data.user))
        .catch((err) => console.log(err));
    }
  }, [data]);

  const handleOrderUpdate = () => {
    if (status === "") {
      toast.error("Select new status");
      return;
    }
    axios
      .put(
        `${SERVER_URL}/orders/${data._id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Order Status Successfully Updated");
        navigate("/dashboard/all-orders");
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || "Order Status Update Failed")
      );
  };

  const handleOrderRefund = () => {
    if (status === "") {
      toast.error("Select new status");
      return;
    }
    axios
      .put(
        `${SERVER_URL}/orders/${data._id}/refund`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Refund Status Successfully Updated");
        navigate("/dashboard/all-orders");
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || "Order Status Update Failed")
      );
  };

  if (loading) return <AnimationLoader />;

  if (!data) return <p>No order found</p>;

  return (
    <Container>
      <Row $jc="space-between">
        <Row>
          <BsFillBagFill size={30} color="var(--color-1)" />
          <h1>Order Details</h1>
        </Row>
        <StyledBtn onClick={() => navigate("/dashboard/all-orders")}>
          Order List
        </StyledBtn>
      </Row>
      <Row $jc="space-between">
        <Row>Order ID: #{data._id}</Row>
        <Row>Placed on: {data.createdAt.slice(0, 10)}</Row>
      </Row>
      {data &&
        data.cart.map((item) => <OrderListItem data={item} key={item._id} />)}
      <div
        style={{
          fontWeight: "bold",
          alignSelf: "flex-end",
          borderTop: "1px solid grey",
          width: "100%",
          marginTop: "0.5rem",
          paddingTop: "0.5rem",
          textAlign: "end",
        }}
      >
        Total Price: US${data.totalPrice}
      </div>
      <Row $jc="space-between" $ai="flex-start">
        <Col style={{ flex: "1.5" }}>
          <h2>Shipping Address</h2>
          <p>
            Address: {data.shippingAddress.address1},{" "}
            {data.shippingAddress.address2}
          </p>
          <p>Country: {data.shippingAddress.country}</p>
          <p>City: {data.shippingAddress.city}</p>
          <p>Contact Number: {user?.phoneNumber || "Not Provided"}</p>
          <p>Email: {user?.email || "Not Provided"}</p>
        </Col>
        <Col style={{ flex: "1" }}>
          <h2>Customer Details</h2>
          <p>Name: {user?.name}</p>
          <p>Contact Number: {user?.phoneNumber || "Not Provided"}</p>
          <p>Email: {user?.email || "Not Provided"}</p>
        </Col>
        <Col style={{ flex: "1" }}>
          <h2>Payment Info</h2>
          <p>Payment Type: {data.paymentInfo?.type || "COD"}</p>
          <p>Status: {data.paymentInfo?.status || "not paid"}</p>
        </Col>
      </Row>
      <Col>
        <h2>Order Status:</h2>
        <Row>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            {orderStatuses
              .slice(orderStatuses.indexOf(data?.status))
              .map((option, idx) => (
                <option value={option} key={idx}>
                  {option}
                </option>
              ))}
          </Select>
          <StyledBtn
            onClick={
              data?.status !== "Processing Refund"
                ? handleOrderUpdate
                : handleOrderRefund
            }
          >
            Update Order Status
          </StyledBtn>
        </Row>
      </Col>
    </Container>
  );
};

export default RefundDetails;
