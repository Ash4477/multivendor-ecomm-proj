import styled from "styled-components";
import { Image, ImageDiv } from "../../../styled-comps/commonComps";
import { BACKEND_URL } from "../../../server";

const Container = styled.div`
  border-top: 1px solid grey;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderListItem = ({ data }) => {
  return (
    <Container>
      <ImageDiv $width="50px">
        <Image src={`${BACKEND_URL}/uploads/${data.images[0]}`} />
      </ImageDiv>
      <Col>
        <p>{data.name}</p>
        <p>
          ${data.discountPrice} x {data.quantity}
        </p>
      </Col>
    </Container>
  );
};

export default OrderListItem;
