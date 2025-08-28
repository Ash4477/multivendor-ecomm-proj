import { useEffect, useMemo, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getUserOrders } from "../../redux/actions/order";
import AnimationLoader from "../Layout/Loader/AnimationLoader";
import UserOrderListItem from "./UserOrderListItem";
import axios from "axios";
import { SERVER_URL } from "../../server";
import { toast } from "react-toastify";

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
  justify-content: ${({ $jc }) => $jc || undefined};
  align-items: ${({ $ai }) => $ai || undefined};
`;

const Button = styled.button`
  padding: 0.2rem 1rem;
  background-color: var(--color-1);
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
`;

const UserOrderDetails = () => {
  const [shop, setShop] = useState(null);
  const { userOrders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserOrders(user._id));
    }
  }, [dispatch, user?._id]);

  const data = useMemo(() => {
    return userOrders?.find((order) => order._id === id);
  }, [userOrders, id]);

  useEffect(() => {
    if (data?._id && data?.cart?.[0]?.shopId) {
      axios
        .get(`${SERVER_URL}/shops/${data?.cart?.[0]?.shopId}`)
        .then((res) => setShop(res.data.shop))
        .catch((err) => console.log(err));
    }
  }, [data]);

  const handleRefundRequest = () => {
    axios
      .put(
        `${SERVER_URL}/orders/${data?._id}/refund`,
        { status: "Processing Refund" },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Refund Request Submitted Successfully");
      })
      .catch((err) =>
        toast.error(
          err.response?.data?.message ||
            "Request Not Submitted. Something went wrong"
        )
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
        <Row>
          <Button>Chat with Seller</Button>
          {data?.status === "Delivered" && (
            <Button onClick={handleRefundRequest}>Refund Product</Button>
          )}
        </Row>
      </Row>
      <Row $jc="space-between">
        <Row>Order ID: #{data._id}</Row>
        <Row>Placed on: {data.createdAt.slice(0, 10)}</Row>
      </Row>
      {data &&
        data.cart.map((item) => (
          <UserOrderListItem
            orderId={data?._id}
            userId={user?._id}
            data={item}
            isDelivered={data.status === "Delivered"}
            key={item._id}
          />
        ))}
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
          <h2>Shop Details</h2>
          <p>Name: {shop?.name}</p>
          <p>Contact Number: {shop?.phoneNumber || "Not Provided"}</p>
          <p>Email: {shop?.email || "Not Provided"}</p>
          <p>Address: {shop?.address || "Online Only"}</p>
        </Col>
        <Col style={{ flex: "1" }}>
          <h2>Payment Info</h2>
          <p>Payment Type: {data.paymentInfo?.type || "COD"}</p>
          <p>Status: {data.paymentInfo?.status || "Not Paid"}</p>
        </Col>
      </Row>
      <Col $ai="center">
        <h2>
          Order Status:{" "}
          <span
            style={{
              color: data.status === "Delivered" ? "green" : "var(--color-1)",
            }}
          >
            {data.status}
          </span>
        </h2>
      </Col>
    </Container>
  );
};

export default UserOrderDetails;
