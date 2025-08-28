import styled from "styled-components";
import {
  FaBoxOpen,
  FaTruck,
  FaShippingFast,
  FaInbox,
  FaRoute,
  FaCheckCircle,
  FaBox,
  FaMoneyBillWave,
} from "react-icons/fa";

const orderStatuses = [
  "Processing",
  "Transferred to Delivery Partner",
  "Shipping",
  "Received",
  "On the way",
  "Delivered",
  "Processing Refund",
  "Refund Successful",
];

const statusIcons = {
  Processing: <FaBoxOpen />,
  "Transferred to Delivery Partner": <FaTruck />,
  Shipping: <FaShippingFast />,
  Received: <FaInbox />,
  "On the way": <FaRoute />,
  Delivered: <FaCheckCircle />,
  "Processing Refund": <FaBox />,
  "Refund Successful": <FaMoneyBillWave />,
};

const TrackOrder = ({ currentStatus }) => {
  const currentIndex = orderStatuses.indexOf(currentStatus);

  return (
    <Wrapper>
      <Title>Order Tracking</Title>
      <Timeline>
        {orderStatuses.map((status, index) => (
          <Step key={status} $active={index <= currentIndex}>
            <IconWrapper $active={index <= currentIndex}>
              {statusIcons[status]}
            </IconWrapper>
            <Label $active={index <= currentIndex}>{status}</Label>
            {index < orderStatuses.length - 1 && (
              <Connector $active={index < currentIndex} />
            )}
          </Step>
        ))}
      </Timeline>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 24px;
  color: #f5f5f5;
`;

const Timeline = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Step = styled.div`
  text-align: center;
  flex: 1;
  position: relative;
  z-index: 1;
`;

const IconWrapper = styled.div`
  background: ${({ $active }) => ($active ? "#4caf50" : "#555")};
  color: #fff;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  transition: all 0.3s ease;
`;

const Label = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ $active }) => ($active ? "#fff" : "#aaa")};
`;

const Connector = styled.div`
  position: absolute;
  top: 25px;
  left: 50%;
  height: 3px;
  width: 100%;
  background: ${({ $active }) => ($active ? "#4caf50" : "#555")};
  z-index: -1;
`;

export default TrackOrder;
